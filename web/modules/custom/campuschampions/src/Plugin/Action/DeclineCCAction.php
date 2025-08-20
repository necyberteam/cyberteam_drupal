<?php

namespace Drupal\campuschampions\Plugin\Action;

use Drupal\Core\Session\AccountInterface;
use Drupal\views_bulk_operations\Action\ViewsBulkOperationsActionBase;
use Drupal\webform\WebformSubmissionForm;
use Drupal\webform\Entity\WebformSubmission;

/**
 * @Action(
 *   id = "campuschampions_approve_cc_decline",
 *   label = @Translation("Decline Campus Champion"),
 *   type = ""
 * )
 */
class DeclineCCAction extends ViewsBulkOperationsActionBase
{
    /**
     * Set the status of a Campus Champion application to 'declined'
     * 
     * {@inheritdoc}
     */
    public function execute(?WebformSubmission $entity = null)
    {
        $sid = $entity->id();
        $webform_submission = WebformSubmission::load($sid);
        $webform_submission->setElementData('status', 'declined');
        WebformSubmissionForm::submitWebformSubmission($webform_submission);
        return $this->t('Campus Champion application(s) declined');
    }

    /**
     * {@inheritdoc}
     */
    public function access($object, ?AccountInterface $account = null, $return_as_object = false)
    {
        // @see Drupal\Core\Field\FieldUpdateActionBase::access().
        return $object->access('update', $account, $return_as_object);
    }
}
