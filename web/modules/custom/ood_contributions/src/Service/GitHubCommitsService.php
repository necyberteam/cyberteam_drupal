<?php

namespace Drupal\ood_contributions\Service;

use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\key\KeyRepositoryInterface;
use GuzzleHttp\ClientInterface;
use GuzzleHttp\Exception\GuzzleException;

/**
 * Service for fetching GitHub commits for a given user.
 */
class GitHubCommitsService {

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
   * Constructs a GitHubCommitsService object.
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
   * Fetches commits for a given author from a GitHub repository.
   *
   * @param string $org
   *   The GitHub organization or username.
   * @param string $repo
   *   The GitHub repository name.
   * @param string $author
   *   The GitHub author username.
   * @param int $per_page
   *   Number of commits per page (default: 100, max: 100).
   * @param bool $include_merged_at
   *   Whether to fetch merged_at date from associated PRs (default: TRUE).
   *
   * @return array
   *   An array containing totalCount and commits data, or error information.
   */
  public function getCommits(string $org, string $repo, string $author, int $per_page = 100, bool $include_merged_at = TRUE): array {
    $all_commits = [];
    $page = 1;

    try {
      // Get the API key from the key module.
      $api_key = $this->getApiKey();

      // Paginate through all commits.
      while (TRUE) {
        $url = sprintf(
          'https://api.github.com/repos/%s/%s/commits?author=%s&per_page=%d&page=%d',
          urlencode($org),
          urlencode($repo),
          urlencode($author),
          min($per_page, 100),
          $page
        );

        $response = $this->makeRequest($url, $api_key);

        if (empty($response)) {
          break;
        }

        $all_commits = array_merge($all_commits, $response);
        $page++;

        // If we got fewer results than requested, we've reached the last page.
        if (count($response) < $per_page) {
          break;
        }
      }

      // Format the response similar to the CLI output.
      return $this->formatCommits($all_commits, $org, $repo, $api_key, $include_merged_at);

    }
    catch (\Exception $e) {
      $this->logger->error('Failed to fetch GitHub commits: @message', [
        '@message' => $e->getMessage(),
      ]);

      return [
        'error' => TRUE,
        'message' => $e->getMessage(),
        'totalCount' => 0,
        'commits' => [],
      ];
    }
  }

  /**
   * Makes an HTTP request to the GitHub API.
   *
   * @param string $url
   *   The API URL.
   * @param string|null $api_key
   *   The GitHub API key.
   *
   * @return array
   *   The decoded JSON response.
   *
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
  protected function makeRequest(string $url, ?string $api_key): array {
    $options = [
      'headers' => [
        'Accept' => 'application/vnd.github+json',
        'User-Agent' => 'Drupal-OOD-Contributions',
      ],
    ];

    // Add authentication if API key is available.
    if (!empty($api_key)) {
      $options['headers']['Authorization'] = 'Bearer ' . $api_key;
    }

    try {
      $response = $this->httpClient->request('GET', $url, $options);
      $body = (string) $response->getBody();
      return json_decode($body, TRUE) ?: [];
    }
    catch (GuzzleException $e) {
      $this->logger->warning('GitHub API request failed: @message', [
        '@message' => $e->getMessage(),
      ]);
      throw $e;
    }
  }

  /**
   * Gets the GitHub API key from the key module.
   *
   * @return string|null
   *   The API key or NULL if not configured.
   */
  protected function getApiKey(): ?string {
    try {
      $key = $this->keyRepository->getKey('appverse_github');
      return $key ? $key->getKeyValue() : NULL;
    }
    catch (\Exception $e) {
      $this->logger->notice('GitHub API key not found or not accessible: @message', [
        '@message' => $e->getMessage(),
      ]);
      return NULL;
    }
  }

  /**
   * Formats commits data to match the CLI output structure.
   *
   * @param array $commits
   *   The raw commits data from GitHub API.
   * @param string $org
   *   The GitHub organization or username.
   * @param string $repo
   *   The GitHub repository name.
   * @param string|null $api_key
   *   The GitHub API key.
   * @param bool $include_merged_at
   *   Whether to fetch merged_at date from associated PRs.
   *
   * @return array
   *   Formatted commits data with totalCount and commits array.
   */
  protected function formatCommits(array $commits, string $org, string $repo, ?string $api_key, bool $include_merged_at): array {
    $formatted_commits = [];

    foreach ($commits as $commit) {
      $merged_at = NULL;

      // Fetch merged_at if requested.
      if ($include_merged_at && !empty($commit['sha'])) {
        $merged_at = $this->getMergedAt($org, $repo, $commit['sha'], $api_key);
      }

      $formatted_commits[] = [
        'sha' => $commit['sha'] ?? '',
        'message' => $commit['commit']['message'] ?? '',
        'date' => $commit['commit']['author']['date'] ?? '',
        'author' => $commit['commit']['author']['name'] ?? '',
        'url' => $commit['html_url'] ?? '',
        'merged_at' => $merged_at,
      ];
    }

    return [
      'totalCount' => count($formatted_commits),
      'commits' => $formatted_commits,
    ];
  }

  /**
   * Gets the merged_at date for a commit by checking associated pull requests.
   *
   * @param string $org
   *   The GitHub organization or username.
   * @param string $repo
   *   The GitHub repository name.
   * @param string $sha
   *   The commit SHA.
   * @param string|null $api_key
   *   The GitHub API key.
   *
   * @return string|null
   *   The merged_at date or NULL if not merged or not found.
   */
  protected function getMergedAt(string $org, string $repo, string $sha, ?string $api_key): ?string {
    try {
      $url = sprintf(
        'https://api.github.com/repos/%s/%s/commits/%s/pulls',
        urlencode($org),
        urlencode($repo),
        urlencode($sha)
      );

      $pulls = $this->makeRequest($url, $api_key);

      // Return the merged_at from the first associated PR that was merged.
      foreach ($pulls as $pull) {
        if (!empty($pull['merged_at'])) {
          return $pull['merged_at'];
        }
      }

      return NULL;
    }
    catch (\Exception $e) {
      // Silently fail - merged_at is optional information.
      return NULL;
    }
  }

}
