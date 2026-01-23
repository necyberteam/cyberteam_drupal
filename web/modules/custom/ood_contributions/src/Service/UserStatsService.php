<?php

namespace Drupal\ood_contributions\Service;

use Drupal\Core\Database\Connection;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\key\KeyRepositoryInterface;
use GuzzleHttp\ClientInterface;
use GuzzleHttp\Exception\GuzzleException;

/**
 * Service for fetching and storing user contribution statistics from GitHub.
 */
class UserStatsService {

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
   * The database connection.
   *
   * @var \Drupal\Core\Database\Connection
   */
  protected $database;

  /**
   * The logger channel.
   *
   * @var \Drupal\Core\Logger\LoggerChannelInterface
   */
  protected $logger;

  /**
   * Constructs a UserStatsService object.
   *
   * @param \GuzzleHttp\ClientInterface $http_client
   *   The HTTP client.
   * @param \Drupal\key\KeyRepositoryInterface $key_repository
   *   The key repository service.
   * @param \Drupal\Core\Database\Connection $database
   *   The database connection.
   * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $logger_factory
   *   The logger factory.
   */
  public function __construct(ClientInterface $http_client, KeyRepositoryInterface $key_repository, Connection $database, LoggerChannelFactoryInterface $logger_factory) {
    $this->httpClient = $http_client;
    $this->keyRepository = $key_repository;
    $this->database = $database;
    $this->logger = $logger_factory->get('ood_contributions');
  }

  /**
   * Fetches and stores user statistics for a repository.
   *
   * @param int $uid
   *   The Drupal user ID.
   * @param string $repo
   *   Repository in owner/name format (e.g., OSC/ondemand).
   * @param string $github_username
   *   The GitHub username to fetch stats for.
   *
   * @return array
   *   An array with success status and stats data.
   */
  public function updateUserStats(int $uid, string $repo, string $github_username): array {
    try {
      // Fetch stats from GitHub.
      $github_stats = $this->fetchGitHubStats($repo, $github_username);

      if (isset($github_stats['error'])) {
        return [
          'success' => FALSE,
          'error' => $github_stats['message'] ?? 'Failed to fetch GitHub stats',
        ];
      }

      // Get total commits from database.
      $total_commits = $this->getCommitCount($uid, $repo);

      // Store or update stats.
      $this->storeStats($uid, $repo, $total_commits, $github_stats['total_prs'], $github_stats['total_issues']);

      $this->logger->info('Updated stats for uid @uid, repo @repo: @commits commits, @prs PRs, @issues issues', [
        '@uid' => $uid,
        '@repo' => $repo,
        '@commits' => $total_commits,
        '@prs' => $github_stats['total_prs'],
        '@issues' => $github_stats['total_issues'],
      ]);

      return [
        'success' => TRUE,
        'stats' => [
          'total_commits' => $total_commits,
          'total_prs' => $github_stats['total_prs'],
          'total_issues' => $github_stats['total_issues'],
        ],
      ];
    }
    catch (\Exception $e) {
      $this->logger->error('Failed to update user stats: @message', [
        '@message' => $e->getMessage(),
      ]);

      return [
        'success' => FALSE,
        'error' => $e->getMessage(),
      ];
    }
  }

  /**
   * Fetches statistics from GitHub GraphQL API.
   *
   * @param string $repo
   *   Repository in owner/name format (e.g., OSC/ondemand).
   * @param string $github_username
   *   The GitHub username.
   *
   * @return array
   *   An array with total_prs and total_issues counts.
   */
  protected function fetchGitHubStats(string $repo, string $github_username): array {
    try {
      $api_key = $this->getApiKey();

      $query = sprintf(
        '{
          pullRequests: search(query: "repo:%s author:%s is:pr", type: ISSUE, first: 1) {
            issueCount
          }
          issues: search(query: "repo:%s author:%s is:issue", type: ISSUE, first: 1) {
            issueCount
          }
        }',
        $repo,
        $github_username,
        $repo,
        $github_username
      );

      $response = $this->makeGraphQLRequest($query, $api_key);

      return [
        'total_prs' => $response['data']['pullRequests']['issueCount'] ?? 0,
        'total_issues' => $response['data']['issues']['issueCount'] ?? 0,
      ];
    }
    catch (\Exception $e) {
      $this->logger->error('Failed to fetch GitHub stats: @message', [
        '@message' => $e->getMessage(),
      ]);

      return [
        'error' => TRUE,
        'message' => $e->getMessage(),
      ];
    }
  }

  /**
   * Makes a GraphQL request to GitHub API.
   *
   * @param string $query
   *   The GraphQL query.
   * @param string|null $api_key
   *   The GitHub API key (optional).
   *
   * @return array
   *   The decoded JSON response.
   *
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
  protected function makeGraphQLRequest(string $query, ?string $api_key): array {
    $options = [
      'headers' => [
        'Content-Type' => 'application/json',
        'User-Agent' => 'Drupal-OOD-Contributions',
      ],
      'json' => [
        'query' => $query,
      ],
    ];

    // Add authentication if API key is available.
    if (!empty($api_key)) {
      $options['headers']['Authorization'] = 'Bearer ' . $api_key;
    }

    try {
      $response = $this->httpClient->request('POST', 'https://api.github.com/graphql', $options);
      $body = (string) $response->getBody();
      $data = json_decode($body, TRUE) ?: [];
      
      // Check for GraphQL errors.
      if (isset($data['errors'])) {
        $error_messages = array_map(function($error) {
          return $error['message'] ?? 'Unknown error';
        }, $data['errors']);
        throw new \Exception('GraphQL errors: ' . implode(', ', $error_messages));
      }
      
      return $data;
    }
    catch (GuzzleException $e) {
      $error_message = $e->getMessage();
      
      // Try to get more details from response body.
      if (method_exists($e, 'getResponse') && $e->getResponse()) {
        $response_body = (string) $e->getResponse()->getBody();
        $response_data = json_decode($response_body, TRUE);
        if (isset($response_data['message'])) {
          $error_message .= ' - ' . $response_data['message'];
        }
      }
      
      $this->logger->warning('GitHub GraphQL request failed: @message', [
        '@message' => $error_message,
      ]);
      throw new \Exception($error_message);
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
      $key = $this->keyRepository->getKey('github_api');
      $key_value = $key ? $key->getKeyValue() : NULL;
      // Trim whitespace/newlines that may be in the key.
      return $key_value ? trim($key_value) : NULL;
    }
    catch (\Exception $e) {
      $this->logger->notice('GitHub API key not found or not accessible: @message', [
        '@message' => $e->getMessage(),
      ]);
      return NULL;
    }
  }

  /**
   * Gets commit count for a user and repository from database.
   *
   * @param int $uid
   *   The Drupal user ID.
   * @param string $repo
   *   Repository in owner/name format.
   *
   * @return int
   *   The number of commits.
   */
  protected function getCommitCount(int $uid, string $repo): int {
    $query = $this->database->select('ood_user_commits', 'ouc')
      ->condition('uid', $uid)
      ->condition('repo', $repo);

    return (int) $query->countQuery()->execute()->fetchField();
  }

  /**
   * Stores or updates contribution statistics.
   *
   * @param int $uid
   *   The Drupal user ID.
   * @param string $repo
   *   Repository in owner/name format.
   * @param int $total_commits
   *   Total number of commits.
   * @param int $total_prs
   *   Total number of pull requests.
   * @param int $total_issues
   *   Total number of issues.
   *
   * @throws \Exception
   */
  protected function storeStats(int $uid, string $repo, int $total_commits, int $total_prs, int $total_issues): void {
    // Check if record exists.
    $existing = $this->database->select('ood_contribution_stats', 'ocs')
      ->fields('ocs', ['id'])
      ->condition('uid', $uid)
      ->condition('repo', $repo)
      ->execute()
      ->fetchField();

    $fields = [
      'total_commits' => $total_commits,
      'total_prs' => $total_prs,
      'total_issues' => $total_issues,
      'last_updated' => time(),
    ];

    if ($existing) {
      // Update existing record.
      $this->database->update('ood_contribution_stats')
        ->fields($fields)
        ->condition('id', $existing)
        ->execute();
    }
    else {
      // Insert new record.
      $fields['uid'] = $uid;
      $fields['repo'] = $repo;
      $this->database->insert('ood_contribution_stats')
        ->fields($fields)
        ->execute();
    }
  }

  /**
   * Gets stored statistics for a user and repository.
   *
   * @param int $uid
   *   The Drupal user ID.
   * @param string|null $repo
   *   Optional repository filter.
   *
   * @return array
   *   Array of statistics records.
   */
  public function getStats(int $uid, ?string $repo = NULL): array {
    $query = $this->database->select('ood_contribution_stats', 'ocs')
      ->fields('ocs')
      ->condition('uid', $uid);

    if ($repo !== NULL) {
      $query->condition('repo', $repo);
    }

    $query->orderBy('last_updated', 'DESC');

    return $query->execute()->fetchAll(\PDO::FETCH_ASSOC);
  }

  /**
   * Updates statistics for all repositories for a user.
   *
   * @param int $uid
   *   The Drupal user ID.
   * @param string $github_username
   *   The GitHub username.
   * @param array $repos
   *   Array of repositories in owner/name format.
   *
   * @return array
   *   An array with results for each repository.
   */
  public function updateAllUserStats(int $uid, string $github_username, array $repos): array {
    $results = [];

    foreach ($repos as $repo) {
      $results[$repo] = $this->updateUserStats($uid, $repo, $github_username);
    }

    return $results;
  }

}
