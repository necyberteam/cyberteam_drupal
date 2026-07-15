<?php

/**
 * @file
 * Post-update functions for the ood_software module.
 *
 * Post-update hooks run in `drush deploy` AFTER `drush cim`, so any config
 * (content types, fields, workflows) imported from sites/default/config is
 * already in place. The inferred-repo backfill lives here for that reason:
 * it creates appverse_repo nodes and writes the field_repo_* family, most of
 * which are defined only in config/default and therefore do not exist until
 * cim has run.
 */

/**
 * Backfill inferred repos for legacy Apps with NULL field_appverse_repo.
 *
 * Creates one appverse_repo per legacy appverse_app that has no
 * field_appverse_repo yet, links the App to it, and lets RepoSyncService
 * populate the repo's metadata. Chunked via the $sandbox to bound memory.
 *
 * Moved here from ood_software_update_10503(): running during updb was too
 * early because the field_repo_* fields the backfill writes are created by
 * cim, which runs after updb. Running post-cim makes every field available.
 */
function ood_software_post_update_backfill_inferred_repos(&$sandbox) {
  $entityTypeManager = \Drupal::entityTypeManager();

  if (!isset($sandbox['progress'])) {
    $sandbox['progress'] = 0;
    $sandbox['ids'] = array_values($entityTypeManager->getStorage('node')->getQuery()
      ->accessCheck(FALSE)
      ->condition('type', 'appverse_app')
      ->notExists('field_appverse_repo')
      ->execute());
    $sandbox['total'] = count($sandbox['ids']);
  }

  if ($sandbox['total'] === 0) {
    $sandbox['#finished'] = 1;
    return t('No Apps needed backfill.');
  }

  $chunk = array_slice($sandbox['ids'], $sandbox['progress'], 25);
  $context = ['results' => []];
  \Drupal\ood_software\Commands\AppverseBackfillCommands::processChunk($chunk, $context);

  $sandbox['progress'] += count($chunk);
  $sandbox['#finished'] = $sandbox['progress'] / max(1, $sandbox['total']);

  return t('Backfilled @progress of @total Apps.', [
    '@progress' => $sandbox['progress'],
    '@total' => $sandbox['total'],
  ]);
}
