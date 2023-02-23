<?php

namespace Drupal\campuschampions\Plugin;

/**
 * Lookup in the Carnegie Codes DB.
 *
 * @CvsToArray (
 *   id = "carnegie_codes_lookup",
 *   title = @Translation("Carnegie Codes Lookup"),
 *   description = @Translation("Lookup in the Carnegie Codes DB.")
 * )
 */
class CarnegieCodesLookup {

  /**
   * Select db.
   *
   * @var \Drupal\Core\Database\Query\SelectInterface
   */
  private $dbLookup;

  /**
   * Constructor.
   */
  public function __construct() {
    $this->dbLookup = \Drupal::database()->select('carnegie_codes', 'cc');
  }

  /**
   * Lookup by UNITID.
   *
   * @return array
   *   Fields specified.
   */
  public function lookupByUnitId($unitId, $fields) {
    $this->dbLookup->fields('cc', $fields);
    $this->dbLookup->condition('UNITID', $unitId);
    $result = $this->dbLookup->execute()->fetchAssoc();
    return $result;
  }

}
