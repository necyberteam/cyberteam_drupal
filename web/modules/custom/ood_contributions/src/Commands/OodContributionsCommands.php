<?php

namespace Drupal\ood_contributions\Commands;

use Drupal\ood_contributions\Plugin\CronManager;
use Drupal\ood_contributions\Service\DiscourseStatsService;
use Drush\Commands\DrushCommands;

/**
 * Drush commands for OOD Contributions module.
 */
class OodContributionsCommands extends DrushCommands {

  /**
   * The Discourse stats service.
   *
   * @var \Drupal\ood_contributions\Service\DiscourseStatsService
   */
  protected $discourseStats;

  /**
   * Constructs an OodContributionsCommands object.
   *
   * @param \Drupal\ood_contributions\Service\DiscourseStatsService $discourse_stats
   *   The Discourse stats service.
   */
  public function __construct(DiscourseStatsService $discourse_stats) {
    parent::__construct();
    $this->discourseStats = $discourse_stats;
  }

  /**
   * Updates Discourse daily post statistics.
   *
   * @command ood:discourse-stats
   * @aliases ood-disc-stats
   * @usage ood:discourse-stats
   *   Fetch and store daily post statistics from Discourse.
   */
  public function discourseStats() {
    $this->output()->writeln('Fetching Discourse daily post statistics...');

    CronManager::discourseUpdateDailyStats();

    $stats = $this->discourseStats->getLastYearStats();

    $this->output()->writeln(sprintf('Total records in database: %d', count($stats)));

    if (!empty($stats)) {
      $first = reset($stats);
      $last = end($stats);
      $total_posts = array_sum(array_column($stats, 'post_count'));

      $this->output()->writeln(sprintf('Date range: %s to %s', $first['post_date'], $last['post_date']));
      $this->output()->writeln(sprintf('Total posts: %d', $total_posts));
    }

    // Update the block with the contribution graph.
    $this->discourseStats->updateBlock();
    $this->output()->writeln('Updated Discourse contribution graph block.');

    $this->output()->writeln('Done!');
  }

  /**
   * Store GitHub statistics (existing command).
   *
   * @command ood:store-stats
   * @aliases ood-stats
   * @usage ood:store-stats
   *   Store GitHub contribution statistics.
   */
  public function storeStats() {
    $this->output()->writeln('Storing GitHub statistics...');
    CronManager::storeStats();
    $this->output()->writeln('Done!');
  }

  /**
   * Store Discourse user contributions (existing command).
   *
   * @command ood:discourse-contrib
   * @aliases ood-disc-contrib
   * @usage ood:discourse-contrib
   *   Store Discourse user contribution statistics.
   */
  public function discourseContrib() {
    $this->output()->writeln('Storing Discourse user contributions...');
    CronManager::discourseStoreContrib();
    $this->output()->writeln('Done!');
  }

}
