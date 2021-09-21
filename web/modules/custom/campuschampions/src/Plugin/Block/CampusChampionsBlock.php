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
    return [
      '#theme' => 'campuschampions_block',
      '#data' => [],
    ];
  }

}
