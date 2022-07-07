<?php

/**
 * @file
 * Global settings.
 */

global $config;

$hash = getenv('DRUPAL_HASH_SALT');

$settings['hash_salt'] = $hash;
$settings['update_free_access'] = false;
$settings['file_public_path'] = 'sites/default/files';
$settings['file_private_path'] = 'sites/default/files/private';

$settings['container_yamls'][] = 'sites/default/services.yml';


$env = getenv('PANTHEON_ENVIRONMENT');

if (isset($env) ) {

  # Per environment settings
  switch ($env) {
  case 'dev':
    $config['system.logging']['error_level'] = 'verbose';
    break;
  case 'local':
    $config['system.logging']['error_level'] = 'verbose';
    $config['system.performance']['css']['preprocess'] = FALSE;
    $config['system.performance']['js']['preprocess'] = FALSE;
    break;
  }
}

$settings['file_scan_ignore_directories'] = [
  'node_modules',
  'bower_components',
];
$settings['entity_update_batch_size'] = 50;
global $content_directories;
$content_directories['sync'] = '/datastorage/content/sync';
$settings['config_sync_directory'] = '/datastorage/config/sync';
$settings['config_exclude_modules'] = [
  'devel', 
  'webprofiler',
  'cilogon_auth',
  'login_disable',
  'recaptcha',
  'swiftmailer'
];

$additionalSettingsFiles = [
  ( DRUPAL_ROOT . "/../vendor/acquia/blt/settings/blt.settings.php" ),
  ( __DIR__ . "/settings/local.settings.php" ),
  ( __DIR__ . "/settings.pantheon.php" )
];

foreach ($additionalSettingsFiles as $settingsFile) {
  if (file_exists($settingsFile)) {
    require $settingsFile;
  }
}
