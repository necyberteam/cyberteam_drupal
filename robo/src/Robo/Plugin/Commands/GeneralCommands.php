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
   * Command prefix.
   */
  private function lando() {
    $lando = "lando ";
    if (getcwd() == '/app') {
      $lando = "";
    }
    return $lando;
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
    if ($this->lando() == 'lando ') {
      $this->_exec("lando db-import backups/site.sql.gz");
    }
    else {
      $this->_exec("drush sql-drop -y &&
        cp backups/site.sql.gz lando-import.sql.gz &&
        gunzip lando-import.sql.gz &&
        drush sqlc < lando-import.sql &&
        rm -fR lando-import.sql
      ");
    }
    $this->_exec("sleep 2");
    $this->_exec($this->lando() . "composer install");
    $this->_exec($this->lando() . "drush deploy -y");
    $this->_exec("sleep 2");
    $this->_exec($this->lando() . "drush cim -y");
    $this->_exec("sleep 2");
    if (!empty($domain_id)) {
      $this->_exec($this->lando() . "robo ds $domain_id");
    }
    else {
      $this->_exec("sleep 2");
      $this->_exec($this->lando() . "drush cr");
    }
    $this->_exec($this->lando() . "robo uli");
  }

  /**
   * Login with username.
   *
   * @command uli
   * @description Login locally with personal username set in github.
   */
  public function uli() {
    if ($this->lando() == '') {
      $uid = $_ENV["AMP_UID"];
      $this->_exec("drush uli --uid='$uid'");
    }
    else {
      $this->_exec("lando robo uli");
    }
  }

  /**
   * Reload site with prod db.
   *
   * @command landosetup
   * @description pull in production database.
   */
  public function landosetup(array $args) {
    if ($args) {
      $token = $args[0];
      $uid = $args[1];
    }
    else {
      $token = $this->ask("What is your GitHub token: ");
      $uid = $this->ask("What is your drupal user id: ");
    }
    // Note to self: Can't place composer install in here because
    // it needs to run before you can run this command.
    $files = 'web/sites/default/files';
    $db_backup = 'backups';
    $theme_node = 'web/themes/custom/accesstheme/node_modules';
    $this->_exec("ln -s web docroot");
    $this->_exec("mkdir -p web/sites/default/settings");
    $this->_exec("cp robo/assets/lando.local.settings.php web/sites/default/settings/local.settings.php");
    $hash = Crypt::randomBytesBase64(55);
    $this->_exec("echo 'PANTHEON_ENVIRONMENT=local
DRUPAL_HASH_SALT=$hash
AMP_UID=$uid
GITHUB_TOKEN=$token'>.env");
    $this->say("❗️ Environment vars setup, now starting lando. ❗️");
    $this->_exec($this->lando() . " start");
    $this->_exec($this->lando() . " composer config --global github-protocols https");
    $this->_exec($this->lando() . " composer config -g github-oauth.github.com $token");
    if (!file_exists($db_backup)) {
      $this->_exec("mkdir backups");
      $this->_exec($this->lando() . " robo gh:pulldb");
    }
    if (!file_exists($files)) {
      $this->_exec($this->lando() . " robo gh:pullfiles");
    }
    $this->_exec($this->lando() . " robo did");
    $this->_exec($this->lando() . " drush deploy");
    if (!file_exists($theme_node)) {
      $this->_exec("cd web/themes/custom/accesstheme && " . $this->lando() . " npm install && " . $this->lando() . " npm run build:sass");
    }
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
   * Start lando.
   *
   * @command start
   * @description Start lando in a codespace.
   */
  public function start() {
    $this->_exec("lando start");
    $this->_exec("robo loadtoken");
  }

  /**
   * Load Token.
   *
   * @command loadtoken
   * @description load GITHUB_TOKEN to composer.
   */
  public function loadToken() {
    if (getenv('GITHUB_TOKEN')) {
      $this->say("❗️ Setting GITHUB_TOKEN token. ❗️");
      $this->_exec("composer config -g github-oauth.github.com $(printenv GITHUB_TOKEN)");
      $this->_exec($this->lando() . " composer config -g github-oauth.github.com $(printenv GITHUB_TOKEN)");
    }
    else {
      $this->say("❗️ GITHUB_TOKEN not set. ❗️");
    }
  }

  /**
   * Config export.
   *
   * @command cex
   * @description Export config files and checkout deleted files.
   */
  public function cex() {
    $this->_exec($this->lando() . "drush cex -y");
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
    $this->_exec($this->lando() . "db-export backups/snapshots/" . $date . "_" . $branch . "_" . $snap_name . ".sql");
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
    $this->_exec($this->lando() . "composer install");
    $this->_exec($this->lando() . "db-import backups/snapshots/" . $snap_name[$snap_selected][0] . "_" . $snap_name[$snap_selected][1] . "_" . $snap_name[$snap_selected][2] . ".sql.gz");
    $this->say("Restored Snapshot: " . $snap_name[$snap_selected][2]);
    if ($snap_deploy != 'n') {
      $this->_exec($this->lando() . "drush deploy");
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
      $this->_exec("lando drush updatedb -y");
      $this->_exec("lando drush cr");
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
        $this->_exec("lando robo cypress");
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
    $this->_exec($this->lando() . "drush deploy -y");
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
      $this->_exec($this->lando() . 'drush updatedb -y');
      $this->_exec($this->lando() . 'drush cr');
    }

    $error = FALSE;

    if (!file_exists('/tmp/screenshots')) {
      $this->_exec('mkdir /tmp/screenshots');
    }

    if ($site == 'accessmatch3') {
      $sub_dirs = [
        'events',
        'knowledge-base',
        'knowledge-base-resources',
        'api',
      ];

      foreach ($sub_dirs as $dir) {
        $results = $this->_exec('cd tests/cypress && ' . $this->lando() . 'cypress run --config baseUrl=https://' . $domain . '-local.cnctci.lndo.site --spec "cypress/e2e/' . $site . '/' . $dir . '/*.js"');

        if ($results->wasSuccessful() == FALSE) {
          $error = TRUE;
          $this->_exec('cp -r tests/cypress/cypress/screenshots/* /tmp/screenshots/');
        }
      }
    } else {
      $results = $this->_exec('cd tests/cypress && ' . $this->lando() . 'cypress run --config baseUrl=https://' . $domain . '-local.cnctci.lndo.site --spec "cypress/e2e/' . $site . '/**/*.js"');

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
    $lando = $this->lando();
    if (!file_exists('robo/assets/domains.json')) {
      $this->_exec("touch robo/assets/domains.json");
      $this->_exec("$lando drush domain:list --format=json > robo/assets/domains.json");
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
    $this->_exec("$lando drush domain:default $default_domain");
    $this->_exec("$lando drush cr");
    $this->say("Setting $default_domain as default");
    $this->_exec("$lando drush cr");
  }

  /**
   * MD Commands.
   *
   * @command mds
   * @description Setup commands for md branch.
   */
  public function mds() {
    $branch = shell_exec("git rev-parse --abbrev-ref HEAD");
    if (!file_exists('robo/assets/md/domains.json')) {
      $domain_get = shell_exec($this->lando() . " drush domain:list --format=json");
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
    $this->_exec($this->lando() . "composer install");
    $this->_exec($this->lando() . "drush deploy");
    if ($domain !== 0) {
      $this->_exec($this->lando() . "robo ds $domain");
    }
    $this->_exec($this->lando() . "robo uli");
  }

}
