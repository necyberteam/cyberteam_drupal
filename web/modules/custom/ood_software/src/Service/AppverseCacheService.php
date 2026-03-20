<?php

namespace Drupal\ood_software\Service;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\File\FileUrlGeneratorInterface;
use Drupal\Core\File\FileExists;
use Drupal\Core\File\FileSystemInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\node\NodeInterface;
use Psr\Log\LoggerInterface;

/**
 * Generates a static JSON cache of appverse data for fast frontend loading.
 */
class AppverseCacheService {

  const CACHE_DIR = 'public://appverse-cache';
  const CACHE_FILE = 'public://appverse-cache/appverse-data.json';

  protected LoggerInterface $logger;

  public function __construct(
    protected EntityTypeManagerInterface $entityTypeManager,
    protected FileUrlGeneratorInterface $fileUrlGenerator,
    protected FileSystemInterface $fileSystem,
    LoggerChannelFactoryInterface $loggerFactory,
  ) {
    $this->logger = $loggerFactory->get('ood_software');
  }

  /**
   * Generate and write the static JSON cache file.
   */
  public function generate(): bool {
    try {
      $data = [
        'software' => $this->buildSoftwareData(),
        'filterOptions' => [],
        'generated' => date('c'),
      ];

      $data['filterOptions'] = $this->extractFilterOptions($data['software']);

      $cacheDir = self::CACHE_DIR;
      $this->fileSystem->prepareDirectory($cacheDir, FileSystemInterface::CREATE_DIRECTORY | FileSystemInterface::MODIFY_PERMISSIONS);

      $json = json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
      $this->fileSystem->saveData($json, self::CACHE_FILE, FileExists::Replace);

      $this->logger->info('Appverse cache generated: @size bytes, @count software items.', [
        '@size' => strlen($json),
        '@count' => count($data['software']),
      ]);

      return TRUE;
    }
    catch (\Throwable $e) {
      $this->logger->error('Failed to generate appverse cache: @message', [
        '@message' => $e->getMessage(),
      ]);
      return FALSE;
    }
  }

  /**
   * Build the software array with nested apps.
   */
  protected function buildSoftwareData(): array {
    $nodeStorage = $this->entityTypeManager->getStorage('node');

    // Load all published software nodes.
    $softwareNids = $nodeStorage->getQuery()
      ->condition('type', 'appverse_software')
      ->condition('status', 1)
      ->sort('title')
      ->accessCheck(FALSE)
      ->execute();
    $softwareNodes = $nodeStorage->loadMultiple($softwareNids);

    // Load all published app nodes.
    $appNids = $nodeStorage->getQuery()
      ->condition('type', 'appverse_app')
      ->condition('status', 1)
      ->accessCheck(FALSE)
      ->execute();
    $appNodes = $nodeStorage->loadMultiple($appNids);

    // Group apps by software UUID.
    $appsBySoftware = [];
    foreach ($appNodes as $app) {
      $softwareRef = $app->get('field_appverse_software_implemen')->entity;
      if ($softwareRef) {
        $appsBySoftware[$softwareRef->uuid()][] = $app;
      }
    }

    $result = [];
    foreach ($softwareNodes as $software) {
      $uuid = $software->uuid();
      $apps = $appsBySoftware[$uuid] ?? [];

      $result[] = [
        'id' => $uuid,
        'title' => $software->getTitle(),
        'slug' => basename($software->toUrl()->toString()),
        'nid' => (int) $software->id(),
        'logoUrl' => $this->getLogoUrl($software),
        'websiteUrl' => $software->get('field_appverse_software_website')->uri ?? NULL,
        'docsUrl' => $software->get('field_appverse_software_doc')->uri ?? NULL,
        'body' => $software->get('body')->processed ?? $software->get('body')->value ?? NULL,
        'topics' => $this->getTerms($software, 'field_appverse_topics'),
        'license' => $this->getTerm($software, 'field_license'),
        'tags' => $this->getTerms($software, 'field_tags'),
        'appCount' => count($apps),
        'apps' => array_map(fn($app) => $this->buildAppData($app, $uuid), $apps),
      ];
    }

    return $result;
  }

  /**
   * Build a single app data array.
   */
  protected function buildAppData(NodeInterface $app, string $softwareId): array {
    return [
      'id' => $app->uuid(),
      'title' => $app->getTitle(),
      'nid' => (int) $app->id(),
      'githubUrl' => $app->get('field_appverse_github_url')->uri ?? NULL,
      'stars' => (int) ($app->get('field_appverse_stars')->value ?? 0),
      'flagCount' => $app->hasField('flag_count') ? (int) ($app->get('flag_count')->value ?? 0) : 0,
      'lastUpdated' => $app->get('field_appverse_lastupdated')->value ? (int) $app->get('field_appverse_lastupdated')->value : NULL,
      'appTypes' => $this->getTerms($app, 'field_appverse_app_type'),
      'tags' => $this->getTerms($app, 'field_add_implementation_tags'),
      'softwareId' => $softwareId,
    ];
  }

  /**
   * Get multiple taxonomy terms from an entity reference field.
   */
  protected function getTerms($entity, string $fieldName): array {
    if (!$entity->hasField($fieldName) || $entity->get($fieldName)->isEmpty()) {
      return [];
    }

    $terms = [];
    foreach ($entity->get($fieldName)->referencedEntities() as $term) {
      $terms[] = [
        'id' => $term->uuid(),
        'name' => $term->getName(),
      ];
    }
    return $terms;
  }

  /**
   * Get a single taxonomy term from an entity reference field.
   */
  protected function getTerm($entity, string $fieldName): ?array {
    $terms = $this->getTerms($entity, $fieldName);
    return $terms[0] ?? NULL;
  }

  /**
   * Get logo URL from a software node's media field.
   */
  protected function getLogoUrl(NodeInterface $software): ?string {
    if (!$software->hasField('field_appverse_logo') || $software->get('field_appverse_logo')->isEmpty()) {
      return NULL;
    }
    $media = $software->get('field_appverse_logo')->entity;
    if (!$media) {
      return NULL;
    }
    $source_field = $media->getSource()->getConfiguration()['source_field'];
    if (!$media->hasField($source_field) || $media->get($source_field)->isEmpty()) {
      return NULL;
    }
    $file = $media->get($source_field)->entity;
    if (!$file) {
      return NULL;
    }
    // Return relative URL — the React app prepends siteBaseUrl.
    return $this->fileUrlGenerator->generateString($file->getFileUri());
  }

  /**
   * Extract unique filter options from the built software data.
   */
  protected function extractFilterOptions(array $softwareList): array {
    $topics = [];
    $licenses = [];
    $tags = [];
    $appTypes = [];

    foreach ($softwareList as $sw) {
      foreach ($sw['topics'] as $t) {
        $topics[$t['id']] = $t;
      }
      if ($sw['license']) {
        $licenses[$sw['license']['id']] = $sw['license'];
      }
      foreach ($sw['tags'] as $t) {
        $tags[$t['id']] = $t;
      }
      foreach ($sw['apps'] as $app) {
        foreach ($app['tags'] as $t) {
          $tags[$t['id']] = $t;
        }
        foreach ($app['appTypes'] as $t) {
          $appTypes[$t['id']] = $t;
        }
      }
    }

    $sort = fn($a, $b) => strcasecmp($a['name'], $b['name']);

    $topics = array_values($topics);
    usort($topics, $sort);
    $licenses = array_values($licenses);
    usort($licenses, $sort);
    $tags = array_values($tags);
    usort($tags, $sort);
    $appTypes = array_values($appTypes);
    usort($appTypes, $sort);

    return compact('topics', 'licenses', 'tags', 'appTypes');
  }

}
