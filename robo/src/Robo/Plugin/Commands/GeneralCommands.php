<?php

namespace Mih\Robo\Plugin\Commands;

use Robo\Exception\TaskException;
use Robo\Result;
use Robo\Robo;
use Robo\Tasks;
use Drupal\Component\Utility\Crypt;

/**
 * Defines general commands.
 */
class GeneralCommands extends Tasks {


  /**
   * DDEV command prefix.
   */
  private function ddev() {
    $ddev = "ddev";
    if (getenv('IS_DDEV_PROJECT') == 'true') {
      $ddev = "";
    }
    return $ddev;
  }

  /**
   * Return system uname.
   */
  private function uname() {
    $os = shell_exec("uname -s");
    $os = str_replace(array("\n", "\r"), '', $os);
    return $os;
  }

  /**
   * Reload site with prod db.
   *
   * @command did
   * @description pull in production database.
   */
  public function did(array $args) {
    $domain_id = implode($args);
    if (!is_numeric($domain_id)) {
      $domain_id = '';
    }

    // Detect if we're in DDEV container or native environment
    $is_ddev = file_exists('/.ddev') || getenv('DDEV_PROJECT') || file_exists('/var/www/html/.ddev');

    if ($is_ddev) {
      // When inside DDEV container, commands don't need ddev prefix
      $cmd_prefix = "";
    }
    else {
      // Native environment - use DDEV commands from host
      $cmd_prefix = "ddev ";
    }

    // Use DDEV's built-in database import (works from both host and container)
    $this->_exec($cmd_prefix . "import-db --file=backups/site.sql.gz");

    $this->_exec("sleep 2");
    $this->_exec($cmd_prefix . "composer install");
    $this->_exec($cmd_prefix . "drush deploy -y");
    $this->_exec("sleep 2");
    $this->_exec($cmd_prefix . "drush cim -y");
    $this->_exec("sleep 2");
    if (!empty($domain_id)) {
      $this->_exec($cmd_prefix . "robo ds $domain_id");
    }
    else {
      $this->_exec("sleep 2");
      $this->_exec($cmd_prefix . "drush cr");
    }
    $this->uli();
  }

  /**
   * Login with username.
   *
   * @command uli
   * @description Login locally with personal username set in github.
   */
  public function uli() {
    $uid = $_ENV["AMP_UID"] ?? null;

    if ($this->ddev() == '') {
      if ($uid) {
        $this->_exec("drush uli --uid='$uid'");
      }
      else {
        $this->_exec("drush uli --uid=1");
      }
    }
    else {
      $this->_exec("ddev composer robo uli");
    }
  }


  /**
   * Setup DDEV environment.
   *
   * @command ddevsetup
   * @description Setup DDEV environment with GitHub auth and database.
   */
  public function ddevsetup(array $args) {
    // Detect if we're running inside DDEV container
    $in_container = getcwd() == '/var/www/html' || getenv('DDEV_PROJECT');

    if ($in_container) {
      $this->say("❗️ This command should be run from the host, not inside the DDEV container. ❗️");
      $this->say("Please exit the container and run: vendor/bin/robo ddevsetup");
      return;
    }

    if ($args) {
      $token = $args[0];
      $uid = $args[1];
    }
    else {
      $token = $this->ask("What is your GitHub token: ");
      $uid = $this->ask("What is your drupal user id: ");
    }

    $files = 'web/sites/default/files';
    $db_backup = 'backups';

    // Create symlink if needed (DDEV uses 'web' as docroot)
    if (!file_exists('docroot') && file_exists('web')) {
      $this->_exec("ln -s web docroot");
    }

    // Setup directories and settings
    $this->_exec("mkdir -p web/sites/default/settings");
    $this->_exec("cp robo/assets/ddev.local.settings.php web/sites/default/settings/local.settings.php");

    // Generate hash and create .env file
    $hash = Crypt::randomBytesBase64(55);
    $this->_exec("echo 'PANTHEON_ENVIRONMENT=local
DRUPAL_HASH_SALT=$hash
AMP_UID=$uid
GITHUB_TOKEN=$token'>.env");

    $this->say("❗️ Environment vars setup, now starting DDEV. ❗️");
    $this->_exec("ddev start");

    // Setup GitHub auth in DDEV
    $this->_exec("echo \"$token\" | ddev exec gh auth login --with-token");
    $this->_exec("ddev exec composer config --global github-protocols https");
    $this->_exec("ddev exec composer config -g github-oauth.github.com $token");

    // Download database if needed
    if (!file_exists($db_backup)) {
      $this->_exec("mkdir backups");
      $this->_exec("ddev exec vendor/bin/robo gh:pulldb");
    }

    // Download files (always get fresh files for setup)
    $this->say("Downloading files from backup...");
    $this->_exec("ddev exec vendor/bin/robo gh:pullfiles");

    // Import database and deploy
    $this->_exec("ddev exec vendor/bin/robo did");
    $this->_exec("ddev exec drush deploy");

    $this->say("✅ DDEV setup complete! ✅");
  }

  /**
   * Run security updates.
   *
   * @command su
   * @description Grab security updates and send to GitHub composer action.
   */
  public function su() {
    $security_updates = shell_exec("composer audit --format=json --no-dev");
    $security_updates = json_decode($security_updates, TRUE);
    $security_updates = $security_updates['advisories'];
    if (empty($security_updates)) {
      $this->say("No security updates found.");
      return;
    }
    foreach ($security_updates as $value) {
      $name = $value[0]['packageName'];
      $this->say("Sending update to GitHub composer action for $name");
      $this->_exec("gh workflow run updates.yml --ref main --repo github.com/necyberteam/cyberteam_drupal -f drupal_update=$name");
    }
  }


  /**
   * Config export.
   *
   * @command cex
   * @description Export config files and checkout deleted files.
   */
  public function cex() {
    $is_ddev = file_exists('/.ddev') || getenv('DDEV_PROJECT') || file_exists('/var/www/html/.ddev');
    $cmd_prefix = $is_ddev ? "" : "ddev ";
    $this->_exec($cmd_prefix . "drush cex -y");
    // Checkout deleted files.
    $this->_exec("git ls-files -z -d | xargs -0 git checkout --");
  }

  /**
   * Create Snapshot.
   *
   * @command snap:create
   * @description Create snapshot of current db.
   */
  public function snapC() {
    if (!file_exists('backups/snapshots')) {
      $this->_exec("mkdir -p backups/snapshots");
    }
    $date = date('Ymd-His');
    $branch = shell_exec("git rev-parse --abbrev-ref HEAD");
    // Remove extra return from $branch.
    $branch = trim(preg_replace('/\s+/', ' ', $branch));
    $snap_name = $this->ask("What is the Snapshots name?");
    $this->say("❗️ Creating snapshot $snap_name. ❗️");
    $snap_name = strtolower($snap_name);
    $snap_name = preg_replace('/[^A-Za-z0-9\-]/', '-', $snap_name);
    $is_ddev = file_exists('/.ddev') || getenv('DDEV_PROJECT') || file_exists('/var/www/html/.ddev');
    if ($is_ddev) {
      $this->_exec("drush sql-dump --result-file=backups/snapshots/" . $date . "_" . $branch . "_" . $snap_name . ".sql.gz");
    } else {
      $this->_exec("ddev export-db --file=backups/snapshots/" . $date . "_" . $branch . "_" . $snap_name . ".sql");
    }
  }

  /**
   * Restore Snapshot.
   *
   * @command snap:restore
   * @description Restore a snapshot.
   */
  public function snapR() {
    $snap_name = shell_exec("ls -1 backups/snapshots | grep sql | sed 's/.sql\.gz//g' | sort -r ");
    $snap_name = explode("\n", $snap_name);
    array_pop($snap_name);
    $snap_option = '';
    foreach ($snap_name as $key => $snap) {
      $snap_name[$key] = explode("_", $snap);
      $snap_option .= $key . " - Branch: " . $snap_name[$key][1] . " Name: " . $snap_name[$key][2] . "\n";
    }
    $snap_selected = $this->ask("Which Snapshots would you like to restore? \n" . $snap_option);
    $snap_deploy = $this->ask("Would you like to run deploy? (Y/n)");
    $this->_exec("git checkout " . $snap_name[$snap_selected][1]);
    $this->say("Restored Branch: " . $snap_name[$snap_selected][1]);
    $is_ddev = file_exists('/.ddev') || getenv('DDEV_PROJECT') || file_exists('/var/www/html/.ddev');
    $cmd_prefix = $is_ddev ? "" : "ddev ";

    $this->_exec($cmd_prefix . "composer install");
    if ($is_ddev) {
      $this->_exec("drush sql-drop -y && gunzip -c backups/snapshots/" . $snap_name[$snap_selected][0] . "_" . $snap_name[$snap_selected][1] . "_" . $snap_name[$snap_selected][2] . ".sql.gz | drush sqlc");
    } else {
      $this->_exec("ddev import-db --file=backups/snapshots/" . $snap_name[$snap_selected][0] . "_" . $snap_name[$snap_selected][1] . "_" . $snap_name[$snap_selected][2] . ".sql.gz");
    }
    $this->say("Restored Snapshot: " . $snap_name[$snap_selected][2]);
    if ($snap_deploy != 'n') {
      $this->_exec($cmd_prefix . "drush deploy");
    }
  }

  /**
   * Update ran in github actions.
   *
   * @command ciupdate
   * @description Updates through CI.
   */
  public function ciupdate(array $args) {
    $module = array_key_exists(0, $args) ? $args[0] : '';
    $version = array_key_exists(1, $args) ? $args[1] : '';

    $this->_exec("touch log.txt");
    if ($module == 'drupal/core') {
      $this->say("Updating Drupal core");
      $this->_exec("composer update drupal/core-recommended drupal/core-composer-scaffold drupal/core-dev --ignore-platform-reqs -W >log.txt 2>&1");
      $this->composer_updates('/Upgrading (drupal)\/core \((.* \=\> .*)\)$/mU', TRUE);
    }
    elseif (!empty($module)) {
      echo $version;
      if (!empty($version)) {
        $this->say("Updating $module to $version");
        $this->_exec("composer require $module $version -W --no-scripts --ignore-platform-reqs >log.txt 2>&1");
      }
      else {
        $this->say("Updating $module minor release");
        $this->_exec("composer update $module --no-scripts --ignore-platform-reqs >log.txt 2>&1");
      }
      $this->composer_updates('/Upgrading .*\/(.*)\((.* \=\> .*)\)$/m', TRUE);
    }
  }

  /**
   * Composer updates.
   */
  private function composer_updates($regex, $ci = FALSE) {
    $log = file_get_contents("log.txt");
    $log = preg_match_all($regex, $log, $update_matches);
    $this->say("-=-=-=-=-Log Message=-=-===-\n$log");
    $update_list = '';
    foreach ($update_matches[1] as $key => $update_match) {
      $seperator = $key > 0 ? ' — ' : '';
      $version = $update_matches[2][$key];
      $update_list .= "$seperator$update_match: $version";
    }
    if ($ci) {
      $this->say("Skipping updates");
    }
    else {
      $is_ddev = file_exists('/.ddev') || getenv('DDEV_PROJECT') || file_exists('/var/www/html/.ddev');
      $cmd_prefix = $is_ddev ? "" : "ddev ";
      $this->_exec($cmd_prefix . "drush updatedb -y");
      $this->_exec($cmd_prefix . "drush cr");
    }
    if ($log > 0) {
      $this->say("\n The following updated:
        $update_list");
      if (!$ci) {
        $cypress = $this->ask("Run Cypress tests now (Y/n)");
      }
      else {
        $cypress = 'no';
        $this->_exec("git add composer.*");
        $this->_exec("git commit -m\"$update_list\"");
      }
      if ($cypress == 'y' || $cypress == 'Y' || $cypress == '') {
        $this->_exec("robo cypress");
        if (!$ci) {
          $commit = $this->ask("Commit with the following message?
            $update_list (Y/n)");
        }
        else {
          $commit = 'y';
        }
        if ($commit == 'y' || $commit == 'Y' || $commit == '') {
          $this->_exec("git add composer.*");
          $this->_exec("git commit -m\"$update_list\"");
        }
      }
    }
    else {
      $log = file_get_contents("log.txt");
      $this->say("\n $log
        This update may have failed, try running:
        composer why-not drupal/module_name \n");
    }
    $this->_exec("rm log.txt");
  }


  /**
   * Drush Deploy.
   *
   * @command deploy
   * @description Drush deploy and then set domain.
   */
  public function deploy(array $args) {
    $domain_id = implode($args);
    if (!is_numeric($domain_id)) {
      $domain_id = '';
    }
    $is_ddev = file_exists('/.ddev') || getenv('DDEV_PROJECT') || file_exists('/var/www/html/.ddev');
    $cmd_prefix = $is_ddev ? "" : "ddev ";
    $this->_exec($cmd_prefix . "drush deploy -y");
    $this->_exec("robo ds $domain_id");
  }

  /**
   * Run cypress tests.
   *
   * @command cypress
   * @description Run Cypress.
   */
  public function cypress(array $args) {
    $site = array_key_exists(0, $args) ? $args[0] : 'accessmatch1';
    $update = array_key_exists(1, $args) ? $args[1] : 0;

    $domain = preg_replace('/[0-9]+/', '', $site);

    if ($update == 1) {
      $is_ddev = file_exists('/.ddev') || getenv('DDEV_PROJECT') || file_exists('/var/www/html/.ddev');
      $cmd_prefix = $is_ddev ? "" : "ddev ";
      $this->_exec($cmd_prefix . 'drush updatedb -y');
      $this->_exec($cmd_prefix . 'drush cr');
    }

    // Detect if we're running inside DDEV container or on host
    $is_ddev = file_exists('/.ddev') || getenv('DDEV_PROJECT') || file_exists('/var/www/html/.ddev');

    if ($is_ddev) {
      // Running inside DDEV container - delegate to host
      $this->say("Running Cypress tests from host machine...");
      $this->_exec('vendor/bin/robo cypress ' . implode(' ', $args));
      return;
    }

    // Running on host - proceed with Cypress setup
    $this->say("Setting up Cypress dependencies on host...");
    $this->_exec('cd tests/cypress && npm ci');

    $error = FALSE;

    if (!file_exists('/tmp/screenshots')) {
      $this->_exec('mkdir -p /tmp/screenshots');
    }

    if ($site == 'accessmatch3') {
      $sub_dirs = [
        'events',
        'knowledge-base',
        'knowledge-base-resources',
        'x-api',
        'qa-bot',
      ];

      foreach ($sub_dirs as $dir) {
        $results = $this->_exec('cd tests/cypress && npx cypress run --config baseUrl=https://' . $domain . '.ddev.site --spec "cypress/e2e/' . $site . '/' . $dir . '/*.js"');

        if ($results->wasSuccessful() == FALSE) {
          $error = TRUE;
          $this->_exec('cp -r tests/cypress/cypress/screenshots/* /tmp/screenshots/');
        }
      }
    } else {
      $results = $this->_exec('cd tests/cypress && npx cypress run --config baseUrl=https://' . $domain . '.ddev.site --spec "cypress/e2e/' . $site . '/**/*.js"');

      if ($results->wasSuccessful() == FALSE) {
        $error = TRUE;
      }
    }

    if ($error) {
      $this->say("❗ Cypress tests failed. ❗");
      $this->_exec('cp -r /tmp/screenshots/* tests/cypress/cypress/screenshots/ && rm -rf /tmp/screenshots');
      throw new \Exception('Cypress tests failed');
    }
    else {
      $this->say("✅ Cypress tests passed. ✅");
    }
  }

  /**
   * Check for cypress error.
   */
  private function cypress_error($process, $pipes) {
    $error = FALSE;

    // Read the output from the command in real-time.
    while ($line = fgets($pipes[1])) {
      echo $line;
      $pattern = "/failed/i";
      if (preg_match($pattern, $line)) {
        // Close the pipes and the process.
        fclose($pipes[0]);
        fclose($pipes[1]);
        fclose($pipes[2]);
        proc_close($process);
        $error = TRUE;
      }
    }

    // Close the pipes and the process.
    fclose($pipes[0]);
    fclose($pipes[1]);
    fclose($pipes[2]);
    proc_close($process);


    return $error;
  }

  /**
   * Domain Switch.
   *
   * @command domain-switch
   * @command ds
   * @description Set domain for site.
   */
  public function ds(array $args) {
    $domain_id = implode($args);
    if (!is_numeric($domain_id)) {
      $domain_id = '';
    }
    $is_ddev = file_exists('/.ddev') || getenv('DDEV_PROJECT') || file_exists('/var/www/html/.ddev');
    $cmd_prefix = $is_ddev ? "" : "ddev ";
    if (!file_exists('robo/assets/domains.json')) {
      $this->_exec("touch robo/assets/domains.json");
      $this->_exec($cmd_prefix . "drush domain:list --format=json > robo/assets/domains.json");
    }
    else {
      $domain_get = file_get_contents('robo/assets/domains.json');
      $this->say("-=-=-=-=-Domain list coming from robo/assets/domains.json=-=-===-\n");
    }
    $domains = json_decode($domain_get, TRUE);
    if (empty($domain_id)) {
      foreach ($domains as $key => $domain) {
        $this->say("$key - " . $domain['id']);
      }
      $domain_id = $this->ask("Enter domain id to set as default");
    }
    $default_domain = $domains[$domain_id]['id'];
    $this->_exec($cmd_prefix . "drush domain:default $default_domain");
    $this->_exec($cmd_prefix . "drush cr");
    $this->say("Setting $default_domain as default");
    $this->_exec($cmd_prefix . "drush cr");
  }

  /**
   * MD Commands.
   *
   * @command mds
   * @description Setup commands for md branch.
   */
  public function mds() {
    $branch = shell_exec("git rev-parse --abbrev-ref HEAD");
    $is_ddev = file_exists('/.ddev') || getenv('DDEV_PROJECT') || file_exists('/var/www/html/.ddev');
    $cmd_prefix = $is_ddev ? "" : "ddev ";
    if (!file_exists('robo/assets/md/domains.json')) {
      $domain_get = shell_exec($cmd_prefix . "drush domain:list --format=json");
      $this->_exec("touch robo/assets/md/domains.json");
      $this->_exec("echo $domain_get>>robo/assets/md/domains.json");
    }
    else {
      $domain_get = file_get_contents('robo/assets/md/domains.json');
      $this->say("-=-=-=-=-Domain list coming from robo/assets/md/domains.json=-=-===-\n");
    }
    $domains = json_decode($domain_get, TRUE);
    foreach ($domains as $key => $domain) {
      $this->say("$key - " . $domain['id']);
    }
    $domain_id = $this->ask("Which domain should be the default?");
    $default_domain = $domains[$domain_id]['id'];
    $this->_exec("touch robo/assets/md/$branch");
    $this->_exec("echo '$default_domain'>>robo/assets/md/$branch");
  }

  /**
   * Checkout branch.
   *
   * @command checkout
   * @description Checkout branch and run commands to load properly.
   */
  public function checkout(array $args) {
    $branch = $args[0] ?? '';
    $domain = $args[1] ?? 0;
    if (empty($branch)) {
      $branch = $this->ask("Which branch should be checked out?");
    }
    $this->_exec("git checkout $branch");
    $this->_exec("git pull origin $branch");
    $is_ddev = file_exists('/.ddev') || getenv('DDEV_PROJECT') || file_exists('/var/www/html/.ddev');
    $cmd_prefix = $is_ddev ? "" : "ddev ";
    $this->_exec($cmd_prefix . "composer install");
    $this->_exec($cmd_prefix . "drush deploy");
    if ($domain !== 0) {
      $this->_exec($cmd_prefix . "robo ds $domain");
    }
    $this->uli();
  }

}
