<?php

namespace Drupal\ood_software\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Controller for redirecting to user's my-apps page.
 */
class MyAppsRedirectController extends ControllerBase {

  /**
   * Redirects authenticated users to their my-apps page.
   *
   * @return \Symfony\Component\HttpFoundation\RedirectResponse
   *   A redirect response to the user's my-apps page.
   */
  public function redirectToMyApps() {
    $current_user = $this->currentUser();
    $uid = $current_user->id();
    
    return new RedirectResponse("/user/{$uid}/my-apps");
  }

}
