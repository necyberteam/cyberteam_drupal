<?php

namespace Drupal\ood_software\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a 'Committee Members' Block.
 *
 * @Block(
 *   id = "committee_members_block",
 *   admin_label = @Translation("Committee Members"),
 *   category = @Translation("Custom"),
 * )
 */
class CommitteeMembersBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Constructs a new CommitteeMembersBlock object.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity_type_manager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
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
      $container->get('entity_type.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $members = $this->getCommitteeMembers();

    return [
      '#theme' => 'committee_members_block',
      '#members' => $members,
      '#cache' => [
        'max-age' => 3600,
      ],
    ];
  }

  /**
   * Get users who have the 'committee' badge in field_open_ondemand_badges.
   *
   * @return array
   *   Array of member data.
   */
  protected function getCommitteeMembers() {
    // Find the 'committee' taxonomy term.
    $terms = $this->entityTypeManager->getStorage('taxonomy_term')
      ->loadByProperties([
        'name' => 'committee',
        'vid' => 'open_ondemand_badges',
      ]);
    $term = reset($terms);

    if (!$term) {
      return [];
    }

    $tid = $term->id();

    // Find active users who reference this term.
    $uids = $this->entityTypeManager->getStorage('user')->getQuery()
      ->condition('status', 1)
      ->condition('field_open_ondemand_badges', $tid)
      ->accessCheck(FALSE)
      ->execute();

    if (empty($uids)) {
      return [];
    }

    $users = $this->entityTypeManager->getStorage('user')->loadMultiple($uids);
    $members = [];

    foreach ($users as $user) {
      $photo_url = NULL;

      if ($user->hasField('user_picture') && !$user->get('user_picture')->isEmpty()) {
        $file = $user->get('user_picture')->entity;
        if ($file) {
          $photo_url = \Drupal::service('file_url_generator')->generateAbsoluteString($file->getFileUri());
        }
      }

      $members[] = [
        'uid' => $user->id(),
        'name' => $user->getDisplayName(),
        'photo_url' => $photo_url,
      ];
    }

    return $members;
  }

}
