<?php

namespace Drupal\campuschampions\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a Social Auth Google login Block.
 *
 * @Block(
 *   id = "socialauthgoogle",
 *   admin_label = @Translation("Social Auth Google Login"),
 *   category = @Translation("Login")
 * )
 */
class SocialAuthGoogle extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    // Get parameter from url to redirect after login
    $destination = \Drupal::request()->query->get('current');
    return [
      '#theme' => 'socialauthgoogle',
      '#destination_path' => $destination,
    ];
  }

}

