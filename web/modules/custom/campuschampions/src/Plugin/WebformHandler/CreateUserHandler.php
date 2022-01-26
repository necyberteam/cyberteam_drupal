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
}
