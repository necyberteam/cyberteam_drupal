<?php

/**
 * @file
 * Deployment functions for the ood_software module.
 */

use Drupal\menu_link_content\Entity\MenuLinkContent;
use Drupal\media\Entity\Media;
use Drupal\Core\File\FileExists;
use Drupal\Core\File\FileSystemInterface;
use Drupal\taxonomy\Entity\Vocabulary;
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
    $vocabulary = Vocabulary::load($vocabulary_machine_name);
    if ($vocabulary) {
      foreach ($term_names as $term_name) {
        $terms = \Drupal::entityTypeManager()
          ->getStorage('taxonomy_term')
          ->loadByProperties([
            'name' => $term_name,
            'vid' => $vocabulary_machine_name,
          ]);
        if (empty($terms)) {
          $term = Term::create([
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

  $count = 0;
  while (($data = fgetcsv($handle)) !== FALSE) {
    // Map CSV columns: Name, Description, Software URL, Docs, License, Topic,
    // Tags.
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
    // App Type, License, Implementation Tags, Description, Stars, Last Commit,
    // Is Archived.
    $software_name = $data[0] ?? '';
    $app_name = $data[1] ?? '';
    $github_url = $data[2] ?? '';
    $organization = $data[3] ?? '';
    $app_type = $data[4] ?? '';
    $license = $data[5] ?? '';
    $implementation_tags = $data[6] ?? '';
    $description = $data[7] ?? '';
    $last_commit = $data[9] ?? '';
    $is_archived = $data[10] ?? '';

    if (empty($app_name)) {
      continue;
    }

    // Skip archived repositories.
    if ($is_archived === 'true') {
      \Drupal::logger('ood_software')->notice('Skipping archived repo: @url', ['@url' => $github_url]);
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

    // Parse last commit date to timestamp if provided.
    $last_updated = NULL;
    if (!empty($last_commit)) {
      $last_updated = strtotime($last_commit);
    }

    // Create the node.
    $node = Node::create([
      'type' => 'appverse_app',
      'title' => $app_name,
      'uid' => 1985,
      'body' => !empty($description) ? [
        'value' => $description,
        'format' => 'markdown',
      ] : NULL,
      'field_appverse_software_implemen' => $software_nid ? ['target_id' => $software_nid] : NULL,
      'field_appverse_github_url' => [
        'uri' => $github_url,
        'title' => '',
      ],
      'field_appverse_organization' => $organization_tid ? ['target_id' => $organization_tid] : NULL,
      'field_appverse_app_type' => $app_type_tid ? ['target_id' => $app_type_tid] : NULL,
      'field_license' => $license_tid ? ['target_id' => $license_tid] : NULL,
      'field_add_implementation_tags' => $tag_tids,
      'field_appverse_lastupdated' => $last_updated,
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

/**
 * Add logos to software nodes.
 */
function ood_software_deploy_10003_logos() {
  $module_path = \Drupal::service('extension.list.module')->getPath('ood_software');
  $logos_dir = $module_path . '/logos';
  $mapping_file = $logos_dir . '/mapping.php';

  if (!file_exists($mapping_file)) {
    \Drupal::logger('ood_software')->error('Logo mapping file not found at @path', ['@path' => $mapping_file]);
    return;
  }

  $mapping = include $mapping_file;
  $file_system = \Drupal::service('file_system');
  $count = 0;

  foreach ($mapping as $filename => $software_name) {
    $logo_path = $logos_dir . '/' . $filename;

    if (!file_exists($logo_path)) {
      \Drupal::logger('ood_software')->warning('Logo file not found: @file', ['@file' => $filename]);
      continue;
    }

    // Find the software node.
    $software_nodes = \Drupal::entityTypeManager()
      ->getStorage('node')
      ->loadByProperties([
        'type' => 'appverse_software',
        'title' => $software_name,
      ]);

    if (empty($software_nodes)) {
      \Drupal::logger('ood_software')->warning('Software node not found for: @name', ['@name' => $software_name]);
      continue;
    }

    $software_node = reset($software_nodes);

    // Check if logo already exists.
    if (!$software_node->get('field_appverse_logo')->isEmpty()) {
      \Drupal::logger('ood_software')->notice('Logo already exists for: @name', ['@name' => $software_name]);
      continue;
    }

    // Determine media bundle based on file extension.
    $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
    $is_svg = ($extension === 'svg');

    // Copy file to public files.
    $destination_dir = 'public://appverse-logos';
    $file_system->prepareDirectory($destination_dir, FileSystemInterface::CREATE_DIRECTORY);
    $destination = $destination_dir . '/' . $filename;

    $file_data = file_get_contents($logo_path);
    $file = \Drupal::service('file.repository')->writeData($file_data, $destination, FileExists::Replace);

    if (!$file) {
      \Drupal::logger('ood_software')->error('Failed to copy logo: @file', ['@file' => $filename]);
      continue;
    }

    // Create media entity.
    if ($is_svg) {
      $media = Media::create([
        'bundle' => 'svg',
        'name' => $software_name . ' logo',
        'uid' => 1985,
        'field_media_image_1' => [
          'target_id' => $file->id(),
          'alt' => $software_name . ' logo',
        ],
      ]);
    }
    else {
      $media = Media::create([
        'bundle' => 'image',
        'name' => $software_name . ' logo',
        'uid' => 1985,
        'field_media_image' => [
          'target_id' => $file->id(),
          'alt' => $software_name . ' logo',
        ],
      ]);
    }

    $media->save();

    // Attach media to software node.
    $software_node->set('field_appverse_logo', ['target_id' => $media->id()]);
    $software_node->save();

    $count++;
    \Drupal::logger('ood_software')->notice('Added logo for: @name', ['@name' => $software_name]);
  }

  \Drupal::logger('ood_software')->notice('Added @count logos to software nodes', ['@count' => $count]);

  return t('Successfully added @count logos.', ['@count' => $count]);
}

/**
 * Add menu links.
 */
function ood_software_deploy_10004_menus() {
  $my_apps = [
    'title' => 'My Apps',
    'link' => ['uri' => 'internal:/appverse/my-apps'],
    'menu_name' => 'account',
    'weight' => 46,
    'expanded' => FALSE,
    'enabled' => TRUE,
    'parent' => 'user.page',
    'options' => [
      'attributes' => [
        'class' => ['region-specific', 'display-open-ondemand'],
        'roles' => ['authenticated'],
      ],
    ],
  ];
  ood_software_links($my_apps);

  $manage_apps = [
    'title' => 'Manage Appverse Apps',
    'link' => ['uri' => 'internal:/appverse/manage-apps'],
    'menu_name' => 'account',
    'weight' => 46,
    'expanded' => FALSE,
    'enabled' => TRUE,
    'parent' => 'user.page',
    'options' => [
      'attributes' => [
        'class' => ['region-specific', 'display-open-ondemand'],
        'roles' => ['administrator', 'appverse_pm'],
      ],
    ],
  ];
  ood_software_links($manage_apps);
}

/**
 * Clear last updated field for apps missing body/readme to force GitHub sync.
 */
function ood_software_deploy_10005_force_app_sync() {
  $node_storage = \Drupal::entityTypeManager()->getStorage('node');

  // Find all appverse_app nodes.
  $nids = $node_storage->getQuery()
    ->accessCheck(FALSE)
    ->condition('type', 'appverse_app')
    ->execute();

  $count = 0;
  foreach ($nids as $nid) {
    $node = $node_storage->load($nid);
    if (!$node) {
      continue;
    }

    // Check if body or readme is empty.
    $body = $node->get('body')->value;
    $readme = $node->get('field_appverse_readme')->value;

    if (empty($body) || empty($readme)) {
      // Clear the last updated field to force sync on next cron.
      $node->set('field_appverse_lastupdated', NULL);
      $node->save();
      $count++;
      \Drupal::logger('ood_software')->notice('Cleared last updated for: @title', ['@title' => $node->getTitle()]);
    }
  }

  \Drupal::logger('ood_software')->notice('Cleared last updated for @count apps to force GitHub sync', ['@count' => $count]);

  return t('Cleared last updated for @count apps. Run cron to sync from GitHub.', ['@count' => $count]);
}

/**
 * Create menu item.
 */
function ood_software_links($menu_link) {
  $existing_links = \Drupal::entityTypeManager()
    ->getStorage('menu_link_content')
    ->loadByProperties([
      'title' => $menu_link['title'],
      'menu_name' => $menu_link['menu_name'],
    ]);
  if (empty($existing_links)) {
    $roles = $menu_link['options']['attributes']['roles'];
    // Added to variable to avoid saving roles directly to menu.
    unset($menu_link['options']['attributes']['roles']);

    // Move options into the link field structure.
    $menu_link['link']['options'] = $menu_link['options'];
    unset($menu_link['options']);

    $menu_link_entity = MenuLinkContent::create($menu_link);
    $menu_link_entity->save();
    $mid = $menu_link_entity->id();

    // Add roles that can see menu item.
    if (isset($roles)) {
      $delta = 0;
      foreach ($roles as $role) {
        \Drupal::database()->insert('menu_link_content__menu_item_roles')
          ->fields([
            'bundle' => 'account',
            'deleted' => 0,
            'entity_id' => $mid,
            'revision_id' => $mid,
            'langcode' => 'en',
            'delta' => $delta,
            'menu_item_roles_target_id' => $role,
          ])
          ->execute();
        $delta++;
      }
    }
    \Drupal::logger('ood_software')->notice('Added menu link: @title', ['@title' => $menu_link['title']]);
  }
  else {
    \Drupal::logger('ood_software')->notice('Menu link already exists: @title', ['@title' => $menu_link['title']]);
  }
}
