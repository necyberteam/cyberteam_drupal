<?php

namespace Drupal\campuschampions\Plugin\Action;

use Drupal\Core\Language\LanguageManagerInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\user\UserInterface;
use Drupal\views_bulk_operations\Action\ViewsBulkOperationsActionBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Bulk action to send password reset emails to users.
 *
 * @Action(
 *   id = "campuschampions_password_reset_action",
 *   label = @Translation("Reset password"),
 *   type = "user"
 * )
 */
class PasswordResetAction extends ViewsBulkOperationsActionBase implements ContainerFactoryPluginInterface {

  /**
   * The logger factory.
   *
   * @var \Drupal\Core\Logger\LoggerChannelFactoryInterface
   */
  protected $loggerFactory;

  /**
   * The language manager.
   *
   * @var \Drupal\Core\Language\LanguageManagerInterface
   */
  protected $languageManager;

  /**
   * Constructs a PasswordResetAction object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $logger_factory
   *   The logger factory.
   * @param \Drupal\Core\Language\LanguageManagerInterface $language_manager
   *   The language manager.
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    LoggerChannelFactoryInterface $logger_factory,
    LanguageManagerInterface $language_manager
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->loggerFactory = $logger_factory;
    $this->languageManager = $language_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new self(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('logger.factory'),
      $container->get('language_manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function execute($entity = NULL) {
    if (!$entity instanceof UserInterface) {
      $this->loggerFactory->get('campuschampions')->error('Password reset action received non-user entity.');
      return $this->t('Error: Invalid entity type.');
    }

    $uid = $entity->id();

    // Protect admin user from bulk password resets.
    if ($uid == 1) {
      return $this->t('Cannot reset Admin user password');
    }

    // Get current language from language manager service.
    $langcode = $this->languageManager->getCurrentLanguage()->getId();

    // Send password reset notification.
    $result = _user_mail_notify('password_reset', $entity, $langcode);
    if ($result) {
      return $this->t('Password reset email sent successfully');
    }

    $this->loggerFactory->get('campuschampions')->error('Failed to send password reset email to user @uid.', ['@uid' => $uid]);
    return $this->t('Failed to send password reset email');
  }

  /**
   * {@inheritdoc}
   */
  public function access($object, ?AccountInterface $account = NULL, $return_as_object = FALSE) {
    // Check if the current user has permission to administer users.
    if ($account && $account->hasPermission('administer users')) {
      return TRUE;
    }
    return FALSE;
  }

}
