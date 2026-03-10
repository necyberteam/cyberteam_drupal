<?php

namespace Drupal\ood_contributions\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\File\FileUrlGeneratorInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Render\Markup;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a 'Community Spotlight' Block.
 *
 * @Block(
 *   id = "community_spotlight_block",
 *   admin_label = @Translation("Community Spotlight"),
 *   category = @Translation("Custom"),
 * )
 */
class CommunitySpotlightBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The file URL generator.
   *
   * @var \Drupal\Core\File\FileUrlGeneratorInterface
   */
  protected $fileUrlGenerator;

  /**
   * Constructs a new CommunitySpotlightBlock object.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity_type_manager, FileUrlGeneratorInterface $file_url_generator) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entityTypeManager = $entity_type_manager;
    $this->fileUrlGenerator = $file_url_generator;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new self(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('entity_type.manager'),
      $container->get('file_url_generator')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $spotlight_user = $this->getPromotedUser();

    if (!$spotlight_user) {
      return [];
    }

    $others = $this->getOtherSpotlightUsers($spotlight_user['uid']);

    return [
      '#theme' => 'community_spotlight_block',
      '#spotlight' => $spotlight_user,
      '#others' => $others,
      '#attached' => [
        'library' => [
          'ood_contributions/community_spotlight',
        ],
      ],
      '#cache' => [
        'tags' => ['user_list'],
        'max-age' => 3600,
      ],
    ];
  }

  /**
   * Get the user promoted for community spotlight.
   *
   * @return array|null
   *   Array of spotlight user data, or NULL if none found.
   */
  protected function getPromotedUser() {
    $query = $this->entityTypeManager->getStorage('user')->getQuery();
    $query->condition('status', 1);
    $query->condition('field_ood_spotlight_promoted', 1);
    $query->condition('field_ood_community_spotlight', '', '<>');
    $query->range(0, 1);
    $query->accessCheck(TRUE);
    $uids = $query->execute();

    if (empty($uids)) {
      return NULL;
    }

    $uid = reset($uids);
    return $this->buildUserData($uid);
  }

  /**
   * Get non-promoted users who have spotlight text.
   *
   * @param int $promoted_uid
   *   The UID of the promoted user to exclude.
   *
   * @return array
   *   Array of user data arrays.
   */
  protected function getOtherSpotlightUsers($promoted_uid) {
    $query = $this->entityTypeManager->getStorage('user')->getQuery();
    $query->condition('status', 1);
    $query->condition('field_ood_community_spotlight', '', '<>');
    $query->condition('uid', $promoted_uid, '!=');
    $query->accessCheck(TRUE);
    $uids = $query->execute();

    $others = [];
    foreach ($uids as $uid) {
      $data = $this->buildUserData($uid);
      if ($data) {
        $others[] = $data;
      }
    }

    return $others;
  }

  /**
   * Build the data array for a single user.
   *
   * @param int $uid
   *   The user ID.
   *
   * @return array|null
   *   Array of user data, or NULL if user could not be loaded.
   */
  protected function buildUserData($uid) {
    $user = $this->entityTypeManager->getStorage('user')->load($uid);

    if (!$user) {
      return NULL;
    }

    $photo_url = NULL;
    if ($user->hasField('user_picture') && !$user->get('user_picture')->isEmpty()) {
      $file = $user->get('user_picture')->entity;
      if ($file) {
        $photo_url = $this->fileUrlGenerator->generateAbsoluteString($file->getFileUri());
      }
    }

    if (!$photo_url) {
      $photo_url = '/modules/custom/access/modules/cssn/images/profile.gif';
    }

    $first_name = '';
    if ($user->hasField('field_user_first_name') && !$user->get('field_user_first_name')->isEmpty()) {
      $first_name = $user->get('field_user_first_name')->value;
    }

    $last_name = '';
    if ($user->hasField('field_user_last_name') && !$user->get('field_user_last_name')->isEmpty()) {
      $last_name = $user->get('field_user_last_name')->value;
    }

    $organization = '';
    if ($user->hasField('field_access_organization') && !$user->get('field_access_organization')->isEmpty()) {
      $field = $user->get('field_access_organization');
      $entity = $field->entity;
      if ($entity) {
        $organization = $entity->label();
      }
      else {
        $organization = $field->value;
      }
    }

    $spotlight_text = '';
    if ($user->hasField('field_ood_community_spotlight') && !$user->get('field_ood_community_spotlight')->isEmpty()) {
      $field = $user->get('field_ood_community_spotlight');
      $spotlight_text = Markup::create(check_markup($field->value, $field->format ?? 'restricted_html'));
    }

    return [
      'uid' => $user->id(),
      'photo_url' => $photo_url,
      'first_name' => $first_name,
      'last_name' => $last_name,
      'organization' => $organization,
      'spotlight_text' => $spotlight_text,
    ];
  }

}
