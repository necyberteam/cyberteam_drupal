<?php

namespace Drupal\ood_contributions\Service;

use Drupal\Core\Database\Connection;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;

/**
 * Service for storing and managing Discourse daily post statistics.
 */
class DiscourseStatsService {

  /**
   * The database connection.
   *
   * @var \Drupal\Core\Database\Connection
   */
  protected $database;

  /**
   * The Discourse API service.
   *
   * @var \Drupal\ood_contributions\Service\DiscourseApiService
   */
  protected $discourseApi;

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The logger channel.
   *
   * @var \Drupal\Core\Logger\LoggerChannelInterface
   */
  protected $logger;

  /**
   * Constructs a DiscourseStatsService object.
   *
   * @param \Drupal\Core\Database\Connection $database
   *   The database connection.
   * @param \Drupal\ood_contributions\Service\DiscourseApiService $discourse_api
   *   The Discourse API service.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $logger_factory
   *   The logger factory.
   */
  public function __construct(Connection $database, DiscourseApiService $discourse_api, EntityTypeManagerInterface $entity_type_manager, LoggerChannelFactoryInterface $logger_factory) {
    $this->database = $database;
    $this->discourseApi = $discourse_api;
    $this->entityTypeManager = $entity_type_manager;
    $this->logger = $logger_factory->get('ood_contributions');
  }

  /**
   * Updates daily post statistics.
   *
   * Fetches 365 days on first run, then only fetches from last known date.
   *
   * @return array
   *   Array with 'success' boolean and 'message' string.
   */
  public function updateDailyPostStats(): array {
    try {
      // Determine date range to fetch
      $last_date = $this->getLatestPostDate();
      $end_date = date('Y-m-d');

      if ($last_date) {
        // Fetch from the day after the last known date
        $start_date = date('Y-m-d', strtotime($last_date . ' +1 day'));
        $this->logger->info('Fetching Discourse stats from @start to @end', [
          '@start' => $start_date,
          '@end' => $end_date,
        ]);
      }
      else {
        // First run: fetch last 365 days
        $start_date = date('Y-m-d', strtotime('-365 days'));
        $this->logger->info('First run: Fetching Discourse stats for last 365 days (from @start to @end)', [
          '@start' => $start_date,
          '@end' => $end_date,
        ]);
      }

      // Don't fetch if we're already up to date
      if ($start_date > $end_date) {
        return [
          'success' => TRUE,
          'message' => 'Already up to date',
        ];
      }

      // Fetch data from Discourse API
      $result = $this->discourseApi->getDailyPostStats($start_date, $end_date);

      if ($result['error']) {
        throw new \Exception($result['message']);
      }

      // Process and store the data
      $data = $result['data'];
      $stored_count = $this->storeDailyStats($data);

      return [
        'success' => TRUE,
        'message' => "Successfully stored $stored_count daily post records",
      ];
    }
    catch (\Exception $e) {
      $this->logger->error('Failed to update Discourse daily post stats: @message', [
        '@message' => $e->getMessage(),
      ]);

      return [
        'success' => FALSE,
        'message' => $e->getMessage(),
      ];
    }
  }

  /**
   * Stores daily statistics in the database.
   *
   * @param array $data
   *   The API response data containing report information.
   *
   * @return int
   *   Number of records stored.
   */
  protected function storeDailyStats(array $data): int {
    $count = 0;

    if (!isset($data['report']) || !isset($data['report']['data'])) {
      $this->logger->warning('Unexpected API response format');
      return $count;
    }

    $report_data = $data['report']['data'];

    foreach ($report_data as $entry) {
      if (!isset($entry['x']) || !isset($entry['y'])) {
        continue;
      }

      // Convert timestamp to date
      $date = date('Y-m-d', strtotime($entry['x']));
      $post_count = (int) $entry['y'];

      // Use UPSERT to handle duplicates
      $this->database->merge('ood_disc_daily_posts')
        ->key(['post_date' => $date])
        ->fields([
          'post_count' => $post_count,
          'last_updated' => time(),
        ])
        ->execute();

      $count++;
    }

    return $count;
  }

  /**
   * Gets the most recent date in the database.
   *
   * @return string|null
   *   The latest post date in YYYY-MM-DD format, or NULL if no data exists.
   */
  protected function getLatestPostDate(): ?string {
    $query = $this->database->select('ood_disc_daily_posts', 'd')
      ->fields('d', ['post_date'])
      ->orderBy('post_date', 'DESC')
      ->range(0, 1);

    $result = $query->execute()->fetchField();

    return $result ?: NULL;
  }

  /**
   * Gets daily post statistics for a date range.
   *
   * @param string $start_date
   *   Start date in YYYY-MM-DD format.
   * @param string $end_date
   *   End date in YYYY-MM-DD format.
   *
   * @return array
   *   Array of records with post_date and post_count.
   */
  public function getDailyStats(string $start_date, string $end_date): array {
    $query = $this->database->select('ood_disc_daily_posts', 'd')
      ->fields('d', ['post_date', 'post_count'])
      ->condition('post_date', $start_date, '>=')
      ->condition('post_date', $end_date, '<=')
      ->orderBy('post_date', 'ASC');

    return $query->execute()->fetchAll(\PDO::FETCH_ASSOC);
  }

  /**
   * Gets the last 365 days of post statistics.
   *
   * @return array
   *   Array of records with post_date and post_count.
   */
  public function getLastYearStats(): array {
    $start_date = date('Y-m-d', strtotime('-365 days'));
    $end_date = date('Y-m-d');

    return $this->getDailyStats($start_date, $end_date);
  }

  /**
   * Generates a GitHub-style contribution graph for Discourse daily posts.
   *
   * @param int $weeks
   *   Number of weeks to display (default: 52).
   *
   * @return string
   *   The HTML markup for the contribution graph.
   */
  public function generateGraph(int $weeks = 52): string {
    $end_date = strtotime('today');
    $start_date = strtotime("-{$weeks} weeks", $end_date);

    // Query daily post counts from the database.
    $start_str = date('Y-m-d', $start_date);
    $end_str = date('Y-m-d', $end_date);
    $rows = $this->getDailyStats($start_str, $end_str);

    // Index by date.
    $contributions = [];
    foreach ($rows as $row) {
      $contributions[$row['post_date']] = (int) $row['post_count'];
    }

    return $this->renderGraph($contributions, $weeks);
  }

  /**
   * Renders the contribution graph HTML.
   *
   * @param array $contributions
   *   Array of post counts keyed by date (Y-m-d).
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

    // Determine max for color scaling.
    $max_contributions = !empty($contributions) ? max($contributions) : 1;

    $x = 0;
    $current_date = $start_date;

    // Month labels.
    $html .= '<g transform="translate(' . $label_width . ', 0)">';
    $last_month = NULL;
    for ($week = 0; $week < $weeks; $week++) {
      $month = date('M', strtotime("+{$week} weeks", $start_date));
      if ($month !== $last_month && $week > 0) {
        $mx = $week * $week_spacing;
        $html .= sprintf('<text x="%d" y="10" class="contrib-month-label">%s</text>', $mx, $month);
      }
      $last_month = $month;
    }
    $html .= '</g>';

    // Day labels.
    $html .= '<g transform="translate(0, 20)">';
    $html .= '<text x="30" y="20" class="contrib-day-label" text-anchor="end">Mon</text>';
    $html .= '<text x="30" y="46" class="contrib-day-label" text-anchor="end">Wed</text>';
    $html .= '<text x="30" y="72" class="contrib-day-label" text-anchor="end">Fri</text>';
    $html .= '</g>';

    // Contribution squares.
    $html .= '<g transform="translate(' . $label_width . ', 20)">';

    $colors = [
      0 => '#ebedf0',
      1 => '#9be9a8',
      2 => '#40c463',
      3 => '#30a14e',
      4 => '#216e39',
    ];

    for ($week = 0; $week < $weeks; $week++) {
      for ($day = 0; $day < 7; $day++) {
        $date = date('Y-m-d', $current_date);
        $count = $contributions[$date] ?? 0;

        // Calculate level (0-4).
        if ($count === 0) {
          $level = 0;
        }
        elseif ($max_contributions <= 4) {
          $level = min($count, 4);
        }
        else {
          $pct = $count / $max_contributions;
          $level = $pct >= 0.75 ? 4 : ($pct >= 0.5 ? 3 : ($pct >= 0.25 ? 2 : 1));
        }

        $color = $colors[$level];
        $y = $day * 13;
        $title = $count . ' post' . ($count !== 1 ? 's' : '') . ' on ' . date('M j, Y', $current_date);

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
        $colors[$i]
      );
    }
    $html .= '</svg>';
    $html .= '<span>More</span>';
    $html .= '</div>';

    $html .= '
    <style>
      .contribution-graph {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
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
    $html .= '</div>';

    return $html;
  }

  /**
   * Updates a block content entity with the Discourse contribution graph.
   *
   * @param int $bid
   *   The block content ID (default: 218).
   * @param int $weeks
   *   Number of weeks to display (default: 52).
   *
   * @return bool
   *   TRUE if successful, FALSE otherwise.
   */
  public function updateBlock(int $bid = 210, int $weeks = 52): bool {
    try {
      $block_storage = $this->entityTypeManager->getStorage('block_content');
      $block = $block_storage->load($bid);

      if (!$block) {
        $this->logger->error('Block content with ID @bid not found.', ['@bid' => $bid]);
        return FALSE;
      }

      $html = '<div class="discourse-contribution-graph">';
      $html .= $this->generateGraph($weeks);
      $html .= '</div>';

      if ($block->hasField('body')) {
        $block->body->value = $html;
        $block->body->format = 'full_no_editor';
        $block->save();

        $this->logger->info('Successfully updated block @bid with Discourse contribution graph.', [
          '@bid' => $bid,
        ]);

        return TRUE;
      }
      else {
        $this->logger->error('Block @bid does not have a body field.', ['@bid' => $bid]);
        return FALSE;
      }
    }
    catch (\Exception $e) {
      $this->logger->error('Error updating block with Discourse graph: @message', [
        '@message' => $e->getMessage(),
      ]);
      return FALSE;
    }
  }

}
