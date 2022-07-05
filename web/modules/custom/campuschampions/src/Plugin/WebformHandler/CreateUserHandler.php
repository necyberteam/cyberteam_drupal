<?php

namespace Drupal\campuschampions\Plugin\WebformHandler;

use Drupal\user\Entity\User;
use Drupal\webform\Plugin\WebformHandlerBase;
use Drupal\webform\WebformSubmissionInterface;
use Drupal\webform\WebformSubmissionForm;

/**
 * Create a new user entity from a webform submission.
 *
 * @WebformHandler(
 *   id = "create_user",
 *   label = @Translation("Create User"),
 *   category = @Translation("Entity creation"),
 *   description = @Translation("Creates a new drupal user."),
 *   cardinality = \Drupal\webform\Plugin\WebformHandlerInterface::CARDINALITY_UNLIMITED,
 *   results = \Drupal\webform\Plugin\WebformHandlerInterface::RESULTS_PROCESSED,
 * )
 */
class CreateUserHandler extends WebformHandlerBase
{
    /**
     * {@inheritdoc}
     */
    public function preSave( WebformSubmissionInterface $webformSubmission, $update = true ) {
	$data = $webformSubmission->getData();
        
	// Create a new user if they don't exist already
	$ids = \Drupal::entityQuery('user')->condition('mail', $data['user_email'])->execute();
        if (empty($ids)) {
            $user = $this->createUser($data);
	    $webformSubmission->convert($user);
            $this->emailAccountNotification($user);
        }
    }

    /**
     * Create user.
     *
     * @param WebformSubmissionInterface $webformSubmission
     *
     * @return User
     */
    protected function createUser($data): User
    {
        $email = $data['user_email'];
        $username = $data['username'];
	$lang = \Drupal::languageManager()->getCurrentLanguage()->getId();
	$first_name = $data['user_first_name'];
	$last_name = $data['user_last_name'];
	$default_role = 'research_computing_facilitator';
	$carnegie_code = $data['carnegie_classification'];

        $database = \Drupal::database();
        $query = $database->select('carnegie_codes', 'cc');
        $query->condition('cc.UNITID', $carnegie_code, '=');
        $query->fields('cc', ['NAME']);
        $result = $query->execute();
        $record = $result->fetch();
	$institution = $record->NAME;

        /** @var User $user */
        $user = User::create();

        // madatory fields
        $user->setPassword(user_password());
	$user->enforceIsNew();
        $user->setEmail($email);
        $user->setUsername($username);
        $user->addRole($default_role);

	// optional fields
	$user->set('field_user_first_name', $first_name);
	$user->set('field_user_last_name', $last_name);
	$user->set('field_carnegie_code', $carnegie_code);
	$user->set('field_institution', $institution);
        $user->set('init', $email);
        $user->set('langcode', $lang);
        $user->set('preferred_langcode', $lang);
        $user->set('preferred_admin_langcode', $lang);

	$user->activate();
        $user->save();

        return $user;
    }

    /**
     * Email notification of new account to user.
     *
     * @param User $user
     *
     * @return null
     */
    protected function emailAccountNotification($user) {
        $to_email = $user->getEmail();
        $name = $user->getDisplayName();
        $url = user_pass_reset_url($user);
        $from_email = 'leadership@campuschampions.org';
        $subject = 'Welcome to the Campus Champions Portal!';
        $message = '
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
<p><a href="' . $url . '">'. $url . '</a></p>
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
</html>
';
        $mailManager = \Drupal::service('plugin.manager.mail');
        $module = 'campuschampions';
        $key = 'approve_campuschampion';
        $params['message'] = $message;
        $params['subject'] = 'Welcome to the Campus Champions Portal!';
        $langcode = $user->getPreferredLangcode();
        $send = true;

        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=iso-8859-1';
        $headers[] = 'From: ' . $from_email;
        $params['headers'] = $headers;
        $result = $mailManager->mail($module, $key, $to_email, $langcode, $params, NULL, $send);
        if ($result['result'] !== true) {
                \Drupal::messenger()->addError(t('There was a problem sending your message and it was not sent.'));
        }
    }
}
