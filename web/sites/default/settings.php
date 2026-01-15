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

$config['environment_indicator.indicator']['bg_color'] = '#27391C';
$config['environment_indicator.indicator']['fg_color'] = '#FFFFFF';
$config['environment_indicator.indicator']['name'] = 'MD';

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

// Detect DDEV as local environment
if (empty($env) && getenv('IS_DDEV_PROJECT') == 'true') {
  $env = 'local';
}

if (isset($env)) {
  // Per environment settings.
  switch ($env) {
    case 'dev':
      $config['system.logging']['error_level'] = 'verbose';

      $config['environment_indicator.indicator']['bg_color'] = '#7F8CAA';
      $config['environment_indicator.indicator']['fg_color'] = '#FFFFFF';
      $config['environment_indicator.indicator']['name'] = 'Dev';
      break;

    case 'test':
      $config['environment_indicator.indicator']['bg_color'] = '#FE7743';
      $config['environment_indicator.indicator']['fg_color'] = '#FFFFFF';
      $config['environment_indicator.indicator']['name'] = 'Test';
     break;

    case 'local':
      $config['config_split.config_split.local']['status'] = TRUE;
      $config['system.logging']['error_level'] = 'verbose';
      $config['system.performance']['css']['preprocess'] = FALSE;
      $config['system.performance']['js']['preprocess'] = FALSE;
      $settings['container_yamls'][] = __DIR__ . '/../development.services.yml';

      $config['environment_indicator.indicator']['bg_color'] = '#00809D';
      $config['environment_indicator.indicator']['fg_color'] = '#FFFFFF';
      $config['environment_indicator.indicator']['name'] = 'Local';
      break;

    case 'live':
      $config['config_split.config_split.live']['status'] = TRUE;

      $config['environment_indicator.indicator']['bg_color'] = '#DC2525';
      $config['environment_indicator.indicator']['fg_color'] = '#FFFFFF';
      $config['environment_indicator.indicator']['name'] = 'Prod';
      break;
  }
}

$settings['config_sync_directory'] = 'sites/default/config/default';

$settings['config_exclude_modules'] = [
  'access_match_engagement',
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

// Helper function to get Turnstile secrets.
// Reads from private secrets file (Pantheon) or env vars (local dev).
function _get_turnstile_secret($name) {
  static $secrets = null;
  static $debug_logged = false;

  // Load secrets file once.
  if ($secrets === null) {
    // Try possible paths for the secrets file on Pantheon.
    // Per Pantheon docs, use relative path from Drupal root: sites/default/files/private
    // __DIR__ is web/sites/default, so we need to go up and use the Drupal root path.
    // Per Pantheon docs example, use relative path: sites/default/files/private/file.json
    $possible_paths = [
      'sites/default/files/private/.keys/secrets.json',
      __DIR__ . '/files/private/.keys/secrets.json',
      '/files/private/.keys/secrets.json',
    ];

    $secrets = [];
    $found_path = null;
    $debug_info = [];
    foreach ($possible_paths as $path) {
      $exists = file_exists($path);
      $debug_info[] = $path . ' => ' . ($exists ? 'EXISTS' : 'not found');
      if ($exists && $found_path === null) {
        $raw = file_get_contents($path);
        $secrets = json_decode($raw, true) ?: [];
        $found_path = $path;
        $debug_info[] = 'raw_length=' . strlen($raw) . ' keys=' . implode(',', array_keys($secrets));
      }
    }
    // Store debug info for display on challenge page.
    $GLOBALS['_turnstile_debug'] = $debug_info;
  }

  if (isset($secrets[$name])) {
    return $secrets[$name];
  }

  // Fall back to environment variables (local dev).
  return getenv($name) ?: '';
}

/**
 * Serve the Turnstile challenge page.
 *
 * This function handles both displaying the challenge form and processing
 * the verification response. It runs before Drupal bootstraps to minimize
 * server load from bot traffic.
 */
function _serve_turnstile_challenge($return_url) {
  $site_key = _get_turnstile_secret('TURNSTILE_SITE_KEY');
  $secret_key = _get_turnstile_secret('TURNSTILE_SECRET_KEY');
  $cookie_name = 'turnstile_verified';
  $cookie_duration = 86400; // 24 hours
  $error = '';

  // Sanitize return URL - must be a relative path on this domain.
  if (!preg_match('/^\/[a-zA-Z0-9\-\_\/\?\&\=\[\]\%\.\+\:]*$/', $return_url)) {
    $return_url = '/';
  }

  // Handle form submission.
  if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['cf-turnstile-response'])) {
    $token = $_POST['cf-turnstile-response'];
    $post_return_url = isset($_POST['return_url']) ? $_POST['return_url'] : '/';

    // Sanitize return URL again.
    if (preg_match('/^\/[a-zA-Z0-9\-\_\/\?\&\=\[\]\%\.\+\:]*$/', $post_return_url)) {
      $return_url = $post_return_url;
    }

    // Verify with Cloudflare.
    $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    curl_setopt_array($ch, [
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => http_build_query([
        'secret' => $secret_key,
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
      ]),
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_TIMEOUT => 10,
    ]);

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    // Debug: store verification details.
    $GLOBALS['_turnstile_verify_debug'] = [
      'secret_key_len' => strlen($secret_key),
      'secret_key_first5' => substr($secret_key, 0, 5),
      'http_code' => $http_code,
      'response' => $response,
    ];

    if ($http_code === 200) {
      $result = json_decode($response, true);

      if (!empty($result['success'])) {
        // Verification successful - set cookie and redirect.
        $secure = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
        setcookie($cookie_name, hash('sha256', $secret_key . $_SERVER['REMOTE_ADDR']), [
          'expires' => time() + $cookie_duration,
          'path' => '/',
          'secure' => $secure,
          'httponly' => true,
          'samesite' => 'Lax',
        ]);

        header('Location: ' . $return_url);
        exit();
      }
    }

    // Verification failed.
    $error = 'Verification failed. Please try again.';
  }

  // Calculate base path for "skip" link.
  $base_path = strtok($return_url, '?');
  $show_skip_link = ($base_path !== $return_url);

  // Output the challenge page.
  header('Content-Type: text/html; charset=UTF-8');
  echo '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify You\'re Human - ACCESS</title>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #f5f5f5;
      margin: 0;
      padding: 20px;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      max-width: 450px;
      width: 100%;
      text-align: center;
    }
    h1 { margin: 0 0 10px 0; color: #333; font-size: 24px; }
    p { color: #666; margin: 0 0 24px 0; line-height: 1.5; }
    .error { background: #fee; color: #c00; padding: 12px; border-radius: 4px; margin-bottom: 20px; }
    .cf-turnstile { display: flex; justify-content: center; margin-bottom: 20px; }
    button {
      background: #0073e6;
      color: white;
      border: none;
      padding: 12px 32px;
      font-size: 16px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
    }
    button:hover { background: #005bb5; }
    .skip-link { display: block; margin-top: 20px; color: #666; text-decoration: none; font-size: 14px; }
    .skip-link:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Quick Verification</h1>
    <p>To help protect our site from automated traffic, please complete this quick verification.</p>';

  if (!empty($error)) {
    echo '<div class="error">' . htmlspecialchars($error) . '</div>';
  }

  echo '<form method="POST" action="">
      <input type="hidden" name="return_url" value="' . htmlspecialchars($return_url) . '">
      <div class="cf-turnstile" data-sitekey="' . htmlspecialchars($site_key) . '"></div>
      <button type="submit">Continue</button>
    </form>';

  if ($show_skip_link) {
    echo '<a href="' . htmlspecialchars($base_path) . '" class="skip-link">Continue without filters &rarr;</a>';
  }

  // Temporary debug output - remove after fixing.
  if (!empty($GLOBALS['_turnstile_debug'])) {
    echo '<pre style="margin-top:20px;padding:10px;background:#f0f0f0;font-size:11px;text-align:left;overflow:auto;">';
    echo "Debug:\n";
    foreach ($GLOBALS['_turnstile_debug'] as $line) {
      echo htmlspecialchars($line) . "\n";
    }
    echo 'cwd=' . getcwd() . "\n";
    // Show if secret was actually retrieved (masked).
    $sk = _get_turnstile_secret('TURNSTILE_SECRET_KEY');
    echo 'secret_key_len=' . strlen($sk) . ' first5=' . substr($sk, 0, 5) . "\n";
    // Show verification debug if present (after POST).
    if (!empty($GLOBALS['_turnstile_verify_debug'])) {
      echo "\nVerification:\n";
      echo 'secret_key_len=' . $GLOBALS['_turnstile_verify_debug']['secret_key_len'] . "\n";
      echo 'secret_key_first5=' . $GLOBALS['_turnstile_verify_debug']['secret_key_first5'] . "\n";
      echo 'http_code=' . $GLOBALS['_turnstile_verify_debug']['http_code'] . "\n";
      echo 'response=' . $GLOBALS['_turnstile_verify_debug']['response'] . "\n";
    }
    echo '</pre>';
  }

  echo '</div>
</body>
</html>';
  exit();
}

// Turnstile-based bot protection for faceted searches.
// Enable on live environment OR when TURNSTILE_ENABLED is set.
$enable_turnstile = ($env === 'live') || getenv('TURNSTILE_ENABLED');

// Handle Turnstile challenge page requests.
// This intercepts /turnstile-challenge before Drupal routes it.
if ($enable_turnstile && strpos($_SERVER['REQUEST_URI'], '/turnstile-challenge') === 0) {
  $return_url = isset($_GET['return']) ? $_GET['return'] : '/';
  _serve_turnstile_challenge($return_url);
}

if ($enable_turnstile && isset($_SERVER['QUERY_STRING'])) {
  // Count unique facet parameters.
  // PHP parses f[0]=value as $_GET['f'][0], so check for 'f' array.
  $facet_count = 0;
  if (isset($_GET['f']) && is_array($_GET['f'])) {
    $facet_count = count($_GET['f']);
  }

  // Only check faceted pages.
  if ($facet_count > 0) {
    $user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';

    // Skip verification for AJAX requests (real users already on site).
    $is_ajax = isset($_GET['_drupal_ajax']) || isset($_SERVER['HTTP_X_REQUESTED_WITH']);

    if (!$is_ajax) {
      // First line of defense: block obvious bots immediately.
      $known_bots = [
        'bot', 'Bot', 'BOT', 'crawler', 'Crawler', 'spider', 'Spider',
        'AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'PetalBot', 'BLEXBot',
        'YandexBot', 'Googlebot', 'bingbot', 'Baiduspider', 'Sogou', 'Exabot',
        'facebot', 'ia_archiver', 'Screaming Frog', 'python', 'Python',
        'Go-http-client', 'Java/', 'wget', 'curl', 'libwww', 'lwp-trivial',
        'httrack', 'nutch', 'msnbot', 'Discordbot', 'WhatsApp', 'Twitterbot',
        'facebookexternalhit', 'LinkedInBot', 'Slackbot', 'Telegram', 'Signal',
        'DataForSeoBot', 'SeznamBot', 'BingPreview', 'PageSpeed', 'Lighthouse',
        'Chrome-Lighthouse', 'HeadlessChrome', 'PhantomJS', 'SlimerJS',
        'CensysInspect', 'NetcraftSurveyAgent', 'masscan', 'nmap',
      ];

      foreach ($known_bots as $bot) {
        if (stripos($user_agent, $bot) !== FALSE) {
          error_log('Blocked known bot faceted request: ' . $_SERVER['REQUEST_URI'] . ' | UA: ' . $user_agent);
          header("HTTP/1.1 403 Forbidden");
          echo 'Access denied.';
          exit();
        }
      }

      // Second line of defense: Turnstile verification for everyone else.
      $turnstile_secret = _get_turnstile_secret('TURNSTILE_SECRET_KEY');
      $cookie_name = 'turnstile_verified';

      // Verify the cookie is valid (matches expected hash).
      $cookie_valid = FALSE;
      if (isset($_COOKIE[$cookie_name]) && !empty($turnstile_secret)) {
        $expected_hash = hash('sha256', $turnstile_secret . $_SERVER['REMOTE_ADDR']);
        $cookie_valid = hash_equals($expected_hash, $_COOKIE[$cookie_name]);
      }

      if (!$cookie_valid && !empty($turnstile_secret)) {
        // No valid verification cookie - redirect to Turnstile challenge.
        // Decode REQUEST_URI first since it may already be encoded, then re-encode once.
        $return_url = urldecode($_SERVER['REQUEST_URI']);
        $challenge_url = '/turnstile-challenge?return=' . urlencode($return_url);

        error_log('Redirecting to Turnstile: ' . $_SERVER['REQUEST_URI'] . ' | UA: ' . $user_agent);
        header('Location: ' . $challenge_url);
        exit();
      }

      // If Turnstile is not configured, fall back to blocking multiple facets.
      if (empty($turnstile_secret) && $facet_count >= 2) {
        error_log('Blocked multi-facet request (no Turnstile): ' . $_SERVER['REQUEST_URI']);
        header("HTTP/1.1 503 Service Unavailable");
        header("Retry-After: 60");
        echo '<!DOCTYPE html>
<html>
<head>
    <title>Service Temporarily Unavailable</title>
</head>
<body>
    <h1>Service Temporarily Unavailable</h1>
    <p>Please use fewer filters or try again later.</p>
    <p><a href="/">Return to the homepage</a></p>
</body>
</html>';
        exit();
      }
    }
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
