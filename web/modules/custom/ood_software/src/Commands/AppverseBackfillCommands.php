<?php

namespace Drupal\ood_software\Commands;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\ood_software\Plugin\GitHubService;
use Drupal\ood_software\Service\RepoSyncService;
use Drush\Commands\DrushCommands;

/**
 * Drush commands for backfilling legacy Apps with inferred Collections.
 */
class AppverseBackfillCommands extends DrushCommands {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The Collection sync service.
   *
   * @var \Drupal\ood_software\Service\RepoSyncService
   */
  protected $repoSync;

  /**
   * The GitHub service.
   *
   * @var \Drupal\ood_software\Plugin\GitHubService
   */
  protected $github;

  /**
   * The ood_software logger channel.
   *
   * @var \Psr\Log\LoggerInterface
   */
  protected $oodLogger;

  /**
   * Constructs an AppverseBackfillCommands object.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   * @param \Drupal\ood_software\Service\RepoSyncService $repo_sync
   *   The Collection sync service.
   * @param \Drupal\ood_software\Plugin\GitHubService $github
   *   The GitHub service.
   * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $logger_factory
   *   The logger factory.
   */
  public function __construct(
    EntityTypeManagerInterface $entity_type_manager,
    RepoSyncService $repo_sync,
    GitHubService $github,
    LoggerChannelFactoryInterface $logger_factory,
  ) {
    parent::__construct();
    $this->entityTypeManager = $entity_type_manager;
    $this->repoSync = $repo_sync;
    $this->github = $github;
    // Drush asserts that $this->logger stays under its LoggerManager
    // control, so we keep the module's logger channel under a separate
    // property name. Use $this->logger() for command-line output and
    // $this->oodLogger for structured module logging if needed.
    $this->oodLogger = $logger_factory->get('ood_software');
  }

  /**
   * Create inferred Collections for legacy Apps with no parent.
   *
   * @param array $options
   *   Command options.
   *
   * @command appverse:backfill-inferred-repos
   * @aliases appverse-backfill
   * @option chunk Number of Apps to process per batch operation. Default 25.
   * @usage drush appverse:backfill-inferred-repos
   *   Process all Apps with NULL field_appverse_repo.
   */
  public function backfill(array $options = ['chunk' => 25]): void {
    $chunk = (int) ($options['chunk'] ?? 25);
    if ($chunk < 1) {
      $chunk = 25;
    }

    // Backfill ALL Apps regardless of status (published or unpublished).
    // Every App should have a parent Collection per the spec's "every
    // App belongs to a Collection" rule. Unpublished legacy Apps with
    // no parent Collection would be invisible in the hub today; the
    // backfill makes them visible.
    $appIds = $this->entityTypeManager->getStorage('node')->getQuery()
      ->accessCheck(FALSE)
      ->condition('type', 'appverse_app')
      ->notExists('field_appverse_repo')
      ->execute();

    $total = count($appIds);
    if ($total === 0) {
      $this->logger()->success('No Apps need backfill. All appverse_app nodes already have field_appverse_repo set.');
      $this->oodLogger->info('Backfill skipped: no Apps need backfilling.');
      return;
    }

    $this->logger()->notice("Backfilling $total Apps in chunks of $chunk.");
    $this->oodLogger->info('Backfill started: @total Apps in chunks of @chunk.', ['@total' => $total, '@chunk' => $chunk]);

    $chunks = array_chunk(array_values($appIds), $chunk);
    $operations = [];
    foreach ($chunks as $chunkOfIds) {
      $operations[] = [
        [self::class, 'processChunk'],
        [$chunkOfIds],
      ];
    }

    batch_set([
      'title' => 'Backfilling inferred Collections',
      'operations' => $operations,
      'finished' => [self::class, 'finishedCallback'],
    ]);

    drush_backend_batch_process();
  }

  /**
   * Batch operation: process one chunk of App IDs.
   *
   * @param int[] $appIds
   *   App node IDs to process in this chunk.
   * @param array $context
   *   The batch context array.
   */
  public static function processChunk(array $appIds, array &$context): void {
    $em = \Drupal::entityTypeManager();
    $sync = \Drupal::service('ood_software.repo_sync');
    $github = \Drupal::service('ood_software.gh');
    $logger = \Drupal::logger('ood_software');

    foreach ($em->getStorage('node')->loadMultiple($appIds) as $app) {
      try {
        // Link fields store {uri, title, options}. Match the module's
        // convention of reading getValue()[0]['uri'].
        $linkValues = $app->get('field_appverse_github_url')->getValue();
        $repoUrl = $linkValues[0]['uri'] ?? NULL;
        if (empty($repoUrl)) {
          $logger->warning('Skipping App @nid: no repo URL.', ['@nid' => $app->id()]);
          $context['results']['skipped'][] = $app->id();
          continue;
        }

        // Fetch repo metadata so resolveRepo can populate the
        // new Collection with stars / last commit / org / isArchived.
        // If the fetch fails (404, private), still create a thin
        // Collection so the App has a parent — re-syncs later will
        // populate.
        $repoMetadata = [];
        try {
          if ($github->parseUrl($repoUrl)) {
            // parseUrl() already calls fetchRepoData() internally — calling it
            // again here would double the GitHub API request volume during
            // backfill.
            $repoMetadata = [
              'stars' => $github->getStars(),
              'lastCommittedDate' => $github->getLastComittedDate(),
              'organization' => $github->getOrganization(),
              'description' => $github->getDescription(),
              'readme' => $github->getReadme(),
              'license' => $github->getLicense(),
              'licenseLink' => $github->getLicenseLink(),
              // If the legacy app's repo is already archived on GitHub,
              // sync should auto-archive the new Collection (cascading
              // to this App). Without this, archived-repo apps would
              // backfill into 'draft' Collections, which is wrong.
              'isArchived' => $github->getIsArchived(),
            ];
          }
          else {
            $logger->info('Backfill: parseUrl rejected @url, proceeding with empty metadata.', ['@url' => $repoUrl]);
          }
        }
        catch (\Throwable $e) {
          $logger->info('Backfill: could not fetch metadata for @url (@msg) — proceeding with empty metadata.', [
            '@url' => $repoUrl,
            '@msg' => $e->getMessage(),
          ]);
        }

        // resolveRepo with NULL appverse.yml -> applyInferred path.
        $collection = $sync->resolveRepo($repoUrl, NULL, $repoMetadata);

        // The default moderation state for newly-created Collections is
        // 'draft' (set by RepoSyncService). Legacy apps being
        // backfilled are already published; if we leave the parent
        // Collection in draft, the cache cascade hides the app. Override
        // to 'published' so visibility stays aligned with the app's
        // existing state. Don't override if applyInferred already set
        // 'archived' (i.e. the upstream repo is archived) — that state
        // should propagate.
        if ($app->isPublished() && $collection->get('moderation_state')->value !== 'archived') {
          $collection->set('moderation_state', 'published');
          $collection->save();
        }

        $app->set('field_appverse_repo', $collection->id());
        $app->save();

        $context['results']['linked'][] = $app->id();
      }
      catch (\Throwable $e) {
        $logger->error('Backfill failed for App @nid: @msg', [
          '@nid' => $app->id(),
          '@msg' => $e->getMessage(),
        ]);
        $context['results']['failed'][] = $app->id();
      }
    }
  }

  /**
   * Batch finished callback: report counts to the messenger.
   *
   * @param bool $success
   *   Whether the batch completed without fatal errors.
   * @param array $results
   *   The accumulated $context['results'] from processChunk.
   * @param array $operations
   *   Operations that did not complete (only set if $success is FALSE).
   */
  public static function finishedCallback(bool $success, array $results, array $operations): void {
    $linked = count($results['linked'] ?? []);
    $skipped = count($results['skipped'] ?? []);
    $failed = count($results['failed'] ?? []);
    \Drupal::messenger()->addStatus("Backfill complete. Linked: $linked. Skipped: $skipped. Failed: $failed.");
  }

}
