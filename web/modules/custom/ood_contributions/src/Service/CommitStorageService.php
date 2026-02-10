<?php

namespace Drupal\ood_contributions\Service;

use Drupal\Core\Database\Connection;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;

/**
 * Service for storing GitHub commits in the database.
 */
class CommitStorageService {

  /**
   * The database connection.
   *
   * @var \Drupal\Core\Database\Connection
   */
  protected $database;

  /**
   * The logger channel.
   *
   * @var \Drupal\Core\Logger\LoggerChannelInterface
   */
  protected $logger;

  /**
   * Constructs a CommitStorageService object.
   *
   * @param \Drupal\Core\Database\Connection $database
   *   The database connection.
   * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $logger_factory
   *   The logger factory.
   */
  public function __construct(Connection $database, LoggerChannelFactoryInterface $logger_factory) {
    $this->database = $database;
    $this->logger = $logger_factory->get('ood_contributions');
  }

  /**
   * Stores commits data for a user and repository.
   *
   * @param int $uid
   *   The Drupal user ID.
   * @param string $repo
   *   Repository in owner/name format (e.g., OSC/ondemand).
   * @param array $commits_data
   *   The commits data array from GitHubCommitsService.
   *
   * @return array
   *   An array with 'added', 'skipped', and 'errors' counts.
   */
  public function storeCommits(int $uid, string $repo, array $commits_data): array {
    $result = [
      'added' => 0,
      'skipped' => 0,
      'errors' => 0,
    ];

    // Validate input.
    if (empty($commits_data['commits']) || !is_array($commits_data['commits'])) {
      $this->logger->warning('No commits data provided for storage.');
      return $result;
    }

    foreach ($commits_data['commits'] as $commit) {
      try {
        if ($this->storeCommit($uid, $repo, $commit)) {
          $result['added']++;
        }
        else {
          $result['skipped']++;
        }
      }
      catch (\Exception $e) {
        $result['errors']++;
        $this->logger->error('Failed to store commit @sha: @message', [
          '@sha' => $commit['sha'] ?? 'unknown',
          '@message' => $e->getMessage(),
        ]);
      }
    }

    $this->logger->info('Stored commits for uid @uid, repo @repo: @added added, @skipped skipped, @errors errors', [
      '@uid' => $uid,
      '@repo' => $repo,
      '@added' => $result['added'],
      '@skipped' => $result['skipped'],
      '@errors' => $result['errors'],
    ]);

    return $result;
  }

  /**
   * Stores a single commit in the database.
   *
   * @param int $uid
   *   The Drupal user ID.
   * @param string $repo
   *   Repository in owner/name format.
   * @param array $commit
   *   The commit data array.
   *
   * @return bool
   *   TRUE if added, FALSE if skipped (already exists).
   *
   * @throws \Exception
   */
  protected function storeCommit(int $uid, string $repo, array $commit): bool {
    $sha = $commit['sha'] ?? '';
    if (empty($sha)) {
      throw new \Exception('Commit SHA is required.');
    }

    // Check if the commit already exists.
    if ($this->commitExists($uid, $repo, $sha)) {
      return FALSE;
    }

    // Parse the date string to timestamp.
    $commit_date = !empty($commit['date']) ? strtotime($commit['date']) : 0;
    $merged_at = !empty($commit['merged_at']) ? strtotime($commit['merged_at']) : NULL;

    // Insert the commit.
    $this->database->insert('ood_user_commits')
      ->fields([
        'uid' => $uid,
        'repo' => $repo,
        'sha' => $sha,
        'commit_date' => $commit_date,
        'merged_at' => $merged_at,
      ])
      ->execute();

    return TRUE;
  }

  /**
   * Checks if a commit already exists in the database.
   *
   * @param int $uid
   *   The Drupal user ID.
   * @param string $repo
   *   Repository in owner/name format.
   * @param string $sha
   *   The commit SHA.
   *
   * @return bool
   *   TRUE if exists, FALSE otherwise.
   */
  protected function commitExists(int $uid, string $repo, string $sha): bool {
    $query = $this->database->select('ood_user_commits', 'ouc')
      ->condition('uid', $uid)
      ->condition('repo', $repo)
      ->condition('sha', $sha)
      ->countQuery();

    return (bool) $query->execute()->fetchField();
  }

  /**
   * Gets commits for a user and repository.
   *
   * @param int $uid
   *   The Drupal user ID.
   * @param string|null $repo
   *   Optional repository filter.
   *
   * @return array
   *   Array of commit records.
   */
  public function getCommits(int $uid, ?string $repo = NULL): array {
    $query = $this->database->select('ood_user_commits', 'ouc')
      ->fields('ouc')
      ->condition('uid', $uid);

    if ($repo !== NULL) {
      $query->condition('repo', $repo);
    }

    $query->orderBy('commit_date', 'DESC');

    return $query->execute()->fetchAll(\PDO::FETCH_ASSOC);
  }

  /**
   * Gets commit count for a user and repository.
   *
   * @param int $uid
   *   The Drupal user ID.
   * @param string|null $repo
   *   Optional repository filter.
   *
   * @return int
   *   The number of commits.
   */
  public function getCommitCount(int $uid, ?string $repo = NULL): int {
    $query = $this->database->select('ood_user_commits', 'ouc')
      ->condition('uid', $uid);

    if ($repo !== NULL) {
      $query->condition('repo', $repo);
    }

    return (int) $query->countQuery()->execute()->fetchField();
  }

  /**
   * Deletes commits for a user and repository.
   *
   * @param int $uid
   *   The Drupal user ID.
   * @param string|null $repo
   *   Optional repository filter. If NULL, deletes all commits for the user.
   *
   * @return int
   *   The number of commits deleted.
   */
  public function deleteCommits(int $uid, ?string $repo = NULL): int {
    $query = $this->database->delete('ood_user_commits')
      ->condition('uid', $uid);

    if ($repo !== NULL) {
      $query->condition('repo', $repo);
    }

    return $query->execute();
  }

}
