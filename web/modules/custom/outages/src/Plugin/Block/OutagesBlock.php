<?php

namespace Drupal\outages\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * @Block(
 *   id = "outages_block",
 *   admin_label = @Translation("Outages block"),
 *   category = @Translation("AMP"),
 * )
 */
class OutagesBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#theme' => 'outages_block',
    ];
  }

}