<?php

/**
 * @file
 * Global settings.
 */

use Drupal\Core\Installer\InstallerKernel;

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

ini_set('max_execution_time', 360);

// Configure Redis.
if (defined(
 'PANTHEON_ENVIRONMENT'
) && !InstallerKernel::installationAttempted(
) && extension_loaded('redis')) {
  // Set Redis as the default backend for any cache bin not otherwise specified.
  $settings['cache']['default'] = 'cache.backend.redis';

  // Phpredis is built into the Pantheon application container.
  $settings['redis.connection']['interface'] = 'PhpRedis';

  // These are dynamic variables handled by Pantheon.
  $settings['redis.connection']['host'] = $_ENV['CACHE_HOST'];
  $settings['redis.connection']['port'] = $_ENV['CACHE_PORT'];
  $settings['redis.connection']['password'] = $_ENV['CACHE_PASSWORD'];

  $settings['redis_compress_length'] = 100;
  $settings['redis_compress_level'] = 1;

  $settings['cache_prefix']['default'] = 'pantheon-redis';

  // Use the database for forms.
  $settings['cache']['bins']['form'] = 'cache.backend.database';

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

$env = getenv('PANTHEON_ENVIRONMENT');

if (isset($env)) {
  switch ($env) {
    case 'live':
      // Block bots from faceted navigation pages.
      //if (isset($_SERVER['QUERY_STRING']) && (strpos($_SERVER['QUERY_STRING'], 'f[') !== FALSE || strpos($_SERVER['QUERY_STRING'], 'f%5B') !== FALSE)) {

        ////// Block all faceted navigation for now.
        //header("HTTP/1.1 403 Forbidden");
        //exit();

        ////// List of bots to block.
        //$blocked_bots = [
          //'AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'PetalBot', 'BLEXBot', 'YandexBot',
          //'Go-http-client', 'Googlebot', 'bingbot', 'Baiduspider', 'Sogou', 'Exabot', 'facebot',
          //'MJ12bot',
        //];

        ////if (isset($_SERVER['HTTP_USER_AGENT'])) {
          //foreach ($blocked_bots as $bot) {
            //if (stripos($_SERVER['HTTP_USER_AGENT'], $bot) !== FALSE) {
              //// Send 403 Forbidden response.
              //header("HTTP/1.1 403 Forbidden");
              //exit();
            //}
          //}
        //}
      //}
      break;
  }
}

// Below configuration uses a redis backend and will limit each
// crawler / bot (identified by User-Agent string) to a maximum of 300
// requests every 600 seconds.
//
// Regular traffic (human visitors and bots not openly identifying as bots)
// will be limited to a maximum of 600 requests per visitor
// (identified by IP address + User-Agent string) every 600 seconds.
//
// Regular traffic will additionally be limited at the ASN-level to a
// maximum of 600 requests per ASN every 600 seconds.
// See https://en.wikipedia.org/wiki/Autonomous_system_(Internet)
// Enable or disable rate limiting. Required.
$settings['crawler_rate_limit.settings']['enabled'] = TRUE;

// Supported backends: redis, memcached, apcu. Required.
if (defined(
 'PANTHEON_ENVIRONMENT'
) && !InstallerKernel::installationAttempted(
) && extension_loaded('redis')) {
  $settings['crawler_rate_limit.settings']['backend'] = 'redis';
}
else {
  $settings['crawler_rate_limit.settings']['backend'] = 'apcu';
}

// Limit for crawler / bot traffic (visitors that openly identify as
// crawlers / bots). Required.
$settings['crawler_rate_limit.settings']['bot_traffic'] = [
  // Time interval in seconds. Must be whole number greater than zero.
  'interval' => 600,
  // Number of requests allowed in the given time interval per crawler or
  // bot (identified by User-Agent string). Must be a whole number greater
  // than zero.
  'requests' => 100,
];

// Limits for regular website traffic (visitors that don't openly identify
// as crawlers / bots). Optional. Omit or set to 0 to disable.
// Visitor-level (IP address + User-Agent string) regular traffic rate
// limit.
$settings['crawler_rate_limit.settings']['regular_traffic'] = [
  // Time interval in seconds. Must be whole number greater than zero.
  'interval' => 600,
  // Number of requests allowed in the given time interval per regular
  // visitor (identified by combination of IP address + User-Agent string).
  'requests' => 300,
];
// Autonomous system-level (ASN) regular traffic rate limit.
// Requires geoip2/geoip2 and associated ASN Database.
// See https://github.com/maxmind/GeoIP2-php
// See https://dev.maxmind.com/geoip/docs/databases/asn#binary-database
$settings['crawler_rate_limit.settings']['regular_traffic_asn'] = [
  // Time interval in seconds. Must be whole number greater than zero.
  'interval' => 600,
  // Number of requests allowed in the given time interval per autonomous
  // system number (ASN).
  'requests' => 300,
  // Absolute path to the local ASN Database file. Must be an up-to-date,
  // GeoLite2/GeoIP2 binary ASN Database. Consider updating automatically
  // via GeoIP Update or cron.
  // See https://dev.maxmind.com/geoip/updating-databases
  'database' => '/app/web/sites/default/files/private/geoip2/GeoLite2-ASN.mmdb',
];

// Automatically generated include for settings managed by ddev.
$ddev_settings = __DIR__ . '/settings.ddev.php';
if (getenv('IS_DDEV_PROJECT') == 'true' && is_readable($ddev_settings)) {
  require $ddev_settings;
}
