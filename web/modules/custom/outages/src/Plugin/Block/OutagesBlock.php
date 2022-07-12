<?php

namespace Drupal\outages\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * @Block(
 *   id = "outages_block",
 *   admin_label = @Translation("Outages block"),
 *   category = @Translation("Outages"),
 * )
 */
class OutagesBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#theme' => 'outages_block',
      '#data' => ['age' => '31', 'DOB' => '2 May 2000'],
    ];
  }

}