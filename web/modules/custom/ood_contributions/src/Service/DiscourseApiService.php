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
   * The key repository service.
   *
   * @var \Drupal\key\KeyRepositoryInterface
   */
  protected $keyRepository;

  /**
   * The logger channel.
   *
   * @var \Drupal\Core\Logger\LoggerChannelInterface
   */
  protected $logger;

  /**
   * The Discourse API username.
   *
   * @var string
   */
  protected const API_USERNAME = 'protitude';

  /**
   * The Discourse base URL.
   *
   * @var string
   */
  protected const BASE_URL = 'https://ask.cnct.ci';

  /**
   * Constructs a DiscourseApiService object.
   *
   * @param \GuzzleHttp\ClientInterface $http_client
   *   The HTTP client.
   * @param \Drupal\key\KeyRepositoryInterface $key_repository
   *   The key repository service.
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
      $api_key = $this->getApiKey();
      if (empty($api_key)) {
        return [
          'error' => TRUE,
          'message' => 'Discourse API key not configured.',
          'data' => NULL,
        ];
      }

      $url = sprintf('%s/u/%s.json', self::BASE_URL, urlencode($username));
      $response = $this->makeRequest($url, $api_key);

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
   * Looks up a Discourse user by ID.
   *
   * @param int $id
   *   The Discourse user ID.
   *
   * @return array
   *   The user data or error information.
   */
  public function getUserById(int $id): array {
    try {
      $api_key = $this->getApiKey();
      if (empty($api_key)) {
        return [
          'error' => TRUE,
          'message' => 'Discourse API key not configured.',
          'data' => NULL,
        ];
      }

      $url = sprintf('%s/admin/users/%d.json', self::BASE_URL, $id);
      $response = $this->makeRequest($url, $api_key);

      return [
        'error' => FALSE,
        'data' => $response,
      ];
    }
    catch (\Exception $e) {
      $this->logger->error('Failed to fetch Discourse user by ID: @message', [
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
   * @param string $api_key
   *   The Discourse API key.
   *
   * @return array
   *   The decoded JSON response.
   *
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
  protected function makeRequest(string $url, string $api_key): array {
    $options = [
      'headers' => [
        'Api-Key' => $api_key,
        'Api-Username' => self::API_USERNAME,
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
   * Gets the Discourse API key from the key module.
   *
   * @return string|null
   *   The API key or NULL if not configured.
   */
  protected function getApiKey(): ?string {
    try {
      $key = $this->keyRepository->getKey('ood_discourse');
      return $key ? $key->getKeyValue() : NULL;
    }
    catch (\Exception $e) {
      $this->logger->notice('Discourse API key not found or not accessible: @message', [
        '@message' => $e->getMessage(),
      ]);
      return NULL;
    }
  }

}
