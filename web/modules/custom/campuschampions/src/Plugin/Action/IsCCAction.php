<?php

namespace Drupal\campuschampions\Plugin\Action;

use Drupal\views_bulk_operations\Action\ViewsBulkOperationsActionBase;
use Drupal\Core\Session\AccountInterface;

/**
 * Action description.
 *
 * @Action(
 *   id = "campuschampions_is_cc_action",
 *   label = @Translation("Set Is Campus Champion"),
 *   type = "user"
 * )
 */
class IsCCAction extends ViewsBulkOperationsActionBase {

  /**
   * {@inheritdoc}
   */
  public function execute($entity = NULL) {

    $entity->set('field_is_cc', 1);
    $entity->save();

    return $this->t('You are a campus champion!');
  }

  /**
   * {@inheritdoc}
   */
  public function access($object, AccountInterface $account = NULL, $return_as_object = FALSE) {
    return TRUE;
  }

}
