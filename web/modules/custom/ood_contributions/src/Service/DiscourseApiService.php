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
