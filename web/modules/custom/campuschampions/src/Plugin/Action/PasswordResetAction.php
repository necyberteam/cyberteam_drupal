<?php

namespace Drupal\campuschampions\Plugin\Action;

use Drupal\views_bulk_operations\Action\ViewsBulkOperationsActionBase;
use Drupal\Core\Session\AccountInterface;

/**
 * Action description.
 *
 * @Action(
 *   id = "campuschampions_password_reset_action",
 *   label = @Translation("Reset password"),
 *   type = "user"
 * )
 */
class PasswordResetAction extends ViewsBulkOperationsActionBase {

  /**
   * {@inheritdoc}
   */
  public function execute($entity = NULL) {
    global $language;

    $uid = $entity->get('uid')->getValue()['0']['value'];
    if ($uid != "1") {
        _user_mail_notify('password_reset', $entity, $language);
        return $this->t('Password reset successfully');
    }
    return $this->t('Cannot reset Admin user password');
  }

  /**
   * {@inheritdoc}
   */
  public function access($object, ?AccountInterface $account = NULL, $return_as_object = FALSE) {
    return TRUE;
  }

}
