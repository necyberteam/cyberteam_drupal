<?php

namespace Drupal\ood_software\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\File\FileUrlGeneratorInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a 'Tips & Tricks Calls' Block.
 *
 * @Block(
 *   id = "tips_tricks_calls_block",
 *   admin_label = @Translation("Tips & Tricks Calls"),
 *   category = @Translation("Custom"),
 * )
 */
class TipsTricksCallsBlock extends BlockBase implements ContainerFactoryPluginInterface {

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
   * Constructs a new TipsTricksCallsBlock object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   * @param \Drupal\Core\File\FileUrlGeneratorInterface $file_url_generator
   *   The file URL generator.
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
    $members = $this->getTipsTricksMembers();

    return [
      '#theme' => 'tips_tricks_calls_block',
      '#items' => $members,
      '#cache' => [
        'max-age' => 3600,
      ],
    ];
  }

  /**
   * Get users with the 'Tips & tricks' badge in field_open_ondemand_badges.
   *
   * @return array
   *   Array of member data with uid, name, and photo_url.
   */
  protected function getTipsTricksMembers() {
    $members = [];

    // Find the 'Tips & tricks' taxonomy term ID.
    $terms = $this->entityTypeManager->getStorage('taxonomy_term')->loadByProperties([
      'name' => 'Tips & Tricks',
      'vid' => 'open_ondemand_badges',
    ]);

    if (empty($terms)) {
      return $members;
    }

    $term = reset($terms);
    $tid = $term->id();

    // Query active users who have this term in field_open_ondemand_badges.
    $uids = $this->entityTypeManager->getStorage('user')->getQuery()
      ->condition('status', 1)
      ->condition('field_open_ondemand_badges', $tid)
      ->accessCheck(FALSE)
      ->execute();

    if (empty($uids)) {
      return $members;
    }

    $users = $this->entityTypeManager->getStorage('user')->loadMultiple($uids);

    foreach ($users as $user) {
      $user_data = $this->getUserData($user);
      if ($user_data) {
        $members[] = $user_data;
      }
    }

    return $members;
  }

  /**
   * Get user data including photo URL.
   *
   * @param \Drupal\user\UserInterface|null $user
   *   The user entity.
   *
   * @return array|null
   *   Array of user data or NULL if user is anonymous/invalid.
   */
  protected function getUserData($user) {
    if (!$user || $user->isAnonymous()) {
      return NULL;
    }

    $photo_url = NULL;

    if ($user->hasField('user_picture') && !$user->get('user_picture')->isEmpty()) {
      $file = $user->get('user_picture')->entity;
      if ($file) {
        $photo_url = $this->fileUrlGenerator->generateAbsoluteString($file->getFileUri());
      }
    }

    return [
      'uid' => $user->id(),
      'name' => $user->getDisplayName(),
      'photo_url' => $photo_url,
    ];
  }

}
