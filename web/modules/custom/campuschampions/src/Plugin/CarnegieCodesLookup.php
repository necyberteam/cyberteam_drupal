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
   * A list of Estab­lished Program to Stim­u­late Com­pet­i­tive Research (EPSCoR) states
   *
   * @var array<int,string>
   */
  const EPSCOR_STATES = array(
    'AK', 'AL', 'AR', 'DE', 'GU', 'HI', 'ID',
    'KS', 'KY', 'LA', 'ME', 'MS', 'MT', 'ND',
    'NE', 'NH', 'NM', 'NV', 'OK', 'PR', 'RI',
    'SC', 'SD', 'VI', 'VT', 'WV', 'WY',
  );

  /**
   * A list of state per region
   *
   * @var array<string,int>
   */
  const REGIONS = array(
    'AK' => 1, 'AL' => 5, 'AR' => 4, 'AZ' => 2,
    'CA' => 2, 'CO' => 8, 'CT' => 7, 'DC' => 6,
    'DE' => 6, 'FL' => 5, 'GA' => 5, 'HI' => 2,
    'IA' => 3, 'ID' => 1, 'IL' => 3, 'IN' => 6,
    'KS' => 4, 'KY' => 6, 'LA' => 4, 'MA' => 7,
    'MD' => 6, 'ME' => 7, 'MI' => 6, 'MN' => 3,
    'MO' => 4, 'MS' => 5, 'MT' => 1, 'NC' => 5,
    'ND' => 3, 'NE' => 4, 'NH' => 7, 'NJ' => 6,
    'NM' => 8, 'NV' => 2, 'NY' => 7, 'OH' => 6,
    'OK' => 4, 'OR' => 1, 'PA' => 6, 'PR' => 5,
    'RI' => 7, 'SC' => 5, 'SD' => 3, 'TN' => 5,
    'TX' => 4, 'UT' => 8, 'VA' => 6, 'VI' => 5,
    'VT' => 7, 'WA' => 1, 'WI' => 3, 'WV' => 6,
    'WY' => 8, 'GU' => 2,
  );

  /**
   * Constructor.
   */
  public function __construct() {
    // No longer store the query builder
  }

  /**
   * Lookup by UNITID.
   *
   * @return array
   *   Fields specified.
   */
  public function lookupByUnitId($unitId, $fields) {
    // Create a fresh query for each lookup
    $query = \Drupal::database()->select('carnegie_codes', 'cc');
    $query->fields('cc', $fields);
    $query->condition('UNITID', $unitId);
    $result = $query->execute()->fetchAssoc();
    return $result;
  }

  /**
   * Is the given state an EPSCoR state?
   *
   * @param string $stabbr
   * @return bool
   */
  public static function isEpscor($stabbr) {
    return in_array($stabbr, self::EPSCOR_STATES);
  }

  /**
   * Calculate the type ID
   *
   * type_id = MSI + 10 * EPS_lookup + 100 * non-academy
   *
   * @param int $msi
   * @param int $eps_lookup
   * @param string|int $cc
   * @return int
   */
  public static function typeId($msi, $eps_lookup, $cc) {
    $nonacademy = 0;
    if (is_numeric($cc)) {
      $nonacademy = $cc > 9999 ? 0 : 1;
    }

    return ($msi + 10) * $eps_lookup + (100 * $nonacademy);
  }

  /**
   * Get the type in human readable text
   *
   * @param int $type_id
   * @return string
   */
  public static function type($type_id) {
    switch ($type_id) {
      case 110:
      case 100: $type = 'Other Not-For-Profit Organization'; break;
      case 11:  $type = 'MSI in EPSCoR jurisdiction';        break;
      case 10:  $type = 'EPSCoR';                            break;
      case 1:   $type = 'Minority Serving Institution';      break;
      case 0:
      default:  $type = 'Academic Institution';
    }

    return $type;
  }

  /**
   * Get the region ID by state
   *
   * @param string $stabbr
   * @return int
   */
  public static function region($stabbr) {
    if (isset(self::REGIONS[$stabbr])) {
      return self::REGIONS[$stabbr];
    }
    return 0;
  }
}
