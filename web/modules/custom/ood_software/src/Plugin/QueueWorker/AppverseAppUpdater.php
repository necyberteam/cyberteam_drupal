<?php

namespace Drupal\ood_software\Plugin\QueueWorker;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Queue\QueueWorkerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\ood_software\Plugin\GitHubService;
use Drupal\ood_software\Service\RepoSyncService;
use Drupal\node\NodeInterface;
use Symfony\Component\Yaml\Yaml;
use Symfony\Component\Yaml\Exception\ParseException;

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
   * The Repo sync service.
   *
   * @var \Drupal\ood_software\Service\RepoSyncService
   */
  protected $repoSync;

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
   * @param \Drupal\ood_software\Service\RepoSyncService $repo_sync
   *   The Repo sync service.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity_type_manager, GitHubService $github_service, RepoSyncService $repo_sync) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entityTypeManager = $entity_type_manager;
    $this->githubService = $github_service;
    $this->repoSync = $repo_sync;
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
      $container->get('ood_software.repo_sync')
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

      $appverseYmlText = $this->githubService->getAppverseYmlText();
      $repoMetadata = [
        'name' => $this->githubService->getRepoName(),
        'description' => $this->githubService->getRepoDescription(),
        'organization' => $this->githubService->getOrganization(),
        'stars' => $this->githubService->getStars(),
        'lastCommittedDate' => $this->githubService->getLastComittedDate(),
        'readme' => $this->githubService->getReadme(),
      ];

      // Resolve the Repo for this repo and attach to the app.
      $repo = $this->repoSync->resolveRepo(
        $this->githubService->getRepoUrl(),
        $appverseYmlText,
        $repoMetadata
      );

      // If the maintainer added a root appverse.yml declaring an apps[] list
      // since this repo was registered (a single-app or inferred repo becoming
      // a monorepo), resolveRepo() above flips the shape but does NOT create
      // the member apps — that needs a fetch-subpaths pass. Detect the pending
      // transition and run the full declared sync so cron materializes the
      // members instead of leaving an empty Collection. Guarded to fire only
      // when the repo's members don't yet match the declared apps[], so it
      // doesn't re-sync on every pass (the queue processes every app).
      $this->syncDeclaredMembersIfPending($repo, $appverseYmlText, $repoMetadata);
      $currentRepoId = $node->get('field_appverse_repo')->target_id;
      if ((int) $currentRepoId !== (int) $repo->id()) {
        $node->set('field_appverse_repo', $repo->id());
        $needsSave = TRUE;
      }

      // Always update stars.
      $currentStars = $node->get('field_appverse_stars')->value;
      $newStars = $this->githubService->getStars();
      if ($currentStars === NULL || $currentStars !== $newStars) {
        $node->set('field_appverse_stars', $newStars);
        $needsSave = TRUE;
      }

      // Update root-derived content fields if the repo has new commits — but
      // ONLY for apps whose content comes from the repo root. A monorepo
      // member app (non-empty field_appverse_app_subpath) gets its body,
      // README, and app_type from its OWN subpath via RepoSyncService, which
      // owns those fields. This worker reads root-level data only, so syncing
      // it here would clobber the member's per-subpath values with root (often
      // empty) content. Skip the block for member apps; stars and the repo
      // link above still apply to every app.
      $isMemberApp = !$node->get('field_appverse_app_subpath')->isEmpty();
      if (!$isMemberApp && $lastupdated != $this->githubService->getLastComittedDate()) {
        // A repo that lost (or never had) a root manifest.yml returns an empty
        // description/README; guard the writes so an empty source can't blank a
        // good catalog value.
        $newDescription = $this->githubService->getDescription();
        if ($newDescription !== NULL && $newDescription !== '') {
          $node->set('body', [['format' => 'markdown', 'value' => $newDescription]]);
        }
        $newReadme = $this->githubService->getReadme();
        if ($newReadme !== NULL && $newReadme !== '') {
          $node->set('field_appverse_readme', [['format' => 'markdown', 'value' => $newReadme]]);
        }
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
    else {
      // parseUrl() failed: the repo is gone, private, rate-limited, or its
      // URL no longer parses. Previously the app was skipped silently, hiding
      // the fact that a catalogued app's upstream is unreachable. Log it so
      // it's visible; leave the node untouched (a transient rate-limit
      // shouldn't mutate catalog state).
      \Drupal::logger('ood_software')->warning('Cron app update skipped: could not fetch @url for app @nid (repo deleted, private, rate-limited, or invalid URL).', [
        '@url' => $github_url,
        '@nid' => $nid,
      ]);
    }
  }

  /**
   * Materialize declared member apps when a repo has newly gained an apps[].
   *
   * Fires only when the root appverse.yml declares subpaths that don't all
   * exist as member apps yet — i.e. a real pending transition — so the full
   * (GitHub-hitting) sync runs once, not on every queued app of the repo.
   *
   * @param \Drupal\node\NodeInterface $repo
   *   The parent Repo node.
   * @param string|null $appverseYmlText
   *   Raw root appverse.yml text, or NULL if the repo has none.
   * @param array $repoMetadata
   *   Repo-level metadata forwarded to the sync.
   */
  protected function syncDeclaredMembersIfPending(NodeInterface $repo, ?string $appverseYmlText, array $repoMetadata): void {
    if ($appverseYmlText === NULL || trim($appverseYmlText) === '') {
      return;
    }
    try {
      $parsed = Yaml::parse($appverseYmlText);
    }
    catch (ParseException) {
      return;
    }
    if (!is_array($parsed)) {
      return;
    }
    $declaredSubpaths = [];
    foreach (($parsed['apps'] ?? []) as $entry) {
      $path = is_array($entry) ? trim((string) ($entry['path'] ?? ''), '/') : '';
      if ($path !== '') {
        $declaredSubpaths[$path] = TRUE;
      }
    }
    if (!$declaredSubpaths) {
      // No apps[] — a declared single-app or inferred repo; resolveRepo already
      // handled it. Nothing to materialize.
      return;
    }

    // What member subpaths already exist for this repo?
    $existingIds = $this->entityTypeManager->getStorage('node')->getQuery()
      ->accessCheck(FALSE)
      ->condition('type', 'appverse_app')
      ->condition('field_appverse_repo', $repo->id())
      ->execute();
    $existingSubpaths = [];
    foreach ($this->entityTypeManager->getStorage('node')->loadMultiple($existingIds) as $app) {
      $existingSubpaths[trim((string) $app->get('field_appverse_app_subpath')->value, '/')] = TRUE;
    }

    // Pending transition = a declared subpath with no member yet. (This also
    // covers the fresh flip where the repo has zero real members.) When the
    // members already match, do nothing so cron doesn't re-sync every pass.
    $pending = array_diff_key($declaredSubpaths, $existingSubpaths);
    if (!$pending) {
      return;
    }

    // Fetch every declared subpath's files in one GitHub round-trip, then hand
    // them to the sync (the fetch lives here, where GitHubService is loaded).
    $this->githubService->fetchAppSubpaths(array_keys($declaredSubpaths));
    $subpathFiles = $this->githubService->getAppSubpathFiles();

    $count = $this->repoSync->syncDeclaredRepoFully(
      $repo,
      $this->githubService->getRepoUrl(),
      $parsed,
      $subpathFiles,
      $repoMetadata
    );
    \Drupal::logger('ood_software')->notice('Cron materialized @count declared member apps for repo @nid (appverse.yml apps[] added after registration).', [
      '@count' => $count,
      '@nid' => $repo->id(),
    ]);
  }

}
