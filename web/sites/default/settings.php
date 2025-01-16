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

ini_set('max_execution_time', 300);

// Configure Redis

if (defined(
 'PANTHEON_ENVIRONMENT'
) && !\Drupal\Core\Installer\InstallerKernel::installationAttempted(
) && extension_loaded('redis')) {
 // Set Redis as the default backend for any cache bin not otherwise specified.
 $settings['cache']['default'] = 'cache.backend.redis';

 //phpredis is built into the Pantheon application container.
 $settings['redis.connection']['interface'] = 'PhpRedis';

 // These are dynamic variables handled by Pantheon.
 $settings['redis.connection']['host'] = $_ENV['CACHE_HOST'];
 $settings['redis.connection']['port'] = $_ENV['CACHE_PORT'];
 $settings['redis.connection']['password'] = $_ENV['CACHE_PASSWORD'];

 $settings['redis_compress_length'] = 100;
 $settings['redis_compress_level'] = 1;

 $settings['cache_prefix']['default'] = 'pantheon-redis';

 $settings['cache']['bins']['form'] = 'cache.backend.database'; // Use the database for forms

 // Apply changes to the container configuration to make better use of Redis.
 // This includes using Redis for the lock and flood control systems, as well
 // as the cache tag checksum. Alternatively, copy the contents of that file
 // to your project-specific services.yml file, modify as appropriate, and
 // remove this line.
 $settings['container_yamls'][] = 'modules/contrib/redis/example.services.yml';

 // Allow the services to work before the Redis module itself is enabled.
 $settings['container_yamls'][] = 'modules/contrib/redis/redis.services.yml';

 // Manually add the classloader path, this is required for the container
 // cache bin definition below.
 $class_loader->addPsr4('Drupal\\redis\\', 'modules/contrib/redis/src');

 // Use redis for container cache.
 // The container cache is used to load the container definition itself, and
 // thus any configuration stored in the container itself is not available
 // yet. These lines force the container cache to use Redis rather than the
 // default SQL cache.
 $settings['bootstrap_container_definition'] = [
   'parameters' => [],
   'services' => [
     'redis.factory' => [
       'class' => 'Drupal\redis\ClientFactory',
     ],
     'cache.backend.redis' => [
       'class' => 'Drupal\redis\Cache\CacheBackendFactory',
       'arguments' => [
         '@redis.factory',
         '@cache_tags_provider.container',
         '@serialization.phpserialize',
       ],
     ],
     'cache.container' => [
       'class' => '\Drupal\redis\Cache\PhpRedis',
       'factory' => ['@cache.backend.redis', 'get'],
       'arguments' => ['container'],
     ],
     'cache_tags_provider.container' => [
       'class' => 'Drupal\redis\Cache\RedisCacheTagsChecksum',
       'arguments' => ['@redis.factory'],
     ],
     'serialization.phpserialize' => [
       'class' => 'Drupal\Component\Serialization\PhpSerialize',
     ],
   ],
 ];
}
