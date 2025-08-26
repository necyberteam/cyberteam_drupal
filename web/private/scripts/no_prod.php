<?php

/**
 * @file
 * Turn off non-prod site functions..
 */

echo "Disable constant contact cron run.\n";
passthru('drush php:eval "\\Drupal::state()->set(\'access_affinitygroup.alloc_cron_disable\', TRUE);"');
echo "Disable constant contact cron run complete.\n";
echo "Truncate domain_source table...\n";
passthru('drush sql-query "TRUNCATE TABLE node__field_domain_source"');
