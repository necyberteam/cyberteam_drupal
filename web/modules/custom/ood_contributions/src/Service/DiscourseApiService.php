<?php

namespace Drupal\ood_contributions\Service;

use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\key\KeyRepositoryInterface;
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
   * The key repository.
   *
   * @var \Drupal\key\KeyRepositoryInterface
   */
  protected $keyRepository;

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
   * @param \Drupal\key\KeyRepositoryInterface $key_repository
   *   The key repository.
   * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $logger_factory
   *   The logger factory.
   */
  public function __construct(ClientInterface $http_client, KeyRepositoryInterface $key_repository, LoggerChannelFactoryInterface $logger_factory) {
    $this->httpClient = $http_client;
    $this->keyRepository = $key_repository;
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
      $url = sprintf('%s/u/%s/summary.json', self::BASE_URL, urlencode($username));
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
   * Uses the search API to aggregate posts by date.
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
      // Use search API to get posts within date range
      // This is more reliable than admin reports which may not be available
      $stats = [];
      
      $current_date = new \DateTime($start_date);
      $end_datetime = new \DateTime($end_date);
      
      // Fetch counts for each day
      while ($current_date <= $end_datetime) {
        $date_str = $current_date->format('Y-m-d');
        $count = $this->getPostCountForDate($date_str);
        
        $stats[] = [
          'x' => $date_str,
          'y' => $count,
        ];
        
        $current_date->modify('+1 day');
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
   * Gets the post count for a specific date using search API.
   *
   * @param string $date
   *   Date in YYYY-MM-DD format.
   *
   * @return int
   *   Number of posts on that date.
   */
  protected function getPostCountForDate(string $date): int {
    try {
      // Use search API with date filter
      // Format: after:YYYY-MM-DD before:YYYY-MM-DD
      $next_date = date('Y-m-d', strtotime($date . ' +1 day'));
      $url = sprintf(
        '%s/search.json?q=after:%s+before:%s',
        self::BASE_URL,
        urlencode($date),
        urlencode($next_date)
      );
      
      $response = $this->makeRequest($url);
      
      // Count posts (not topics)
      $count = 0;
      if (isset($response['posts']) && is_array($response['posts'])) {
        $count = count($response['posts']);
      }
      
      return $count;
    }
    catch (\Exception $e) {
      $this->logger->warning('Failed to get post count for @date: @message', [
        '@date' => $date,
        '@message' => $e->getMessage(),
      ]);
      return 0;
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

  /**
   * Makes an authenticated admin HTTP request to the Discourse API.
   *
   * @param string $url
   *   The API URL.
   *
   * @return array
   *   The decoded JSON response.
   *
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
  protected function makeAdminRequest(string $url): array {
    $api_key = $this->keyRepository->getKey('discourse_api');
    if (!$api_key) {
      throw new \Exception('Discourse API key not found');
    }

    $key_value = $api_key->getKeyValue();
    if (empty($key_value)) {
      throw new \Exception('Discourse API key is empty');
    }

    // Parse API key if it contains username
    // Format: "username:api_key" or just "api_key"
    $parts = explode(':', $key_value, 2);
    if (count($parts) === 2) {
      [$username, $api_key_value] = $parts;
    }
    else {
      // Default to system user if no username specified
      $username = 'system';
      $api_key_value = $key_value;
    }

    $options = [
      'headers' => [
        'Accept' => 'application/json',
        'Api-Key' => $api_key_value,
        'Api-Username' => $username,
      ],
    ];

    try {
      $response = $this->httpClient->request('GET', $url, $options);
      $body = (string) $response->getBody();
      return json_decode($body, TRUE) ?: [];
    }
    catch (GuzzleException $e) {
      $this->logger->warning('Discourse admin API request failed: @message', [
        '@message' => $e->getMessage(),
      ]);
      throw $e;
    }
  }

}
