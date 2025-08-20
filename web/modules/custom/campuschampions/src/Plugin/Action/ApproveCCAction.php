<?php

namespace Drupal\campuschampions\Plugin\Action;

use Drupal\Core\Session\AccountInterface;
use Drupal\views_bulk_operations\Action\ViewsBulkOperationsActionBase;
use Drupal\webform\WebformSubmissionForm;
use Drupal\webform\Entity\WebformSubmission;

/**
 * @Action(
 *   id = "campuschampions_approve_cc_action",
 *   label = @Translation("Approve Campus Champion"),
 *   type = ""
 * )
 */
class ApproveCCAction extends ViewsBulkOperationsActionBase {

  /**
   * {@inheritdoc}
   */
  public function execute(?WebformSubmission $entity = NULL) {
    // Update the status of the submission to 'approved'.
    $sid = $entity->id();
    $webform_submission = WebformSubmission::load($sid);
    $champion_user_type = $webform_submission->getData()['champion_user_type'];
    $webform_submission->setElementData('status', 'approved');
    WebformSubmissionForm::submitWebformSubmission($webform_submission);

    // Update user to campus champion.
    $data = $entity->getData();
    $user = user_load_by_mail($data['user_email']);

    // Set user role.
    if ($champion_user_type == 'user_student') {
      $user->addRole('student_champion');
    }
    if ($champion_user_type == 'user_champion') {
      $user->addRole('research_computing_facilitator');
    }

    $user->set('field_carnegie_code', $data['carnegie_classification']);
    $user->set('field_is_cc', 1);

    // Campus Champions Program ID.
    $cc_id = 572;

    $region = $user->get('field_region')->referencedEntities();

    if (count($region) == 0) {
      $user->set('field_region', $cc_id);
    }
    else {
      // Add Campus Champions program if it's not already set.
      if (!array_filter(
            $region,
            function ($program) use ($cc_id) {
              return $program->id() == $cc_id;
            }
        )) {
        $user->get('field_region')->appendItem(
              [
                'target_id' => $cc_id,
              ]
          );
      }
    }

    $user->save();

    $this->emailAccountNotification($user);

    return $this->t('You are a Campus Champion!');
  }

  /**
   * {@inheritdoc}
   */
  public function access($object, ?AccountInterface $account = NULL, $return_as_object = FALSE) {
    // @see Drupal\Core\Field\FieldUpdateActionBase::access().
    return $object->access('update', $account, $return_as_object);
  }

  /**
   * Email notification of new account to user.
   *
   * @param User $user
   *
   * @return null
   */
  protected function emailAccountNotification($user) {
    $mailManager = \Drupal::service('plugin.manager.mail');
    $module = 'campuschampions';
    $key = 'approve_campuschampion';
    $to = $user->getEmail();
    $name = $user->getDisplayName();
    $url = user_pass_reset_url($user);
    $params['message'] = '
      <html>
      <head>
      <title>Welcome to the Campus Champions Portal</title>
      </head>
      <body>
      <p>Dear ' . $name . ',</p>
      <p></p>
      <p>The Campus Champions program is introducing <em>Affinity Groups</em> as a lightweight way for Champions with common interests to gather, share experience, and aggregate knowledge and resources. Your account has been created on the  <a href=https://campuschampions.cyberinfrastructure.org>Champions Portal</a> which will be used to manage Affinity Groups. Please take a few minutes to access your account, set up your profile, and choose your affinity groups.</p>
      <p></p>
      <p><strong>ACCESS YOUR ACCOUNT</strong></p>
      <p></p>
      <p>Click on this link or copy and paste it to your browser:</p>
      <p>' . $url . '</p>
      <p>This link can only be used once to log in and will lead you to a page where you can set your password. It expires after seven days and nothing will happen if it&apos;s not used. </p>
      <p></p>
      <p><strong>SET UP YOUR PORTAL PROFILE</strong></p>
      <ol>
      <li>Click <strong>My Profile>Edit my account</strong> in the <strong>My Profile</strong> pulldown in the top right corner and make the following choices:
      <ol>
      <li>Select the program(s) in which you are a participant. The Campus Champions program has been pre-selected. To select the additional programs, command-click (on a MAC) or right-click (on a Windows-based machine).</li>
      <li>Select the role (or roles) that are applicable.</li>
      <li>Upload a picture so that we can recognize each other more readily!</li></ol>
      <li>Indicate your skills and interests by clicking <strong>My profile>add/edit interests</strong> or <strong>My profile>add/edit skills</strong> from the pulldown in the top right corner. "Skills" are topics on which you are willing to answer a question; "Interests" are topics about which you would like to learn more.</li>
      </ol>
      <p></p>
      <p><strong>CHOOSE YOUR AFFINITY GROUPS</strong></p>
      <p>Once you have set up your profile, click on <strong><a href="https://campuschampions.cyberinfrastructure.org/affinity-groups">Community>Affinity Groups</a> </strong> to see a list of current Affinity Groups. Please click "join" for any of those that are of interest, and you will appear in the Affinity Group.</p>
      <p> If you&apos;d like to start a new Affinity Group, please start the process using <a href="https://campuschampions.cyberinfrastructure.org/form/affinity-group-request">this form</a> on the Affinity Groups page.</p>
      <p></p>
      <p>Thank you for your participation!</p>
      <p></p>
      <p>-- The Campus Champions Leadership team</p>
      </body>
      </html>';
    $langcode = $user->getPreferredLangcode();
    $send = TRUE;

    $result = $mailManager->mail($module, $key, $to, $langcode, $params, NULL, $send);
    if ($result['result'] != TRUE) {
      $message = t('There was a problem sending your email notification to @email.', ['@email' => $to]);
      \Drupal::messenger()->addError($message);
      \Drupal::logger('mail-log')->error($message);
      return;
    }

    $message = t('An email notification has been sent to @email ', ['@email' => $to]);
    \Drupal::messenger()->addMessage($message);
    \Drupal::logger('mail-log')->notice($message);
  }

}
