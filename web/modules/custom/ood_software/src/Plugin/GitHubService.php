<?php

namespace Drupal\ood_software\Plugin;

use Drupal\Component\Utility\Xss;
use Drupal\Component\Serialization\Yaml;
use Drupal\Core\Entity\EntityTypeManagerInterface;
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
   * Manifest role → taxonomy term name mapping.
   *
   * Keys are manifest 'role' values; sub-keys are 'subcategory' values
   * (use '*' as default). Values are arrays of term names.
   */
  const APP_TYPE_MANIFEST_MAP = [
    'batch_connect' => [
      'GUIs' => ['batch-connect-VNC'],
      '*' => ['batch-connect-basic'],
    ],
    'dashboard' => [
      '*' => ['dashboards'],
    ],
    'passenger_app' => [
      '*' => ['companion_app'],
    ],
    'widget' => [
      '*' => ['widgets'],
    ],
  ];

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
   * Repo license link.
   *
   * @var string
   */
  protected $licenseLink;

  /**
   * Organization name.
   *
   * @var string
   */
  protected $organization;

  /**
   * Role - app type.
   *
   * @var string
   */
  protected $role;

  /**
   * Subcategory from manifest.
   *
   * @var string|null
   */
  protected $subcategory;

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
   * The entity type manager service.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

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
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager service.
   */
  public function __construct(ClientInterface $http_client, KeyRepositoryInterface $key_repository, MessengerInterface $messenger, LoggerChannelFactoryInterface $logger_factory, EntityTypeManagerInterface $entity_type_manager) {
    $this->httpClient = $http_client;
    $this->keyRepository = $key_repository;
    $this->messenger = $messenger;
    $this->logger = $logger_factory->get('ood_software');
    $this->entityTypeManager = $entity_type_manager;
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

        if ($this->manifestData === FALSE) {
          $this->messenger->addError($this->t('Please make sure you have the proper yml files added to your repository.'));
          return FALSE;
        }
        else {
          return TRUE;
        }

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
        owner {
          login
          ... on Organization {
            name
          }
          ... on User {
            name
          }
        }
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
          url
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

    // Parse JSON first, then sanitize specific content fields.
    // Running Xss::filter() on raw JSON corrupts embedded HTML attributes.
    $this->data = json_decode($response->getBody()->getContents(), TRUE)['data']['repository'];

    $this->isArchived = $this->data['isArchived'];
    $this->stars = $this->data['stargazerCount'];
    // Sanitize README content with filterAdmin to allow safe HTML while
    // filtering dangerous protocols (javascript:) and event handlers (onclick).
    $readme_raw = $this->data['readme']['text'] ?? NULL;
    $this->readme = $readme_raw ? Xss::filterAdmin($readme_raw) : NULL;
    $this->lastComittedDate = strtotime($this->data['defaultBranchRef']['target']['committedDate']);
    $this->licenseLink = $this->data['licenseInfo']['url'] ?? NULL;
    $this->license = $this->data['licenseInfo']['spdxId'] ?? NULL;
    $this->organization = $this->data['owner']['name'];

    $manifest_text = $this->data['manifestYml']['text'] ?? NULL;
    if ($manifest_text === NULL || $this->readme === NULL || $this->license === NULL) {
      if ($manifest_text === NULL) {
        $this->messenger->addError($this->t('The manifest.yml needs to be at the root of the repository. Find our about <a href=":bp">best practices</a> in including your app in the Appverse.', [':bp' => 'https://ondemand.connectci.org/appverse-contributor-documentation']));
        $this->logger->error('The repository @repo does not contain a manifest.yml file.', ['@repo' => $this->owner . '/' . $this->name]);
      }
      if ($this->readme === NULL) {
        $this->messenger->addError($this->t('The repository does not contain a README.md file.'));
        $this->logger->error('The repository @repo does not contain a README.md file.', ['@repo' => $this->owner . '/' . $this->name]);
      }
      if ($this->license === NULL) {
        $this->messenger->addError($this->t('The repository does not contain a license file or recognized license information.'));
        $this->logger->error('The repository @repo does not contain recognized license information.', ['@repo' => $this->owner . '/' . $this->name]);
      }
      $this->manifestData = FALSE;
      return;
    }
    $this->manifestData = Yaml::decode($manifest_text);
    $this->repoName = $this->manifestData['name'];
    // Sanitize description from manifest as it may contain HTML.
    $description_raw = $this->manifestData['description'] ?? '';
    $this->description = $description_raw ? Xss::filterAdmin($description_raw) : '';
    $this->role = $this->manifestData['role'] ?? NULL;
    $this->subcategory = $this->manifestData['subcategory'] ?? NULL;
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
  public function getLicenseLink() {
    return $this->licenseLink;
  }

  /**
   * Get license.
   */
  public function getLicense() {
    return $this->license;
  }

  /**
   * Get Organization.
   */
  public function getOrganization() {
    return $this->organization;
  }

  /**
   * Get AppType label for form display.
   */
  public function getAppType() {
    $label = $this->role;
    if ($label && $this->subcategory) {
      $label .= ' (' . $this->subcategory . ')';
    }
    return $label;
  }

  /**
   * Get subcategory from manifest.
   */
  public function getSubcategory() {
    return $this->subcategory;
  }

  /**
   * Get AppTypeId based on set role (backward compat, returns first match).
   */
  public function getAppTypeId() {
    $ids = $this->getAppTypeIds();
    return $ids ? reset($ids) : NULL;
  }

  /**
   * Resolve role + subcategory to taxonomy term IDs.
   */
  public function getAppTypeIds(): array {
    if (empty($this->role)) {
      return [];
    }
    $role_map = self::APP_TYPE_MANIFEST_MAP[$this->role] ?? NULL;
    if ($role_map === NULL) {
      $this->logger->notice('No app type mapping for manifest role: @role', ['@role' => $this->role]);
      return [];
    }
    $term_names = $role_map[$this->subcategory] ?? $role_map['*'] ?? [];
    if (empty($term_names)) {
      return [];
    }
    $ids = [];
    $storage = $this->entityTypeManager->getStorage('taxonomy_term');
    foreach ($term_names as $name) {
      $terms = $storage->loadByProperties(['name' => $name, 'vid' => 'appverse_app_type']);
      $term = reset($terms);
      if ($term) {
        $ids[] = (int) $term->id();
      }
      else {
        $this->logger->warning('App type term not found: @name', ['@name' => $name]);
      }
    }
    return $ids;
  }

  /**
   * Get all term names that can be auto-assigned from manifest data.
   */
  public static function getAutoAssignableTermNames(): array {
    $names = [];
    foreach (self::APP_TYPE_MANIFEST_MAP as $subcategories) {
      foreach ($subcategories as $termNames) {
        $names = array_merge($names, $termNames);
      }
    }
    return array_unique($names);
  }

  /**
   * Get license.
   */
  public function getLicenseInfo() {
    return $this->license;
  }

}
