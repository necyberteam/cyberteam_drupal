<?php

namespace Drupal\ood_software\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Database\Connection;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a 'The Appverse Contributors & Moderators' Block.
 *
 * @Block(
 *   id = "appverse_contributors_block",
 *   admin_label = @Translation("The Appverse Contributors & Moderators"),
 *   category = @Translation("Custom"),
 * )
 */
class AppverseContributorsBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * The database connection.
   *
   * @var \Drupal\Core\Database\Connection
   */
  protected $database;

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Constructs a new AppverseContributorsBlock object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Database\Connection $database
   *   The database connection.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, Connection $database, EntityTypeManagerInterface $entity_type_manager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->database = $database;
    $this->entityTypeManager = $entity_type_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('database'),
      $container->get('entity_type.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $contributors = $this->getContributors();

    return [
      '#theme' => 'appverse_contributors_block',
      '#contributors' => $contributors,
      '#cache' => [
        'max-age' => 3600,
      ],
    ];
  }

  /**
   * Get list of contributors from the database.
   *
   * @return array
   *   Array of contributor data.
   */
  protected function getContributors() {
    $contributors = [];
    $seen_uids = [];

    // First, get users with appverse_pm role.
    $pm_users = $this->getUsersByRole('appverse_pm');
    foreach ($pm_users as $user) {
      $contributor_data = $this->getUserData($user);
      if ($contributor_data) {
        $contributors[] = $contributor_data;
        $seen_uids[$user->id()] = TRUE;
      }
    }

    // Then, get authors of appverse_app nodes, sorted by count.
    $author_data = $this->getAppverseAuthors($seen_uids);
    foreach ($author_data as $author_info) {
      $user = $this->entityTypeManager->getStorage('user')->load($author_info['uid']);
      if ($user) {
        $contributor_data = $this->getUserData($user);
        if ($contributor_data) {
          $contributors[] = $contributor_data;
        }
      }
    }

    return $contributors;
  }

  /**
   * Get users by role.
   *
   * @param string $role_id
   *   The role ID.
   *
   * @return \Drupal\user\UserInterface[]
   *   Array of user entities.
   */
  protected function getUsersByRole($role_id) {
    $query = $this->entityTypeManager->getStorage('user')->getQuery()
      ->condition('status', 1)
      ->condition('roles', $role_id)
      ->accessCheck(FALSE);
    $uids = $query->execute();

    if (empty($uids)) {
      return [];
    }

    return $this->entityTypeManager->getStorage('user')->loadMultiple($uids);
  }

  /**
   * Get authors of appverse_app nodes sorted by count.
   *
   * @param array $exclude_uids
   *   Array of UIDs to exclude (already listed).
   *
   * @return array
   *   Array of author data with uid and count.
   */
  protected function getAppverseAuthors(array $exclude_uids = []) {
    $query = $this->database->select('node_field_data', 'n');
    $query->fields('n', ['uid']);
    $query->addExpression('COUNT(n.nid)', 'node_count');
    $query->condition('n.type', 'appverse_app');
    $query->condition('n.status', 1);
    $query->condition('n.uid', 0, '>');
    
    if (!empty($exclude_uids)) {
      $query->condition('n.uid', array_keys($exclude_uids), 'NOT IN');
    }
    
    $query->groupBy('n.uid');
    $query->orderBy('node_count', 'DESC');
    
    $results = $query->execute()->fetchAll();

    $authors = [];
    foreach ($results as $result) {
      $authors[] = [
        'uid' => $result->uid,
        'count' => $result->node_count,
      ];
    }

    return $authors;
  }

  /**
   * Get user data including photo URL.
   *
   * @param \Drupal\user\UserInterface $user
   *   The user entity.
   *
   * @return array|null
   *   Array of user data or NULL if user is anonymous.
   */
  protected function getUserData($user) {
    if (!$user || $user->isAnonymous()) {
      return NULL;
    }

    $photo_url = NULL;
    
    if ($user->hasField('user_picture') && !$user->get('user_picture')->isEmpty()) {
      $file = $user->get('user_picture')->entity;
      if ($file) {
        $photo_url = \Drupal::service('file_url_generator')->generateAbsoluteString($file->getFileUri());
      }
    }

    return [
      'uid' => $user->id(),
      'name' => $user->getDisplayName(),
      'photo_url' => $photo_url,
    ];
  }

}
