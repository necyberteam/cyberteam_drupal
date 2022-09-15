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

    $cc_id = 572; // Campus Champions Program ID

    $entity->set('field_is_cc', 1);

    $region[] = $entity->get('field_region');
    if (count($region) == 0) {
        $entity->set('field_region', $cc_id);
    } else {
	// Add Campus Champions program if it's not already set
        //if (!array_filter($programs, function($program) { return $program['target_id'] == $cc_id; }) ) {
            $entity->get('field_region')->appendItem([
                'target_id' => $cc_id,
            ]);
	//}
    }

    $entity->save();

    return $this->t('You are a Campus Champion!');
  }

  /**
   * {@inheritdoc}
   */
  public function access($object, AccountInterface $account = NULL, $return_as_object = FALSE) {
    return $object->access('update', $account, $return_as_object);
  }

}
