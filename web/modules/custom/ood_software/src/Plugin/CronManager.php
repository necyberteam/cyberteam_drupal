<?php

namespace Drupal\ood_software\Plugin;

/**
 * Manages cron job callbacks for the the software module.
 */
class CronManager {

  /**
   * Sync markdown documentation from GitHub to Drupal nodes.
   */
  public static function syncDocs() {
    $env = getenv('PANTHEON_ENVIRONMENT');
    if ($env == 'live') {
      $doc_sync = \Drupal::service('ood_software.doc_sync');
      $doc_sync->syncAll();
    }
    else {
      \Drupal::logger('ood_software')->notice('Skipping doc sync on non-live environment.');
    }
  }

  /**
   * Update app info from github.
   */
  public static function appUpdates() {
    $env = getenv('PANTHEON_ENVIRONMENT');

    if ( $env == 'live') {
      // Get the queue.
      $queue = \Drupal::queue('appverse_app_updater');

      // Load all app nodes.
      $nids = \Drupal::entityQuery('node')
        ->condition('type', 'appverse_app')
        ->accessCheck(FALSE)
        ->execute();

      // Add each node to the queue for processing.
      foreach ($nids as $nid) {
        $item = ['nid' => $nid];
        $queue->createItem($item);
      }
      \Drupal::logger('ood_software')->notice('Added @count app updates to the queue.', ['@count' => count($nids)]);
    } else {
      \Drupal::logger('ood_software')->notice('Skipping app updates on non-live environment.');
    }
  }

}

