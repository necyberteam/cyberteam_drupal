<?php

namespace Drupal\campuschampions\Plugin;

/**
 * Store stats.
 */
class StoreStats {

  /**
   * Store stats here.
   */
  private $data;

  /**
   * Constructor.
   */
  public function __construct() {
  }

  /**
   * Get stats.
   *
   * @return array
   */
  public function getStats() {
    $data = [
      // Champions natiowide
      'nationwide' => 0,
      // Institutions Represented
      'institutions' => 0,
      // Estab­lished Program to Stim­u­late Com­pet­i­tive Research
      'epscor' => 0,
      // Minority Serving Institutes
      'msi' => 0
    ];

    $region = 572; // Campus Champions

    // Nation wide
    $query = \Drupal::database()
      ->select('users_field_data', 'f')
      ->fields('f', ['uid']);
    $query->innerJoin('user__field_region', 'n', 'n.entity_id = f.uid');
    $query->condition('n.deleted', 0);
    $query->condition('n.field_region_target_id', $region);
    $query->condition('f.status', 1);

    $data['nationwide'] = $query->countQuery()
      ->execute()
      ->fetchField();

    // Institutions
    $query = \Drupal::database()
      ->select('user__field_institution', 'i')
      ->fields('i', ['field_institution_value']);
    $query->innerJoin('users_field_data', 'f', 'i.entity_id = f.uid');
    $query->innerJoin('user__field_region', 'n', 'n.entity_id = f.uid');
    $query->condition('i.deleted', 0);
    $query->condition('n.deleted', 0);
    $query->condition('n.field_region_target_id', $region);
    $query->condition('f.status', 1);

    $data['institutions'] = $query->distinct()
      ->countQuery()
      ->execute()
      ->fetchField();

    // EPSCoR states
    $query = \Drupal::database()
      ->select('user__field_carnegie_code', 'c')
      ->fields('c', ['field_carnegie_code_value']);
    $query->innerJoin('users_field_data', 'f', 'c.entity_id = f.uid');
    $query->innerJoin('user__field_region', 'n', 'n.entity_id = f.uid');
    $query->innerJoin('carnegie_codes', 'r', 'r.unitid = c.field_carnegie_code_value');
    $query->condition('n.deleted', 0);
    $query->condition('n.field_region_target_id', $region);
    $query->condition('f.status', 1);
    $query->condition('r.stabbr', CarnegieCodesLookup::EPSCOR_STATES, 'IN');

    $data['epscor'] = $query->distinct()
      ->countQuery()
      ->execute()
      ->fetchField();

    // MSI
    $query = \Drupal::database()
      ->select('user__field_carnegie_code', 'c')
      ->fields('c', ['field_carnegie_code_value']);
    $query->innerJoin('users_field_data', 'f', 'c.entity_id = f.uid');
    $query->innerJoin('user__field_region', 'n', 'n.entity_id = f.uid');
    $query->innerJoin('carnegie_codes', 'r', 'r.unitid = c.field_carnegie_code_value');
    $query->condition('n.deleted', 0);
    $query->condition('n.field_region_target_id', $region);
    $query->condition('f.status', 1);
    $query->condition('r.msi', 1);

    $data['msi'] = $query->distinct()->countQuery()->execute()->fetchField();

    $this->data = json_encode($data);
  }

  /**
   * Add stats to cc_stats state.
   */
  public function setState() {
    $this->getStats();
    \Drupal::state()->set('cc_stats',$this->data);
  }
}