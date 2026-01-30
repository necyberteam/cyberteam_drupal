<?php

namespace Drupal\ood_contributions\Plugin;

/**
 * Manages cron job callbacks for the the contributions module.
 */
class CronManager {

  /**
   * Store github stats.
   */
  public static function storeStats() {
    // Lookup users to store stats.
    $entity_query = \Drupal::entityQuery('user')
      ->condition('status', 1)
      ->condition('roles', 'ondemand')
      ->accessCheck(FALSE)
      ->exists('field_github_username');
    $uids = $entity_query->execute();

    foreach ($uids as $uid) {
      $repos = [
        'ondemand',
        'ood_core',
        'ondemand-packaging',
        'ood-ansible',
        'puppet-module-openondemand',
        'ood-documentation'
      ];

      $user = \Drupal\user\Entity\User::load($uid);
      $github_username = $user->get('field_github_username')->value;

      $commit_storage = \Drupal::service('ood_contributions.commit_storage');

      foreach ($repos as $repo) {
        // Fetch and store commits for each user.
        $gh_commits = \Drupal::service('ood_contributions.github_commits');
        $commits = $gh_commits->getCommits('OSC', $repo, $github_username);
        if (isset($commits['error'])) {
          continue;
        }
        $commit_storage->storeCommits($uid, "OSC/$repo", $commits);
      }
      $commits = $commit_storage->getCommits($uid);
      if ($commits) {
        $graph_service = \Drupal::service('ood_contributions.contribution_graph');
        // Generate graph for a user (last 52 weeks)
        $html = $graph_service->generateGraph($uid);
        // Save $html to 'field_github_graph' field.
        $user->set('field_github_graph', [
          'value' => $html,
          'format' => 'full_no_editor',
        ]);
        $user->save();

        foreach ($repos as $repo) {
          // Get repo stats.
          $stats_service = \Drupal::service('ood_contributions.user_stats');
          $stats_service->updateUserStats($uid, "OSC/$repo", $github_username );
        }
      }
    }
  }

  /**
   * Store Discourse contributions.
   */
  public static function discourseStoreContrib() {
    // Lookup users to store stats.
    $entity_query = \Drupal::entityQuery('user')
      ->condition('status', 1)
      ->accessCheck(FALSE)
      ->exists('field_discourse_openondemand_org');
    $uids = $entity_query->execute();

    foreach ($uids as $uid) {
      $service = \Drupal::service('ood_contributions.discourse_contribution');
      $result = $service->updateUserContributions($uid);
    }
  }

}

