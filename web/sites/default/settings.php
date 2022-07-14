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

$settings['container_yamls'][] = __DIR__ . '/services.yml';
$config['config_split.config_split.local']['status'] = false;

$settings['file_scan_ignore_directories'] = [
  'node_modules',
  'bower_components',
];
$settings['entity_update_batch_size'] = 50;
global $content_directories;
$content_directories['sync'] = '/datastorage/content/sync';

$additionalSettingsFiles = [
  ( DRUPAL_ROOT . "/../vendor/acquia/blt/settings/blt.settings.php" ),
  ( __DIR__ . "/settings.pantheon.php" ),
  ( __DIR__ . "/settings/local.settings.php" )
];

foreach ($additionalSettingsFiles as $settingsFile) {
  if (file_exists($settingsFile)) {
    require $settingsFile;
  }
}

$env = getenv('PANTHEON_ENVIRONMENT');

if (isset($env) ) {
  # Per environment settings
  switch ($env) {
    case 'dev':
      $config['system.logging']['error_level'] = 'verbose';
      break;
    case 'local':
      $config['config_split.config_split.local']['status'] = true;
      $config['system.logging']['error_level'] = 'verbose';
      $config['system.performance']['css']['preprocess'] = false;
      $config['system.performance']['js']['preprocess'] = false;
      break;
  }
}

$settings['config_exclude_modules'] = [
  'webprofiler',
  'cilogon_auth',
  'login_disable',
  'recaptcha',
  'swiftmailer'
];
