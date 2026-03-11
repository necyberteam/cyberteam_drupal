<?php

namespace Drupal\ood_software\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Database\Connection;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\File\FileUrlGeneratorInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a 'Discourse Participants' Block.
 *
 * @Block(
 *   id = "discourse_participants_block",
 *   admin_label = @Translation("Discourse Participants"),
 *   category = @Translation("Custom"),
 * )
 */
class DiscourseParticipantsBlock extends BlockBase implements ContainerFactoryPluginInterface {

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
   * The file URL generator.
   *
   * @var \Drupal\Core\File\FileUrlGeneratorInterface
   */
  protected $fileUrlGenerator;

  /**
   * Constructs a new DiscourseParticipantsBlock object.
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
   * @param \Drupal\Core\File\FileUrlGeneratorInterface $file_url_generator
   *   The file URL generator.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, Connection $database, EntityTypeManagerInterface $entity_type_manager, FileUrlGeneratorInterface $file_url_generator) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->database = $database;
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
      $container->get('database'),
      $container->get('entity_type.manager'),
      $container->get('file_url_generator')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $participants = $this->getParticipants();

    return [
      '#theme' => 'discourse_participants_block',
      '#items' => $participants,
      '#cache' => [
        'max-age' => 3600,
      ],
    ];
  }

  /**
   * Get list of participants from the ood_disc_contrib table.
   *
   * @return array
   *   Array of participant data.
   */
  protected function getParticipants() {
    $participants = [];

    $query = $this->database->select('ood_disc_contrib', 'odc');
    $query->fields('odc', ['uid']);
    $query->condition('odc.uid', 0, '>');
    $results = $query->execute()->fetchCol();

    if (empty($results)) {
      return $participants;
    }

    $users = $this->entityTypeManager->getStorage('user')->loadMultiple($results);

    foreach ($users as $user) {
      if ($user->isAnonymous()) {
        continue;
      }

      $photo_url = NULL;
      if ($user->hasField('user_picture') && !$user->get('user_picture')->isEmpty()) {
        $file = $user->get('user_picture')->entity;
        if ($file) {
          $photo_url = $this->fileUrlGenerator->generateAbsoluteString($file->getFileUri());
        }
      }

      $participants[] = [
        'uid' => $user->id(),
        'name' => $user->getDisplayName(),
        'photo_url' => $photo_url,
      ];
    }

    return $participants;
  }

}
