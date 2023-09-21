<?php

namespace Drupal\campuschampions\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a Campus Champions Banner Block.
 *
 * @Block(
 *   id = "campus_champions_block",
 *   admin_label = @Translation("Campus Champions Banner block"),
 *   category = @Translation("Campus Champions"),
 * )
 */
class CampusChampionsBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $stats = [
      'nationwide' => 827,
      'institutions' => 362,
      'epscor' => 87,
      'msi' => 61
    ];

    $file = \Drupal::service('file_system')->realpath('public://') . '/cc-breakdown-stats.json';

    if (file_exists($file)) {
      $contents = file_get_contents($file);
      $data = json_decode($contents);
      if (!empty($data)) {
        $stats = $data;
      }
    }

    return [
      '#theme' => 'campuschampions_block',
      '#data' => $stats,
    ];
  }

}
