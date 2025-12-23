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
    'appverse_app_type' => [
      'batch_connect',
      'dashboard',
      'passenger_app',
      'widget',
    ],
    'appverse_implementation_tags' => [
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
      $license_tid = _ood_software_get_or_create_term($license, 'appverse_license');
    }

    // Process topics (comma-separated).
    $topic_tids = [];
    if (!empty($topic)) {
      $topics = array_map('trim', explode(',', $topic));
      foreach ($topics as $topic_name) {
        $tid = _ood_software_get_or_create_term($topic_name, 'appverse_science_domains');
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
      'uid' => 1985,
      'body' => [
        'value' => $description,
        'format' => 'markdown',
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
  $module_path = \Drupal::service('extension.list.module')->getPath('ood_software');
  $csv_file = $module_path . '/csv/apps.csv';

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
  fgetcsv($handle);

  $count = 0;
  while (($data = fgetcsv($handle)) !== FALSE) {
    // Map CSV columns.
    // Software, App Name, GitHub URL, Organization / Author,
    // App Type, License, Implementation Tags.
    $software_name = $data[0] ?? '';
    $app_name = $data[1] ?? '';
    $github_url = $data[2] ?? '';
    $organization = $data[3] ?? '';
    $app_type = $data[4] ?? '';
    $license = $data[5] ?? '';
    $implementation_tags = $data[6] ?? '';

    if (empty($app_name)) {
      continue;
    }

    // Check if node with this GitHub URL already exists.
    // Using GitHub URL instead of title to allow multiple apps with same name.
    if (!empty($github_url)) {
      $existing_nodes = \Drupal::entityTypeManager()
        ->getStorage('node')
        ->loadByProperties([
          'type' => 'appverse_app',
          'field_appverse_github_url' => $github_url,
        ]);

      if (!empty($existing_nodes)) {
        \Drupal::logger('ood_software')->notice('App node already exists for URL: @url', ['@url' => $github_url]);
        continue;
      }
    }

    // Look up software node reference.
    $software_nid = NULL;
    if (!empty($software_name)) {
      $software_nodes = \Drupal::entityTypeManager()
        ->getStorage('node')
        ->loadByProperties([
          'type' => 'appverse_software',
          'title' => $software_name,
        ]);

      if (!empty($software_nodes)) {
        $software_node = reset($software_nodes);
        $software_nid = $software_node->id();
      }
      else {
        \Drupal::logger('ood_software')->warning('Software node not found for: @name', ['@name' => $software_name]);
      }
    }

    // Process app type.
    $app_type_tid = NULL;
    if (!empty($app_type)) {
      $app_type_tid = _ood_software_get_or_create_term($app_type, 'appverse_app_type');
    }

    // Process organization.
    $organization_tid = NULL;
    if (!empty($organization)) {
      $organization_tid = _ood_software_get_or_create_term($organization, 'appverse_organization');
    }

    // Process license.
    $license_tid = NULL;
    if (!empty($license)) {
      $license_tid = _ood_software_get_or_create_term($license, 'appverse_license');
    }

    // Process implementation tags (comma-separated).
    $tag_tids = [];
    if (!empty($implementation_tags)) {
      $tag_list = array_map('trim', explode(',', $implementation_tags));
      foreach ($tag_list as $tag_name) {
        if (!empty($tag_name)) {
          $tid = _ood_software_get_or_create_term($tag_name, 'appverse_implementation_tags');
          if ($tid) {
            $tag_tids[] = ['target_id' => $tid];
          }
        }
      }
    }

    // Create the node.
    $node = Node::create([
      'type' => 'appverse_app',
      'title' => $app_name,
      'uid' => 1985,
      'field_appverse_software_implemen' => $software_nid ? ['target_id' => $software_nid] : NULL,
      'field_appverse_github_url' => [
        'uri' => $github_url,
        'title' => '',
      ],
      'field_appverse_organization' => $organization_tid ? ['target_id' => $organization_tid] : NULL,
      'field_appverse_app_type' => $app_type_tid ? ['target_id' => $app_type_tid] : NULL,
      'field_license' => $license_tid ? ['target_id' => $license_tid] : NULL,
      'field_add_implementation_tags' => $tag_tids,
      'status' => 1,
      'moderation_state' => 'published',
    ]);

    $node->save();
    $count++;
    \Drupal::logger('ood_software')->notice('Created app node: @name', ['@name' => $app_name]);
  }

  fclose($handle);
  \Drupal::logger('ood_software')->notice('Imported @count app nodes', ['@count' => $count]);

  return t('Successfully imported @count app entries.', ['@count' => $count]);
}
