<?php

/**
 * @file
 * Global settings.
 */

global $config;

$hash = getenv('DRUPAL_HASH_SALT');

$settings['hash_salt'] = $hash;
$settings['update_free_access'] = FALSE;
$settings['file_public_path'] = 'sites/default/files';
$settings['file_private_path'] = 'sites/default/files/private';

$settings['container_yamls'][] = __DIR__ . '/services.yml';
$config['config_split.config_split.local']['status'] = FALSE;
$config['config_split.config_split.live']['status'] = FALSE;

$settings['file_scan_ignore_directories'] = [
  'node_modules',
  'bower_components',
];
$settings['entity_update_batch_size'] = 50;
global $content_directories;
$content_directories['sync'] = '/datastorage/content/sync';

$additionalSettingsFiles = [
  (DRUPAL_ROOT . "/../vendor/acquia/blt/settings/blt.settings.php"),
  (__DIR__ . "/settings.pantheon.php"),
// For lando blt tests.
  (__DIR__ . "/settings/local.settings.php"),
// More local settings.
  (__DIR__ . "/local.settings.php"),
];

foreach ($additionalSettingsFiles as $settingsFile) {
  if (file_exists($settingsFile)) {
    require $settingsFile;
  }
}

if (defined('PANTHEON_ENVIRONMENT')) {
  $env = PANTHEON_ENVIRONMENT;
}
else {
  $env = getenv('PANTHEON_ENVIRONMENT');
}

if (isset($env)) {
  // Per environment settings.
  switch ($env) {
    case 'dev':
      $config['system.logging']['error_level'] = 'verbose';
      break;

    case 'local':
      $config['config_split.config_split.local']['status'] = TRUE;
      $config['system.logging']['error_level'] = 'verbose';
      $config['system.performance']['css']['preprocess'] = FALSE;
      $config['system.performance']['js']['preprocess'] = FALSE;
      $settings['container_yamls'][] = __DIR__ . '/../development.services.yml';
      break;

    case 'live':
      $config['config_split.config_split.live']['status'] = TRUE;
      break;
  }
}

$settings['config_sync_directory'] = 'sites/default/config/default';

$settings['config_exclude_modules'] = [
  'access_match_engagement',
  'access_affinitygroup',
  'webprofiler',
  'cilogon_auth',
  'devel',
  'devel_generate',
  'login_disable',
  'recaptcha',
  'upgrade_status',
  'symfony_mailer',
  'recaptcha_v3',
];
