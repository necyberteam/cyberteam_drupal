<?php

namespace Drupal\ood_software\Plugin\QueueWorker;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Queue\QueueWorkerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\ood_software\Plugin\GitHubService;
use Drupal\ood_software\Service\CollectionSyncService;

/**
 * Processes Appverse App nodes to update GitHub data.
 *
 * @QueueWorker(
 *   id = "appverse_app_updater",
 *   title = @Translation("Appverse App Updater"),
 *   cron = {"time" = 60}
 * )
 */
final class AppverseAppUpdater extends QueueWorkerBase implements ContainerFactoryPluginInterface {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The GitHub service.
   *
   * @var \Drupal\ood_software\Plugin\GitHubService
   */
  protected $githubService;

  /**
   * The Collection sync service.
   *
   * @var \Drupal\ood_software\Service\CollectionSyncService
   */
  protected $collectionSync;

  /**
   * Constructs a new AppverseAppUpdater object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   * @param \Drupal\ood_software\Plugin\GitHubService $github_service
   *   The GitHub service.
   * @param \Drupal\ood_software\Service\CollectionSyncService $collection_sync
   *   The Collection sync service.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity_type_manager, GitHubService $github_service, CollectionSyncService $collection_sync) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entityTypeManager = $entity_type_manager;
    $this->githubService = $github_service;
    $this->collectionSync = $collection_sync;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('entity_type.manager'),
      $container->get('ood_software.gh'),
      $container->get('ood_software.collection_sync')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function processItem($data) {
    $nid = $data['nid'];
    $node = $this->entityTypeManager->getStorage('node')->load($nid);

    if (!$node) {
      return;
    }

    $github_url = $node->get('field_appverse_github_url')->uri;

    $validUrl = $this->githubService->parseUrl($github_url);
    if ($validUrl) {
      $this->githubService->getData();
      $lastupdated = $node->get('field_appverse_lastupdated')->value;
      $needsSave = FALSE;

      // Resolve the Collection for this repo and attach to the app.
      $collection = $this->collectionSync->resolveCollection(
        $this->githubService->getRepoUrl(),
        $this->githubService->getAppverseYmlText(),
        [
          'name' => $this->githubService->getRepoName(),
          'description' => $this->githubService->getRepoDescription(),
          'organization' => $this->githubService->getOrganization(),
          'stars' => $this->githubService->getStars(),
          'lastCommittedDate' => $this->githubService->getLastComittedDate(),
          'readme' => $this->githubService->getReadme(),
        ]
      );
      $currentCollectionId = $node->get('field_appverse_collection')->target_id;
      if ((int) $currentCollectionId !== (int) $collection->id()) {
        $node->set('field_appverse_collection', $collection->id());
        $needsSave = TRUE;
      }

      // Always update stars.
      $currentStars = $node->get('field_appverse_stars')->value;
      $newStars = $this->githubService->getStars();
      if ($currentStars === NULL || $currentStars !== $newStars) {
        $node->set('field_appverse_stars', $newStars);
        $needsSave = TRUE;
      }

      // Update other fields if repo has new commits.
      if ($lastupdated != $this->githubService->getLastComittedDate()) {
        $node->set('body', [['format' => 'markdown', 'value' => $this->githubService->getDescription()]]);
        $node->set('field_appverse_readme', [['format' => 'markdown', 'value' => $this->githubService->getReadme()]]);
        $node->set('field_appverse_lastupdated', [['value' => $this->githubService->getLastComittedDate()]]);
        $needsSave = TRUE;

        // Sync auto-detected app types, preserving manually-added terms.
        $autoDetectedIds = $this->githubService->getAppTypeIds();
        $currentValues = $node->get('field_appverse_app_type')->getValue();
        $currentIds = array_map(fn($v) => (int) $v['target_id'], $currentValues);

        // Determine which current IDs are auto-assignable (managed by sync).
        $autoAssignableNames = GitHubService::getAutoAssignableTermNames();
        $autoAssignableIds = [];
        if (!empty($autoAssignableNames)) {
          $terms = $this->entityTypeManager->getStorage('taxonomy_term')
            ->loadByProperties(['name' => $autoAssignableNames, 'vid' => 'appverse_app_type']);
          foreach ($terms as $term) {
            $autoAssignableIds[] = (int) $term->id();
          }
        }

        // Manual IDs = current IDs NOT in the auto-assignable set.
        $manualIds = array_diff($currentIds, $autoAssignableIds);

        // New set = manual + newly auto-detected.
        $newIds = array_values(array_unique(array_merge($manualIds, $autoDetectedIds)));
        sort($newIds);

        $sortedCurrentIds = $currentIds;
        sort($sortedCurrentIds);
        if ($newIds !== $sortedCurrentIds) {
          $node->set('field_appverse_app_type', array_map(fn($id) => ['target_id' => $id], $newIds));
        }
      }

      if ($needsSave) {
        $node->save();
      }
    }
  }

}
