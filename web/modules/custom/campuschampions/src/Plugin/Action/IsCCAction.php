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
class IsCCAction extends ViewsBulkOperationsActionBase
{

    /**
     * {@inheritdoc}
     */
    public function execute($user = null)
    {

        $cc_id = 572; // Campus Champions Program ID

        $user->set('field_is_cc', 1);

        $region = $user->get('field_region')->referencedEntities();
        if (count($region) == 0) {
            $user->set('field_region', $cc_id);
        } else {
            // Add Campus Champions program if it's not already set
            if (!array_filter(
                $region,
                function ($program) use ($cc_id) {
                    if (count($program) > 0) {
                        return $program[0]->id() == $cc_id;
                    }
                    return false;
                }
            )
            ) {
                $user->get('field_region')->appendItem(
                    [
                    'target_id' => $cc_id,
                    ]
                );
            }
        }

        $user->save();

        return $this->t('You are a Campus Champion!');
    }

    /**
     * {@inheritdoc}
     */
    public function access($object, ?AccountInterface $account = null, $return_as_object = false)
    {
        return $object->access('update', $account, $return_as_object);
    }

}
