<?php

namespace Drupal\ood_software\Plugin;

use Drupal\Component\Utility\Xss;
use Drupal\Component\Serialization\Yaml;

/**
 * Pull Software from github.
 */
class GitHubService {

  /**
   * Github owner.
   *
   * @var
   */
  protected $owner;

  /**
   * Github name.
   *
   * @var
   */
  protected $name;

  /**
   * Github data.
   *
   * @array
   */
  protected $data;

  /**
   * Manifest data.
   *
   * @string
   */
  protected $manifestData;

  /**
   * Is Archived.
   *
   * @var
   */
  protected $isArchived;

  /**
   * Stars for repo.
   *
   * @number
   */
  protected $stars;

  /**
   * Repo readme.
   *
   * @var
   */
  protected $readme;

  /**
   * Repo name.
   *
   * @var
   */
  protected $repoName;

  /**
   * Repo description.
   *
   * @var
   */
  protected $description;

  /**
   * Construct object.
   */
  public function __construct() {
  }

  /**
   * Parse github repo url.
   */
  public function parseUrl($repo) {
    $parsed_url = parse_url(Xss::filter($repo));
    if (isset($parsed_url['host']) && $parsed_url['host'] === 'github.com') {
      $path_parts = explode('/', trim($parsed_url['path'], '/'));
      if (count($path_parts) >= 2) {
        $organization = $path_parts[0];
        $repository = $path_parts[1];
        $this->owner = $organization;
        $this->name = $repository;

        // If valid GitHub URL, fetch data.
        $this->fetchRepoData();

        return TRUE;
      }
      else {
        // Invalid GitHub URL format.
        \Drupal::messenger()->addError(t('Invalid GitHub repository URL. Please enter a valid URL.'));
        return FALSE;
      }
    }
    else {
      // Not a GitHub URL.
      \Drupal::messenger()->addError(t('The URL provided is not a valid GitHub repository URL.'));
      return FALSE;
    }
  }

  /**
   * Fetch github repo.
   */
  public function fetchRepoData() {
    $client = \Drupal::httpClient();

    $token = \Drupal::service('key.repository')->getKey('appverse_github')->getKeyValue();


    $query = <<<'GRAPHQL'
    query($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        isArchived
        stargazerCount
        forkCount
        pushedAt
        defaultBranchRef {
          name
          target {
            ... on Commit {
              committedDate
            }
          }
        }
        manifestYml: object(expression: "HEAD:manifest.yml") {
          ... on Blob { text }
        }
        appverseYml: object(expression: "HEAD:appverse.yml") {
          ... on Blob { text }
        }
        readme: object(expression: "HEAD:README.md") {
          ... on Blob { text }
        }
        licenseInfo {
          name
          spdxId
        }
        releases(first: 5, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            tagName
            publishedAt
          }
        }
      }
    }
    GRAPHQL;

    $response = $client->post('https://api.github.com/graphql', [
      'headers' => [
        'Authorization' => 'Bearer ' . $token,
        'Content-Type' => 'application/json',
      ],
      'json' => [
        'query' => $query,
        'variables' => [
          'owner' => $this->owner,
          'name' => $this->name,
        ],
      ],
    ]);

    $data = Xss::filter($response->getBody());

    $this->data = json_decode($data, true)['data']['repository'];

    $this->isArchived = $this->data['isArchived'];
    $this->stars = $this->data['stargazerCount'];
    $this->readme = $this->data['readme']['text'] ?? null;

    $manifest_text = $this->data['manifestYml']['text'] ?? null;
    if ($manifest_text === null) {
      \Drupal::messenger()->addError(t('The repository does not contain a manifest.yml file.'));
      \Drupal::logger('ood_software')->error('The repository @repo does not contain a manifest.yml file.', ['@repo' => $this->owner . '/' . $this->name]);
      return;
    }
    $this->manifestData = Yaml::decode($manifest_text);
    $this->repoName = $this->manifestData['name'];
    $this->description = $this->manifestData['description'];
  }

  /**
   * Get github data.
   */
  public function getData() {
    return $this->data;
  }

  /**
   * Get manifest.
   */
  public function getManifestData() {
    return $this->manifestData;
  }

  /**
   * Get is archived.
   */
  public function getIsArchived() {
    return $this->isArchived;
  }

  /**
   * Get stars.
   */
  public function getStars() {
    return $this->stars;
  }

  /**
   * Get readme.
   */
  public function getReadme() {
    return $this->readme;
  }

  /**
   * Get repo name.
   */
  public function getRepoName() {
    return $this->repoName;
  }

  /**
   * Get description.
   */
  public function getDescription() {
    return $this->description;
  }
}
