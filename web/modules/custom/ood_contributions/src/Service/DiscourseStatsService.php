<?php

namespace Drupal\ood_contributions\Service;

use Drupal\Core\Database\Connection;
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
   * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $logger_factory
   *   The logger factory.
   */
  public function __construct(Connection $database, DiscourseApiService $discourse_api, LoggerChannelFactoryInterface $logger_factory) {
    $this->database = $database;
    $this->discourseApi = $discourse_api;
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

}
