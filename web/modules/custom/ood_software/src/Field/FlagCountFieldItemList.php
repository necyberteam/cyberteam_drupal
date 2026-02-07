<?php

namespace Drupal\ood_software\Field;

use Drupal\Core\Field\FieldItemList;
use Drupal\Core\TypedData\ComputedItemListTrait;

/**
 * Computed field for flag count on appverse_app nodes.
 */
class FlagCountFieldItemList extends FieldItemList {

  use ComputedItemListTrait;

  /**
   * {@inheritdoc}
   */
  protected function computeValue() {
    $entity = $this->getEntity();

    // Only compute for appverse_app nodes.
    if ($entity->getEntityTypeId() !== 'node' || $entity->bundle() !== 'appverse_app') {
      $this->list[0] = $this->createItem(0, 0);
      return;
    }

    $count = 0;

    // Get the flag count from the flag_counts table.
    if (\Drupal::moduleHandler()->moduleExists('flag')) {
      /** @var \Drupal\flag\FlagCountManagerInterface $flag_count_manager */
      $flag_count_manager = \Drupal::service('flag.count');
      $counts = $flag_count_manager->getEntityFlagCounts($entity);

      if (isset($counts['appverse_apps'])) {
        $count = (int) $counts['appverse_apps'];
      }
    }

    $this->list[0] = $this->createItem(0, $count);
  }

}
