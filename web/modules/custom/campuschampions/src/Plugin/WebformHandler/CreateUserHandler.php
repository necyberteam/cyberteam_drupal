<?php

namespace Drupal\campuschampions\Plugin\WebformHandler;

use Drupal\user\Entity\User;
use Drupal\webform\Plugin\WebformHandlerBase;
use Drupal\webform\WebformSubmissionInterface;
use Drupal\webform\WebformSubmissionForm;
use Drupal\Core\Link;
use Drupal\Core\Url;

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
    $ids = \Drupal::entityQuery('user')
      ->condition('mail', $data['user_email'])
      ->accessCheck(FALSE)
      ->execute();
    if (empty($ids)) {
      $user = $this->createUser($data);
      $webformSubmission->convert($user);
      $this->emailAccountNotification($user, $data['user_email']);
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
  protected function emailAccountNotification($user, $mail) {
    $render_service = \Drupal::service('renderer');
    $name = $user->getDisplayName();
    $url = user_pass_reset_url($user);
    $params = [];
    $params['name'] = $user->getDisplayName();
    $params['to'] = $mail;
    $body['string'] = [
      '#type' => 'inline_template',
      '#template' => '<html><head>
        <title>{{ title }}</title>
        </head><body>
        <p>{{ name }}</p>
        <p></p>
        <p>{{ intro }}</p>
        <p></p>
        <p><strong>{{ account }}</strong></p>
        <p></p>
        <p>{{ linktext }}</p>
        <p>{{ url }}</p>
        <p>{{ logintext }}</p>
        <p></p>
        <p><strong>{{ portalprofile }}</strong></p>
        <ol>
        <li>{{ click }} <strong>{{ myprofile }}</strong> {{ pulldown }}:
          <ol>
          <li>{{ li1 }}</li>
          <li>{{ li2 }}</li>
          <li>{{ li3 }}</li>
          </ol>
        <li>{{ li4one }} <strong>{{ li4strong1 }}</strong> {{ or }} <strong>{{ li4strong2 }}</strong> {{ li4two }}</li>
        </ol>
        <p></p>
        <p><strong>{{ chooseaffinity }}</strong></p>
        <p>{{ setupclick }} <strong>{{ affinitygrouplink }}</strong> {{ affinitygroupinst }}</p>
        <p>{{ startgroup }} {{ groupform }} {{ grouppage }}</p>
        <p></p>
        <p>{{ thanks }}</p>
        <p></p>
        <p>-- {{ teamsignoff }}</p>
        </body></html>',
      '#context' => [
        'title' => $this->t('Welcome to the Campus Champions Portal'),
        'name' => $this->t('Dear ') . $name . ",",
        'intro' => $this->t('The Campus Champions program is introducing <em>Affinity Groups</em> as a lightweight way for Champions with common interests to gather, share experience, and aggregate knowledge and resources. Your account has been created on the  <a href=https://campuschampions.cyberinfrastructure.org>Champions Portal</a> which will be used to manage Affinity Groups. Please take a few minutes to access your account, set up your profile, and choose your affinity groups.'),
        'account' => $this->t('ACCESS YOUR ACCOUNT'),
        'linktext' => $this->t('Click on this link or copy and paste it to your browser:'),
        'url' => $url,
        'logintext' => $this->t('This link can only be used once to log in and will lead you to a page where you can set your password. It expires after seven days and nothing will happen if it&apos;s not used.'),
        'portalprofile' => $this->t('SET UP YOUR PORTAL PROFILE'),
        'click' => $this->t('Click'),
        'myprofile' => $this->t('My Profile>Edit my account in the My Profile'),
        'pulldown' => $this->t('pulldown in the top right corner and make the following choices'),
        'li1' => $this->t('Select the program(s) in which you are a participant. The Campus Champions program has been pre-selected. To select the additional programs, command-click (on a MAC) or right-click (on a Windows-based machine).'),
        'li2' => $this->t('Select the role (or roles) that are applicable.'),
        'li3' => $this->t('Upload a picture so that we can recognize each other more readily!'),
        'li4one' => $this->t('Indicate your skills and interests by clicking'),
        'or' => $this->t('or'),
        'li4strong1' => $this->t('My profile>add/edit interests'),
        'li4strong2' => $this->t('My profile>add/edit skills'),
        'li4two' => $this->t('from the pulldown in the top right corner. "Skills" are topics on which you are willing to answer a question; "Interests" are topics about which you would like to learn more.'),
        'chooseaffinity' => $this->t('CHOOSE YOUR AFFINITY GROUPS'),
        'setupclick' => $this->t('Once you have set up your profile, click on'),
        'affinitygrouplink' => Link::fromTextAndUrl('Affinity Groups', Url::fromUri('https://campuschampions.cyberinfrastructure.org/affinity-groups')),
        'affinitygroupinst' => $this->t('to see a list of current Affinity Groups. Please click "join" for any of those that are of interest, and you will appear in the Affinity Group.'),
        'startgroup' => $this->t('If you&apos;d like to start a new Affinity Group, please start the process using'),
        'groupform' => Link::fromTextAndUrl('this form', Url::fromUri('https://campuschampions.cyberinfrastructure.org/form/affinity-group-request')),
        'grouppage' => $this->t('on the Affinity Groups page.'),
        'thanks' => $this->t('Thank you for your participation!'),
        'teamsignoff' => $this->t('The Campus Champions Leadership team'),
      ],
    ];
    $render_service = \Drupal::service('renderer');
    $params['body'] = $render_service->render($body);
    $params['title'] = 'Welcome to the Campus Champions Portal!';
    $this->cc_send('join-cc', $params);
  }

  /**
   * Send email.
   */
  private function cc_send($key, $params) {
    $to = $params['to'];
    $langcode = 'en';
    $send = TRUE;
    $module = 'campuschampions';
    $mailManager = \Drupal::service('plugin.manager.mail');
    $result = $mailManager->mail($module, $key, $to, $langcode, $params, NULL, $send);
    return $result;
  }
}
