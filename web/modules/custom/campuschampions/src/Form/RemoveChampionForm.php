<?php

namespace Drupal\campuschampions\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\TypedData\TypedDataInterface;
use Drupal\user\Entity\User;

/**
 * Form to enable people with CampusChampionsAdmin role to remove a champion.
 */
class RemoveChampionForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'remove_champion_form';
  }

  /**
   *
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['champion'] = [
      '#type' => 'entity_autocomplete',
      '#target_type' => 'user',
      '#title' => $this->t('Select a person to remove from the Campus Champions program'),
      '#tags' => TRUE,
      '#required' => TRUE,
      '#weight' => '0',
    ];
    $form['actions']['#type'] = 'actions';
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Remove'),
      '#button_type' => 'primary',
    ];
    return $form;
  }

  /**
   * Check that the user is a Campus Champion.
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    // If user is not a Campus Champion, then show error message.
    $champion = $form_state->getValue('champion');
    if ($champion == NULL) {
      $form_state->setErrorByName('champion', $this->t('Please select a Campus Champion to remove.'));
      return;
    }
    $champion = reset($form_state->getValue('champion'));
    $user = User::load($champion['target_id']);
    if (!$user->field_is_cc->value) {
      $form_state->setErrorByName('champion', $this->t($user->getAccountName() . ' is not a Campus Champion.'));
    }

  }

  /**
   * Unset the field_is_cc value and remove the Campus Champions program.
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $champion = reset($form_state->getValue('champion'));
    $user = User::load($champion['target_id']);
    $user->set('field_is_cc', 0);

    $regions = $user->get('field_region');
    $regions->filter(function (TypedDataInterface $item) {
      // Campus Champions Program ID.
      $cc_id = '572';
      if ($item->getValue()['target_id'] == $cc_id) {
        return FALSE;
      }
      return TRUE;
    });
    $user->field_region = $regions;
    $user->save();

    \Drupal::messenger()->addMessage(t('Removed ' . $user->getAccountName() . '  from Campus Champions.'));

  }
}
