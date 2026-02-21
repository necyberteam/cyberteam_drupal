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
    try {
      // Get the API key from the key module.
      $api_key = $this->getApiKey();

      // Use GraphQL API for efficient data fetching.
      return $this->getCommitsGraphQL($org, $repo, $author, $per_page, $include_merged_at, $api_key);
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
   * Fetches commits using GitHub GraphQL API for efficiency.
   *
   * @param string $org
   *   The GitHub organization or username.
   * @param string $repo
   *   The GitHub repository name.
   * @param string $author
   *   The GitHub author username.
   * @param int $per_page
   *   Number of commits per page (max: 100).
   * @param bool $include_merged_at
   *   Whether to fetch merged_at date from associated PRs.
   * @param string|null $api_key
   *   The GitHub API key.
   *
   * @return array
   *   An array containing totalCount and commits data.
   */
  protected function getCommitsGraphQL(string $org, string $repo, string $author, int $per_page, bool $include_merged_at, ?string $api_key): array {
    $all_commits = [];
    $has_next_page = TRUE;
    $after_cursor = NULL;
    $per_page = min($per_page, 100);

    while ($has_next_page) {
      $query = $this->buildGraphQLQuery($org, $repo, $author, $per_page, $include_merged_at, $after_cursor);
      $response = $this->makeGraphQLRequest($query, $api_key);

      if (empty($response['data']['repository']['defaultBranchRef']['target']['history'])) {
        break;
      }

      $history = $response['data']['repository']['defaultBranchRef']['target']['history'];
      $edges = $history['edges'] ?? [];

      foreach ($edges as $edge) {
        $node = $edge['node'];

        // Filter by author username.
        $commit_author = $node['author']['user']['login'] ?? '';
        if (!empty($author) && strcasecmp($commit_author, $author) !== 0) {
          continue;
        }

        $merged_at = NULL;

        // Extract merged_at from first associated PR if available.
        if ($include_merged_at && !empty($node['associatedPullRequests']['nodes'][0]['mergedAt'])) {
          $merged_at = $node['associatedPullRequests']['nodes'][0]['mergedAt'];
        }

        $all_commits[] = [
          'sha' => $node['oid'],
          'message' => $node['message'],
          'date' => $node['committedDate'],
          'author' => $node['author']['name'] ?? $author,
          'url' => $node['url'],
          'merged_at' => $merged_at,
        ];
      }

      // Check for next page.
      $page_info = $history['pageInfo'] ?? [];
      $has_next_page = $page_info['hasNextPage'] ?? FALSE;
      $after_cursor = $page_info['endCursor'] ?? NULL;
    }

    return [
      'totalCount' => count($all_commits),
      'commits' => $all_commits,
    ];
  }

  /**
   * Builds a GraphQL query for fetching commits.
   *
   * @param string $org
   *   The GitHub organization or username.
   * @param string $repo
   *   The GitHub repository name.
   * @param string $author
   *   The GitHub author username.
   * @param int $per_page
   *   Number of commits per page.
   * @param bool $include_merged_at
   *   Whether to include PR merge information.
   * @param string|null $after
   *   Pagination cursor.
   *
   * @return string
   *   The GraphQL query.
   */
  protected function buildGraphQLQuery(string $org, string $repo, string $author, int $per_page, bool $include_merged_at, ?string $after): string {
    $after_param = $after ? ', after: "' . addslashes($after) . '"' : '';
    $pr_fragment = $include_merged_at ? 'associatedPullRequests(first: 1) { nodes { mergedAt } }' : '';

    // Escape variables for GraphQL query.
    $org_safe = addslashes($org);
    $repo_safe = addslashes($repo);

    return <<<GRAPHQL
{
  repository(owner: "$org_safe", name: "$repo_safe") {
    defaultBranchRef {
      target {
        ... on Commit {
          history(first: $per_page$after_param) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                oid
                message
                committedDate
                url
                author {
                  name
                  email
                  user {
                    login
                  }
                }
                $pr_fragment
              }
            }
          }
        }
      }
    }
  }
}
GRAPHQL;
  }

  /**
   * Makes a GraphQL request to GitHub API.
   *
   * @param string $query
   *   The GraphQL query.
   * @param string|null $api_key
   *   The GitHub API key.
   *
   * @return array
   *   The decoded JSON response.
   *
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
  protected function makeGraphQLRequest(string $query, ?string $api_key): array {
    $options = [
      'headers' => [
        'Accept' => 'application/vnd.github+json',
        'User-Agent' => 'Drupal-OOD-Contributions',
        'Content-Type' => 'application/json',
      ],
      'json' => ['query' => $query],
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
      if (!empty($data['errors'])) {
        $error_messages = array_map(fn($e) => $e['message'] ?? 'Unknown error', $data['errors']);
        throw new \Exception('GraphQL errors: ' . implode(', ', $error_messages));
      }

      return $data;
    }
    catch (GuzzleException $e) {
      $this->logger->warning('GitHub GraphQL request failed: @message', [
        '@message' => $e->getMessage(),
      ]);
      throw $e;
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

}
