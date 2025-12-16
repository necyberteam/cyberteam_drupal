<?php

namespace Drupal\ood_software\Plugin;

use Drupal\Component\Utility\Xss;
use Drupal\Component\Serialization\Yaml;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\key\KeyRepositoryInterface;
use GuzzleHttp\ClientInterface;

/**
 * Pull Software from github.
 */
class GitHubService {

  use StringTranslationTrait;

  /**
   * Github owner.
   *
   * @var string
   */
  protected $owner;

  /**
   * Github name.
   *
   * @var string
   */
  protected $name;

  /**
   * Github data.
   *
   * @var array
   */
  protected $data;

  /**
   * Manifest data.
   *
   * @var array
   */
  protected $manifestData;

  /**
   * Is Archived.
   *
   * @var bool
   */
  protected $isArchived;

  /**
   * Stars for repo.
   *
   * @var int
   */
  protected $stars;

  /**
   * Repo readme.
   *
   * @var string|null
   */
  protected $readme;

  /**
   * Repo name.
   *
   * @var string
   */
  protected $repoName;

  /**
   * Repo description.
   *
   * @var string
   */
  protected $description;

  /**
   * Last commited unix timestamp.
   *
   * @var int
   */
  protected $lastComittedDate;

  /**
   * Repo license.
   *
   * @var string
   */
  protected $license;

  /**
   * Role - app type.
   *
   * @var string
   */
  protected $role;

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
   * The messenger service.
   *
   * @var \Drupal\Core\Messenger\MessengerInterface
   */
  protected $messenger;

  /**
   * The logger service.
   *
   * @var \Drupal\Core\Logger\LoggerChannelInterface
   */
  protected $logger;

  /**
   * Construct object.
   *
   * @param \GuzzleHttp\ClientInterface $http_client
   *   The HTTP client.
   * @param \Drupal\key\KeyRepositoryInterface $key_repository
   *   The key repository service.
   * @param \Drupal\Core\Messenger\MessengerInterface $messenger
   *   The messenger service.
   * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $logger_factory
   *   The logger factory service.
   */
  public function __construct(ClientInterface $http_client, KeyRepositoryInterface $key_repository, MessengerInterface $messenger, LoggerChannelFactoryInterface $logger_factory) {
    $this->httpClient = $http_client;
    $this->keyRepository = $key_repository;
    $this->messenger = $messenger;
    $this->logger = $logger_factory->get('ood_software');
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
        $this->messenger->addError($this->t('Invalid GitHub repository URL. Please enter a valid URL.'));
        return FALSE;
      }
    }
    else {
      // Not a GitHub URL.
      $this->messenger->addError($this->t('The URL provided is not a valid GitHub repository URL.'));
      return FALSE;
    }
  }

  /**
   * Fetch github repo.
   */
  public function fetchRepoData() {
    $token = $this->keyRepository->getKey('appverse_github')->getKeyValue();

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

    $response = $this->httpClient->post('https://api.github.com/graphql', [
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

    $this->data = json_decode($data, TRUE)['data']['repository'];

    $this->isArchived = $this->data['isArchived'];
    $this->stars = $this->data['stargazerCount'];
    $this->readme = $this->data['readme']['text'] ?? NULL;
    $this->lastComittedDate = strtotime($this->data['defaultBranchRef']['target']['committedDate']);
    $this->license = $this->data['licenseInfo']['spdxId'] ?? 'NOASSERTION';

    $manifest_text = $this->data['manifestYml']['text'] ?? NULL;
    if ($manifest_text === NULL) {
      $this->messenger->addError($this->t('The repository does not contain a manifest.yml file.'));
      $this->logger->error('The repository @repo does not contain a manifest.yml file.', ['@repo' => $this->owner . '/' . $this->name]);
      return;
    }
    $this->manifestData = Yaml::decode($manifest_text);
    $this->repoName = $this->manifestData['name'];
    $this->description = $this->manifestData['description'];
    $this->role = $this->manifestData['role'] ?? NULL;
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

  /**
   * Get last committed date.
   */
  public function getLastComittedDate() {
    return $this->lastComittedDate;
  }

  /**
   * Get license.
   */
  public function getLicense() {
    return $this->license;
  }

  /**
   * Get role.
   */
  public function getRole() {
    return $this->role;
  }
}
