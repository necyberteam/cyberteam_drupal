<?php

/**
 * @file
 */

/**
 * Add terms.
 */
function ood_software_deploy_10000_terms() {
  $terms = [
    'appvserse_app_type' => [
      'batch_connect',
      'dashboard',
      'passenger_app',
      'widget',
    ],
    'appvserse_implementation_tags' => [
      'docker',
      'containerized',
      'singularity',
      'classroom',
    ],
    'appverse_license' => [
      'Commercial License',
      'Open-Source License',
    ],
  ];

  foreach ($terms as $vocabulary_machine_name => $term_names) {
    $vocabulary = \Drupal\taxonomy\Entity\Vocabulary::load($vocabulary_machine_name);
    if ($vocabulary) {
      foreach ($term_names as $term_name) {
        $terms = \Drupal::entityTypeManager()
          ->getStorage('taxonomy_term')
          ->loadByProperties([
            'name' => $term_name,
            'vid' => $vocabulary_machine_name,
          ]);
        if (empty($terms)) {
          $term = \Drupal\taxonomy\Entity\Term::create([
            'name' => $term_name,
            'vid' => $vocabulary_machine_name,
          ]);
          $term->save();
        }
      }
    }
  }
}
