<?php

/**
 * @file
 * Cloudflare Turnstile verification for faceted search protection.
 *
 * This lightweight standalone file handles bot verification without
 * bootstrapping Drupal, reducing server load from bot traffic.
 */

// Helper function to get Turnstile secrets.
// Uses Pantheon Secrets on Pantheon, falls back to getenv() for local dev.
function _get_turnstile_secret($name) {
  if (function_exists('pantheon_get_secret')) {
    $value = pantheon_get_secret($name);
    if ($value) {
      return $value;
    }
  }
  return getenv($name) ?: '';
}

// Configuration - uses Pantheon Secrets on Pantheon, env vars locally.
$site_key = _get_turnstile_secret('TURNSTILE_SITE_KEY');
$secret_key = _get_turnstile_secret('TURNSTILE_SECRET_KEY');

// Cookie settings.
$cookie_name = 'turnstile_verified';
$cookie_duration = 86400; // 24 hours

// Get the return URL from query parameter.
$return_url = isset($_GET['return']) ? $_GET['return'] : '/';

// Sanitize return URL - must be a relative path on this domain.
if (!preg_match('/^\/[a-zA-Z0-9\-\_\/\?\&\=\[\]\%\.\+]*$/', $return_url)) {
  $return_url = '/';
}

// Handle form submission.
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['cf-turnstile-response'])) {
  $token = $_POST['cf-turnstile-response'];
  $return_url = isset($_POST['return_url']) ? $_POST['return_url'] : '/';

  // Sanitize return URL again.
  if (!preg_match('/^\/[a-zA-Z0-9\-\_\/\?\&\=\[\]\%\.\+]*$/', $return_url)) {
    $return_url = '/';
  }

  // Verify with Cloudflare.
  $verify_url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

  $ch = curl_init($verify_url);
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

  // Verification failed - show error.
  $error = 'Verification failed. Please try again.';
}

// Show the challenge page.
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify You're Human - ACCESS</title>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
  <style>
    * {
      box-sizing: border-box;
    }
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
    h1 {
      margin: 0 0 10px 0;
      color: #333;
      font-size: 24px;
    }
    p {
      color: #666;
      margin: 0 0 24px 0;
      line-height: 1.5;
    }
    .error {
      background: #fee;
      color: #c00;
      padding: 12px;
      border-radius: 4px;
      margin-bottom: 20px;
    }
    .cf-turnstile {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
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
    button:hover {
      background: #005bb5;
    }
    .skip-link {
      display: block;
      margin-top: 20px;
      color: #666;
      text-decoration: none;
      font-size: 14px;
    }
    .skip-link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Quick Verification</h1>
    <p>To help protect our site from automated traffic, please complete this quick verification.</p>

    <?php if (!empty($error)): ?>
      <div class="error"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>

    <form method="POST" action="">
      <input type="hidden" name="return_url" value="<?php echo htmlspecialchars($return_url); ?>">

      <div class="cf-turnstile" data-sitekey="<?php echo htmlspecialchars($site_key); ?>"></div>

      <button type="submit">Continue</button>
    </form>

    <?php
    // Provide a link to the base page without facets.
    $base_path = strtok($return_url, '?');
    if ($base_path !== $return_url):
    ?>
      <a href="<?php echo htmlspecialchars($base_path); ?>" class="skip-link">
        Continue without filters →
      </a>
    <?php endif; ?>
  </div>
</body>
</html>
