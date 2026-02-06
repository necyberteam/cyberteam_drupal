<?php

namespace Drupal\campuschampions\Plugin\Action;

use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\user\UserInterface;
use Drupal\views_bulk_operations\Action\ViewsBulkOperationsActionBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Bulk action to set the "Is Campus Champion" flag on users.
 *
 * @Action(
 *   id = "campuschampions_is_cc_action",
 *   label = @Translation("Set Is Campus Champion"),
 *   type = "user"
 * )
 */
class IsCCAction extends ViewsBulkOperationsActionBase implements ContainerFactoryPluginInterface {

  /**
   * The logger factory.
   *
   * @var \Drupal\Core\Logger\LoggerChannelFactoryInterface
   */
  protected $loggerFactory;

  /**
   * Constructs an IsCCAction object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $logger_factory
   *   The logger factory.
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    LoggerChannelFactoryInterface $logger_factory
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->loggerFactory = $logger_factory;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new self(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('logger.factory')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function execute($user = NULL) {
    if (!$user instanceof UserInterface) {
      $this->loggerFactory->get('campuschampions')->error('IsCCAction received non-user entity.');
      return $this->t('Error: Invalid entity type.');
    }

    // Campus Champions Program ID.
    $cc_id = 572;

    $user->set('field_is_cc', 1);

    $region = $user->get('field_region')->referencedEntities();
    if (count($region) == 0) {
      $user->set('field_region', $cc_id);
    }
    else {
      // Add Campus Champions program if it's not already set.
      // $region is an array of entity objects from referencedEntities().
      $has_cc_program = array_filter(
        $region,
        function ($program) use ($cc_id) {
          return $program->id() == $cc_id;
        }
      );

      if (empty($has_cc_program)) {
        $user->get('field_region')->appendItem([
          'target_id' => $cc_id,
        ]);
      }
    }

    try {
      $user->save();
    }
    catch (\Exception $e) {
      $this->loggerFactory->get('campuschampions')->error('Failed to save user @uid: @message', [
        '@uid' => $user->id(),
        '@message' => $e->getMessage(),
      ]);
      return $this->t('Error saving user.');
    }

    return $this->t('You are a Campus Champion!');
  }

  /**
   * {@inheritdoc}
   */
  public function access($object, ?AccountInterface $account = NULL, $return_as_object = FALSE) {
    return $object->access('update', $account, $return_as_object);
  }

}
