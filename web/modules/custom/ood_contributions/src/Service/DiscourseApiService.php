<?php

namespace Drupal\ood_contributions\Service;

use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use GuzzleHttp\ClientInterface;
use GuzzleHttp\Exception\GuzzleException;

/**
 * Service for interacting with the Discourse API.
 */
class DiscourseApiService {

  /**
   * The HTTP client.
   *
   * @var \GuzzleHttp\ClientInterface
   */
  protected $httpClient;

  /**
   * The logger channel.
   *
   * @var \Drupal\Core\Logger\LoggerChannelInterface
   */
  protected $logger;

  /**
   * The Discourse base URL.
   *
   * @var string
   */
  protected const BASE_URL = 'https://discourse.openondemand.org';

  /**
   * Constructs a DiscourseApiService object.
   *
   * @param \GuzzleHttp\ClientInterface $http_client
   *   The HTTP client.
   * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $logger_factory
   *   The logger factory.
   */
  public function __construct(ClientInterface $http_client, LoggerChannelFactoryInterface $logger_factory) {
    $this->httpClient = $http_client;
    $this->logger = $logger_factory->get('ood_contributions');
  }

  /**
   * Looks up a Discourse user by username.
   *
   * @param string $username
   *   The Discourse username.
   *
   * @return array
   *   The user data or error information.
   */
  public function getUserByUsername(string $username): array {
    try {
      $url = sprintf('%s/u/%s.json', self::BASE_URL, urlencode($username));
      $response = $this->makeRequest($url);

      return [
        'error' => FALSE,
        'data' => $response,
      ];
    }
    catch (\Exception $e) {
      $this->logger->error('Failed to fetch Discourse user by username: @message', [
        '@message' => $e->getMessage(),
      ]);

      return [
        'error' => TRUE,
        'message' => $e->getMessage(),
        'data' => NULL,
      ];
    }
  }

  /**
   * Fetches daily post statistics from Discourse.
   *
   * Uses the public /posts.json endpoint with pagination to aggregate
   * post counts by date, replacing the per-day search API approach.
   *
   * @param string $start_date
   *   Start date in YYYY-MM-DD format.
   * @param string $end_date
   *   End date in YYYY-MM-DD format.
   *
   * @return array
   *   The report data or error information.
   */
  public function getDailyPostStats(string $start_date, string $end_date): array {
    try {
      $counts = [];
      $start_dt = new \DateTime($start_date);
      $end_dt = new \DateTime($end_date);
      $before_id = NULL;
      $page = 0;

      while (TRUE) {
        $url = self::BASE_URL . '/posts.json';
        if ($before_id !== NULL) {
          $url .= '?before=' . $before_id;
        }

        $response = $this->makeRequest($url);
        $posts = $response['latest_posts'] ?? [];

        if (empty($posts)) {
          break;
        }

        $oldest_date = NULL;
        foreach ($posts as $post) {
          if (empty($post['created_at'])) {
            continue;
          }
          $post_date = new \DateTime($post['created_at']);
          $date_str = $post_date->format('Y-m-d');

          // Track the oldest post date on this page.
          if ($oldest_date === NULL || $post_date < $oldest_date) {
            $oldest_date = $post_date;
          }

          // Skip posts outside the date range.
          if ($post_date > $end_dt) {
            continue;
          }
          if ($post_date < $start_dt) {
            continue;
          }

          $counts[$date_str] = ($counts[$date_str] ?? 0) + 1;
        }

        // Stop if the oldest post on this page is before start_date.
        if ($oldest_date !== NULL && $oldest_date < $start_dt) {
          break;
        }

        // Set up pagination: use the lowest post ID on this page.
        $last_post = end($posts);
        $before_id = $last_post['id'];

        $page++;
        $this->logger->info('Discourse posts.json: fetched page @page (before=@before)', [
          '@page' => $page,
          '@before' => $before_id,
        ]);

        // Rate limit: 200ms delay between paginated requests.
        usleep(200000);
      }

      // Build the stats array with an entry for each day in the range.
      $stats = [];
      $current = clone $start_dt;
      while ($current <= $end_dt) {
        $date_str = $current->format('Y-m-d');
        $stats[] = [
          'x' => $date_str,
          'y' => $counts[$date_str] ?? 0,
        ];
        $current->modify('+1 day');
      }

      return [
        'error' => FALSE,
        'data' => [
          'report' => [
            'data' => $stats,
          ],
        ],
      ];
    }
    catch (\Exception $e) {
      $this->logger->error('Failed to fetch Discourse daily post stats: @message', [
        '@message' => $e->getMessage(),
      ]);

      return [
        'error' => TRUE,
        'message' => $e->getMessage(),
        'data' => NULL,
      ];
    }
  }

  /**
   * Makes an HTTP request to the Discourse API.
   *
   * @param string $url
   *   The API URL.
   *
   * @return array
   *   The decoded JSON response.
   *
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
  protected function makeRequest(string $url): array {
    $options = [
      'headers' => [
        'Accept' => 'application/json',
      ],
    ];

    try {
      $response = $this->httpClient->request('GET', $url, $options);
      $body = (string) $response->getBody();
      return json_decode($body, TRUE) ?: [];
    }
    catch (GuzzleException $e) {
      $this->logger->warning('Discourse API request failed: @message', [
        '@message' => $e->getMessage(),
      ]);
      throw $e;
    }
  }

}
