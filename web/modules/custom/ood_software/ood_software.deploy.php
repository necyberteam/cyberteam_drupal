<?php

/**
 * @file
 */

use Drupal\node\Entity\Node;
use Drupal\taxonomy\Entity\Term;

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

/**
 * Add software via csv.
 */
function ood_software_deploy_10001_software() {
  $module_path = \Drupal::service('extension.list.module')->getPath('ood_software');
  $csv_file = $module_path . '/csv/software.csv';

  if (!file_exists($csv_file)) {
    \Drupal::logger('ood_software')->error('CSV file not found at @path', ['@path' => $csv_file]);
    return;
  }

  $handle = fopen($csv_file, 'r');
  if (!$handle) {
    \Drupal::logger('ood_software')->error('Unable to open CSV file');
    return;
  }

  // Read and skip header row.
  $header = fgetcsv($handle);

  $count = 0;
  while (($data = fgetcsv($handle)) !== FALSE) {
    // Map CSV columns: Name, Description, Software URL, Docs, License, Topic, Tags
    $name = $data[0] ?? '';
    $description = $data[1] ?? '';
    $software_url = $data[2] ?? '';
    $docs = $data[3] ?? '';
    $license = $data[4] ?? '';
    $topic = $data[5] ?? '';
    $tags = $data[6] ?? '';

    if (empty($name)) {
      continue;
    }

    // Check if node with this title already exists.
    $existing_nodes = \Drupal::entityTypeManager()
      ->getStorage('node')
      ->loadByProperties([
        'type' => 'appverse_software',
        'title' => $name,
      ]);

    if (!empty($existing_nodes)) {
      \Drupal::logger('ood_software')->notice('Node already exists for: @name', ['@name' => $name]);
      continue;
    }

    // Process license.
    $license_tid = NULL;
    if (!empty($license)) {
      $license_tid = _ood_software_get_or_create_term($license, 'license');
    }

    // Process topics (comma-separated).
    $topic_tids = [];
    if (!empty($topic)) {
      $topics = array_map('trim', explode(',', $topic));
      foreach ($topics as $topic_name) {
        $tid = _ood_software_get_or_create_term($topic_name, 'appverse_topics');
        if ($tid) {
          $topic_tids[] = ['target_id' => $tid];
        }
      }
    }

    // Process tags (comma-separated).
    $tag_tids = [];
    if (!empty($tags)) {
      $tag_list = array_map('trim', explode(',', $tags));
      foreach ($tag_list as $tag_name) {
        $tid = _ood_software_get_or_create_term($tag_name, 'tags');
        if ($tid) {
          $tag_tids[] = ['target_id' => $tid];
        }
      }
    }

    // Create the node.
    $node = Node::create([
      'type' => 'appverse_software',
      'title' => $name,
      'body' => [
        'value' => $description,
        'format' => 'basic_html',
      ],
      'field_appverse_software_website' => [
        'uri' => $software_url,
        'title' => '',
      ],
      'field_appverse_software_doc' => [
        'uri' => $docs,
        'title' => '',
      ],
      'field_license' => $license_tid ? ['target_id' => $license_tid] : NULL,
      'field_appverse_topics' => $topic_tids,
      'field_tags' => $tag_tids,
      'status' => 1,
    ]);

    $node->save();
    $count++;
    \Drupal::logger('ood_software')->notice('Created node: @name', ['@name' => $name]);
  }

  fclose($handle);
  \Drupal::logger('ood_software')->notice('Imported @count software nodes', ['@count' => $count]);

  return t('Successfully imported @count software entries.', ['@count' => $count]);
}

/**
 * Helper function to get or create a taxonomy term.
 *
 * @param string $name
 *   The term name.
 * @param string $vocabulary
 *   The vocabulary machine name.
 *
 * @return int|null
 *   The term ID or NULL if failed.
 */
function _ood_software_get_or_create_term($name, $vocabulary) {
  if (empty($name)) {
    return NULL;
  }

  // Check if term exists.
  $terms = \Drupal::entityTypeManager()
    ->getStorage('taxonomy_term')
    ->loadByProperties([
      'name' => $name,
      'vid' => $vocabulary,
    ]);

  if (!empty($terms)) {
    $term = reset($terms);
    return $term->id();
  }

  // Create new term.
  try {
    $term = Term::create([
      'name' => $name,
      'vid' => $vocabulary,
    ]);
    $term->save();
    return $term->id();
  }
  catch (\Exception $e) {
    \Drupal::logger('ood_software')->error('Failed to create term @name: @error', [
      '@name' => $name,
      '@error' => $e->getMessage(),
    ]);
    return NULL;
  }
}

/**
 * Add apps via csv.
 */
function ood_software_deploy_10002_apps() {
}
