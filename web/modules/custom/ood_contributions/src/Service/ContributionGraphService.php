<?php

namespace Drupal\ood_contributions\Service;

use Drupal\Core\Database\Connection;

/**
 * Service for generating GitHub-style contribution graphs.
 */
class ContributionGraphService {

  /**
   * The database connection.
   *
   * @var \Drupal\Core\Database\Connection
   */
  protected $database;

  /**
   * Constructs a ContributionGraphService object.
   *
   * @param \Drupal\Core\Database\Connection $database
   *   The database connection.
   */
  public function __construct(Connection $database) {
    $this->database = $database;
  }

  /**
   * Generates a contribution graph HTML for a user.
   *
   * @param int $uid
   *   The Drupal user ID.
   * @param int $weeks
   *   Number of weeks to display (default: 52).
   * @param string|array|null $repos
   *   Optional repository filter. Can be a single repo string or array of repos.
   *
   * @return string
   *   The HTML markup for the contribution graph.
   */
  public function generateGraph(int $uid, int $weeks = 52, $repos = NULL): string {
    $contributions = $this->getContributionData($uid, $weeks, $repos);
    return $this->renderGraph($contributions, $weeks);
  }

  /**
   * Gets contribution data grouped by date.
   *
   * @param int $uid
   *   The Drupal user ID.
   * @param int $weeks
   *   Number of weeks to include.
   * @param string|array|null $repos
   *   Optional repository filter. Can be a single repo string or array of repos.
   *
   * @return array
   *   Array of contributions keyed by date (Y-m-d) with counts.
   */
  protected function getContributionData(int $uid, int $weeks, $repos = NULL): array {
    $end_date = strtotime('today');
    $start_date = strtotime("-{$weeks} weeks", $end_date);

    $query = $this->database->select('ood_user_commits', 'ouc')
      ->fields('ouc', ['commit_date'])
      ->condition('uid', $uid)
      ->condition('commit_date', $start_date, '>=')
      ->condition('commit_date', $end_date, '<=');

    if ($repos !== NULL) {
      if (is_array($repos)) {
        $query->condition('repo', $repos, 'IN');
      }
      else {
        $query->condition('repo', $repos);
      }
    }

    $results = $query->execute()->fetchAllAssoc('commit_date');

    // Group by date in PHP to ensure database compatibility.
    $contributions = [];
    foreach ($results as $row) {
      $date = date('Y-m-d', $row->commit_date);
      if (!isset($contributions[$date])) {
        $contributions[$date] = 0;
      }
      $contributions[$date]++;
    }

    return $contributions;
  }

  /**
   * Renders the contribution graph HTML.
   *
   * @param array $contributions
   *   Array of contributions keyed by date with counts.
   * @param int $weeks
   *   Number of weeks to display.
   *
   * @return string
   *   The HTML markup.
   */
  protected function renderGraph(array $contributions, int $weeks): string {
    $html = '<div class="contribution-graph" style="overflow: auto;">';
    $svg_width = 760;
    $label_width = 40;
    $graph_width = $svg_width - $label_width;
    $week_spacing = $graph_width / $weeks;

    $html .= '<svg width="' . $svg_width . '" height="126">';

    // Calculate start date (align to Sunday).
    $end_date = strtotime('today');
    $start_date = strtotime("-{$weeks} weeks", $end_date);
    $start_date = strtotime('last sunday', $start_date);

    // Determine max contributions for color scaling.
    $max_contributions = !empty($contributions) ? max($contributions) : 1;

    $x = 0;
    $current_date = $start_date;

    // Month labels.
    $html .= '<g transform="translate(' . $label_width . ', 0)">';
    $html .= $this->renderMonthLabels($start_date, $weeks, $week_spacing);
    $html .= '</g>';

    // Day labels.
    $html .= '<g transform="translate(0, 20)">';
    $html .= '<text x="30" y="20" class="contrib-day-label" text-anchor="end">Mon</text>';
    $html .= '<text x="30" y="46" class="contrib-day-label" text-anchor="end">Wed</text>';
    $html .= '<text x="30" y="72" class="contrib-day-label" text-anchor="end">Fri</text>';
    $html .= '</g>';

    // Contribution squares.
    $html .= '<g transform="translate(' . $label_width . ', 20)">';

    for ($week = 0; $week < $weeks; $week++) {
      for ($day = 0; $day < 7; $day++) {
        $date = date('Y-m-d', $current_date);
        $count = $contributions[$date] ?? 0;
        $level = $this->getContributionLevel($count, $max_contributions);
        $color = $this->getColorForLevel($level);

        $y = $day * 13;
        $title = $count . ' contribution' . ($count !== 1 ? 's' : '') . ' on ' . date('M j, Y', $current_date);

        $html .= sprintf(
          '<rect x="%d" y="%d" width="11" height="11" fill="%s" data-count="%d" data-date="%s"><title>%s</title></rect>',
          $x,
          $y,
          $color,
          $count,
          $date,
          htmlspecialchars($title)
        );

        $current_date = strtotime('+1 day', $current_date);
      }
      $x += $week_spacing;
    }

    $html .= '</g>';
    $html .= '</svg>';

    // Legend.
    $html .= '<div class="contrib-legend">';
    $html .= '<span>Less</span>';
    $html .= '<svg width="70" height="13">';
    for ($i = 0; $i <= 4; $i++) {
      $html .= sprintf(
        '<rect x="%d" y="0" width="11" height="11" fill="%s"></rect>',
        $i * 14,
        $this->getColorForLevel($i)
      );
    }
    $html .= '</svg>';
    $html .= '<span>More</span>';
    $html .= '</div>';

    $html .= $this->getStyles();
    $html .= '</div>';

    return $html;
  }

  /**
   * Renders month labels for the graph.
   *
   * @param int $start_date
   *   The start date timestamp.
   * @param int $weeks
   *   Number of weeks.
   * @param float $week_spacing
   *   Spacing between weeks in pixels.
   *
   * @return string
   *   The HTML markup for month labels.
   */
  protected function renderMonthLabels(int $start_date, int $weeks, float $week_spacing): string {
    $html = '';
    $current_date = $start_date;
    $last_month = NULL;

    for ($week = 0; $week < $weeks; $week++) {
      $month = date('M', $current_date);
      if ($month !== $last_month && $week > 0) {
        $x = $week * $week_spacing;
        $html .= sprintf('<text x="%d" y="10" class="contrib-month-label">%s</text>', $x, $month);
      }
      $last_month = $month;
      $current_date = strtotime('+1 week', $current_date);
    }

    return $html;
  }

  /**
   * Determines contribution level (0-4) based on count.
   *
   * @param int $count
   *   The contribution count.
   * @param int $max
   *   The maximum contribution count.
   *
   * @return int
   *   The level (0-4).
   */
  protected function getContributionLevel(int $count, int $max): int {
    if ($count === 0) {
      return 0;
    }

    if ($max <= 4) {
      return min($count, 4);
    }

    $percentage = $count / $max;
    if ($percentage >= 0.75) {
      return 4;
    }
    elseif ($percentage >= 0.5) {
      return 3;
    }
    elseif ($percentage >= 0.25) {
      return 2;
    }
    else {
      return 1;
    }
  }

  /**
   * Gets color for contribution level.
   *
   * @param int $level
   *   The contribution level (0-4).
   *
   * @return string
   *   The hex color code.
   */
  protected function getColorForLevel(int $level): string {
    $colors = [
      0 => '#ebedf0',
      1 => '#9be9a8',
      2 => '#40c463',
      3 => '#30a14e',
      4 => '#216e39',
    ];

    return $colors[$level] ?? $colors[0];
  }

  /**
   * Gets CSS styles for the contribution graph.
   *
   * @return string
   *   The CSS markup.
   */
  protected function getStyles(): string {
    return '
    <style>
      .contribution-graph {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
        padding: 20px;
      }
      .contribution-graph svg {
        display: block;
      }
      .contrib-month-label,
      .contrib-day-label {
        font-size: 10px;
        fill: #767676;
      }
      .contribution-graph rect {
        stroke: rgba(27, 31, 35, 0.04);
        stroke-width: 1px;
        shape-rendering: geometricPrecision;
      }
      .contribution-graph rect:hover {
        stroke: rgba(27, 31, 35, 0.3);
        stroke-width: 1px;
      }
      .contrib-legend {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 11px;
        color: #767676;
        margin-top: 10px;
        justify-content: flex-end;
      }
      .contrib-legend svg {
        display: inline-block;
      }
    </style>
    ';
  }

  /**
   * Gets contribution statistics for a user.
   *
   * @param int $uid
   *   The Drupal user ID.
   * @param int $weeks
   *   Number of weeks to analyze (default: 52).
   * @param string|array|null $repos
   *   Optional repository filter. Can be a single repo string or array of repos.
   *
   * @return array
   *   Array with statistics including total, current_streak, longest_streak.
   */
  public function getContributionStats(int $uid, int $weeks = 52, $repos = NULL): array {
    $contributions = $this->getContributionData($uid, $weeks, $repos);

    $total = array_sum($contributions);
    $current_streak = $this->calculateCurrentStreak($contributions);
    $longest_streak = $this->calculateLongestStreak($contributions);

    return [
      'total' => $total,
      'current_streak' => $current_streak,
      'longest_streak' => $longest_streak,
      'days_contributed' => count($contributions),
    ];
  }

  /**
   * Calculates current contribution streak.
   *
   * @param array $contributions
   *   Array of contributions keyed by date.
   *
   * @return int
   *   The current streak in days.
   */
  protected function calculateCurrentStreak(array $contributions): int {
    $streak = 0;
    $current_date = strtotime('today');

    while (isset($contributions[date('Y-m-d', $current_date)]) && $contributions[date('Y-m-d', $current_date)] > 0) {
      $streak++;
      $current_date = strtotime('-1 day', $current_date);
    }

    return $streak;
  }

  /**
   * Calculates longest contribution streak.
   *
   * @param array $contributions
   *   Array of contributions keyed by date.
   *
   * @return int
   *   The longest streak in days.
   */
  protected function calculateLongestStreak(array $contributions): int {
    if (empty($contributions)) {
      return 0;
    }

    $dates = array_keys($contributions);
    sort($dates);

    $longest = 0;
    $current = 1;

    for ($i = 1; $i < count($dates); $i++) {
      $prev_date = strtotime($dates[$i - 1]);
      $curr_date = strtotime($dates[$i]);

      if ($curr_date - $prev_date === 86400) {
        $current++;
      }
      else {
        $longest = max($longest, $current);
        $current = 1;
      }
    }

    return max($longest, $current);
  }

}
