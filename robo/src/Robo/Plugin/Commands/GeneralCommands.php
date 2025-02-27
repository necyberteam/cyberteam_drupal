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
    $config_sync = array_key_exists(0, $args) ? $args[0] : 1;
    $login = array_key_exists(1, $args) ? $args[1] : 1;

    $this->_exec("lando db-import backups/site.sql.gz");

    if ($config_sync) {
      $this->_exec("lando drush cr");
      $this->_exec("lando drush deploy -y");
      $this->_exec("lando drush cim -y");
    }

    $this->_exec("lando robo uli");
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
    $this->_exec("cp blt/lando.local.settings.php web/sites/default/settings/local.settings.php");
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
    $this->_exec("blt amp:loadtoken");
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
        $this->_exec("composer require $module $version --no-scripts --ignore-platform-reqs >log.txt 2>&1");
      }
      else {
        $this->say("Updating $module minor release");
        $this->_exec("composer update $module --no-scripts --ignore-platform-reqs >log.txt 2>&1");
      }
      $this->composer_updates('/Upgrading .*\/(.*)\((.* \=\> .*)\)$/m', TRUE);
    }
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
   * @alias ds
   * @description Set domain for site.
   */
  public function ds(array $args) {
    $domain_id = implode($args);
    if (!is_numeric($domain_id)) {
      $domain_id = '';
    }
    $lando = $this->lando();
    if (!file_exists('robo/assets/domains.json')) {
      $domain_get = shell_exec("$lando drush domain:list --format=json");
      $this->_exec("touch robo/assets/domains.json");
      $this->_exec("echo '$domain_get' >> robo/assets/domains.json");
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

  /**
   * Create github pull request.
   *
   * @command github-pullrequest
   * @alias ghpr
   * @description Create a pull request.
   */
  public function ghpr() {
    $branch = shell_exec("git rev-parse --abbrev-ref HEAD");
    $branch = substr($branch, 3);
    $ask_description = $this->ask("Describe context / purpose for this PR");
    $template = "## Describe context / purpose for this PR
$ask_description
## Issue link
https://cyberteamportal.atlassian.net/browse/D8-$branch
## Any other related PRs?
-
## Link to MultiDev instance
http://md-$branch-accessmatch.pantheonsite.io

## Checklist for PR author
- [ ] I have checked that the PR is ready to be merged
- [ ] I have reviewed the DIFF and checked that the changes are as expected
- [ ] I have assigned myself or someone else to review the PR";
    $this->_exec("gh pr create --title 'D8-$branch' --body '$template'");
  }

}
