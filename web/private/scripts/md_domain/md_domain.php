<?php
/**
 * Quicksilver: Set default domain for md-* environments after code sync.
 */

$env = $_ENV['PANTHEON_ENVIRONMENT'] ?? '';
if (strpos($env, 'md-') !== 0) {
  exit(0);
}

$domain_file = $_SERVER['HOME'] . '/code/web/private/md/' . $env;
if (!file_exists($domain_file)) {
  exit(0);
}

$domain_id = trim(file_get_contents($domain_file));
if (empty($domain_id)) {
  exit(0);
}

passthru('drush domain:default ' . escapeshellarg($domain_id));
