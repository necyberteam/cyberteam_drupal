<?php

/**
 * @file
 * Optimized Campus Champions export implementation.
 *
 * This file contains an optimized version of the export hook that should
 * replace the current implementation in campuschampions.module once Carnegie
 * codes are properly populated on all users.
 */

use Drupal\campuschampions\Plugin\CarnegieCodesLookup;
use Drupal\views\ResultRow;
use Drupal\views\ViewExecutable;

/**
 * Implements HOOK_views_data_export_row_alter().
 *
 * OPTIMIZED VERSION: This version assumes Carnegie codes are already populated
 * on user entities and doesn't perform any database operations or entity saves
 * during export.
 */
function campuschampions_views_data_export_row_alter_optimized(&$row, ResultRow $result, ViewExecutable $view) {
  if ($view->id() == 'campus_champions_user_export' && $view->current_display == 'ccusers_data_export') {

    $cc = (string) $row['field_carnegie_code'];

    // Initialize all fields with empty values.
    $row['field_carnegie_code'] = '';
    $row['field_carnegie_code_location'] = '';
    $row['field_carnegie_code_classification'] = '';
    $row['field_carnegie_code_msi'] = '';
    $row['field_carnegie_code_site'] = '';
    $row['field_carnegie_code_eps_lookup'] = '';
    $row['field_carnegie_code_type_id'] = '';
    $row['field_carnegie_code_type'] = '';
    $row['field_carnegie_code_region'] = '';
    $row['field_carnegie_code_lat'] = '';
    $row['field_carnegie_code_lon'] = '';

    // Only process if Carnegie code exists.
    if (!empty($cc)) {
      // Use static caching to avoid repeated database lookups.
      static $carnegie_cache = [];

      if (!isset($carnegie_cache[$cc])) {
        // Get data based on Carnegie code.
        $db = new CarnegieCodesLookup(\Drupal::database());
        $results = $db->lookupByUnitId($cc, [
          'instnm',
          'city',
          'stabbr',
          'ic2025name',
          'msi',
        ]);

        if ($results !== FALSE) {
          $carnegie_cache[$cc] = $results;
        } else {
          $carnegie_cache[$cc] = NULL;
        }
      }

      $results = $carnegie_cache[$cc];

      if ($results !== NULL) {
        $row['field_carnegie_code'] = $cc;
        $row['field_carnegie_code_location'] = $results['city'] . ', ' . $results['stabbr'];
        $row['field_carnegie_code_classification'] = $results['ic2025name'];
        $row['field_carnegie_code_msi'] = $results['msi'];
        $row['field_carnegie_code_site'] = $results['instnm'];
        $row['field_carnegie_code_region'] = CarnegieCodesLookup::region($results['stabbr']);

        $row['field_carnegie_code_eps_lookup'] = 0;
        if (CarnegieCodesLookup::isEpscor($results['stabbr'])) {
          $row['field_carnegie_code_eps_lookup'] = 1;
        }

        $row['field_carnegie_code_type_id'] = CarnegieCodesLookup::typeId(
          $row['field_carnegie_code_msi'],
          $row['field_carnegie_code_eps_lookup'],
          $row['field_carnegie_code']
        );
        $row['field_carnegie_code_type'] = CarnegieCodesLookup::type($row['field_carnegie_code_type_id']);

        // For lat/lon, we would need to pre-populate these on the user entity
        // or create a separate lookup table to avoid the entity query.
        // For now, leaving them empty for performance.
        $row['field_carnegie_code_lat'] = '';
        $row['field_carnegie_code_lon'] = '';
      }
    }

    // Designation - simplified without webform lookup.
    if (!isset($row['webform_submission_value']) || !$row['webform_submission_value']) {
      $row['webform_submission_value'] = 'Champion';
    }
  }
}

/**
 * Instructions for implementing this optimization:
 *
 * 1. First, run the Drush command to populate Carnegie codes:
 *    drush campuschampions:populate-carnegie-codes
 *
 * 2. Verify all users have Carnegie codes populated:
 *    drush ev "print \Drupal::entityQuery('user')->notExists('field_carnegie_code')->condition('status', 1)->count()->execute();"
 *
 * 3. Replace the current campuschampions_views_data_export_row_alter() function
 *    in campuschampions.module with the optimized version above.
 *
 * 4. Consider adding these fields to the user entity to avoid lookups entirely:
 *    - field_carnegie_location
 *    - field_carnegie_classification
 *    - field_carnegie_msi
 *    - field_carnegie_site
 *    - field_carnegie_region
 *    - field_carnegie_epscor
 *    - field_carnegie_type
 *
 * 5. If you add the fields above, you can populate them with a similar Drush
 *    command and then the export would be a simple field mapping with no
 *    database queries at all.
 */
