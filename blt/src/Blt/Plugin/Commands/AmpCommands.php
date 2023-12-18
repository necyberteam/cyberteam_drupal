<?php

namespace Example\Blt\Plugin\Commands;

use Acquia\Blt\Robo\BltTasks;
use Drupal\Component\Utility\Crypt;
use Drupal\Component\Utility\Xss;

/**
 * Defines commands in the "amp" namespace.
 */
class AmpCommands extends BltTasks {

  /**
   * Reload site with prod db.
   *
   * @command amp:landosetup
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
    $this->_exec("lando blt blt:telemetry:disable --no-interaction");
    $this->_exec("lando start");
    $this->_exec("lando blt blt:telemetry:disable --no-interaction");
    $this->_exec("lando composer config --global github-protocols https");
    $this->_exec("lando xdebug-off");
    $this->_exec("lando composer config -g github-oauth.github.com $token");
    if (!file_exists($db_backup)) {
      $this->_exec("mkdir backups");
      $this->_exec("lando blt gh:pulldb");
    }
    if (!file_exists($files)) {
      $this->_exec("lando blt gh:pullfiles");
    }
    $this->_exec("lando blt amp:did");
    $this->_exec("lando drush deploy");
    if (!file_exists($theme_node)) {
      $this->_exec("cd web/themes/custom/accesstheme && lando npm install && lando npm run build:sass");
    }
  }

  /**
   * Start lando.
   *
   * @command amp:start
   * @description Start lando and set GITHUB_TOKEN.
   */
  public function start() {
    $this->_exec("lando start");
    $this->_exec("blt amp:loadtoken");
  }

  /**
   * Config export.
   *
   * @command amp:cex
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
   * @command amp:snap:create
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
   * @command amp:snap:restore
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
   * Load Token.
   *
   * @command amp:loadtoken
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
   * Run behat.
   *
   * @command amp:behat
   * @description Run behat.
   */
  public function behat(array $args) {
    // Set php max_execution_time to 1 hour.
    ini_set('max_execution_time', 3600);

    $this->say("------------------ BEHAT TESTING ------------------------");

    // To make testing faster, skip the drush commands (useful during development)
    // to enable this, in the shell, do "export BEHAT_NO_DRUSH=true"
    // to disable this, in the shell, do "export BEHAT_NO_DRUSH=false"
    // or put "no-drush" as an argument on commandline.
    $no_drush_cmds = array_search("no-drush", $args);
    if ($no_drush_cmds !== FALSE) {
      // Remove this argument from the args array because $args is used
      // below to contain a list of domains to test, or to test all
      // domains if args is empty.
      array_splice($args, $no_drush_cmds, 1);
      $no_drush_cmds = TRUE;
    }
    $no_drush_cmds |= strcasecmp(getenv("BEHAT_NO_DRUSH"), 'TRUE') == 0;
    if ($no_drush_cmds) {
      $this->say("NOTE: drush commands being skipped.");
    }

    // Set following to true to see a dry-run of this script,
    // with no actual copying or running of tests
    // or put "dry-run" as an argument on commandline.
    $dry_run = array_search("dry-run", $args);
    if ($dry_run !== FALSE) {
      // Remove this argument from the args array because $args is used
      // below to contain a list of domains to test, or to test all
      // domains if args is empty.
      array_splice($args, $dry_run, 1);
      $dry_run = TRUE;
    }
    if ($dry_run) {
      $this->say("NOTE: dry-run -- nothing actually being executed.");
    }

    // Special handling for the 'wip_template' directory -- we want to run
    // all the tests in this directory on all the domains but save time by
    // not copying & running all the tests in the templates directory.
    $wip_template = FALSE;

    if ($args) {
      $domains = $args;
      $wip_template = array_search('wip_template', $args) !== FALSE;
    }

    if (!$args || $wip_template) {
      // Make copies of the tests to these domains:  ky, gp, careers, nect.
      $domains = [
        // These domains are sufficiently different that the template tests
        // should *not* be copied to them.
        'cci',
        'asp',
        'champ',
        'coco',
        // 'rmacc',  // no such testing folder
        'usrse',
        // These domains get all the templated tests copied to them.
        'careers',
        'gpc',
        'ky',
        'nect',
      ];
    }

    // If domain is one of the following, don't copy the templates.
    $exceptions_to_template_copies = [
      'templates',
      'wip',
      'Jasper',
      'Hannah',
      'Mackenzie',
      'asp',
      'cci',
      'champ',
      'coco',
      // 'rmacc',  // no such testing folder
      'usrse',
    ];

    $copy_from = $wip_template ? "wip_template" : "templates";

    $lando = $this->lando() == 'lando ' ? "lando ssh -c \"(" : "(";
    $lando_end = $this->lando() == 'lando ' ? "\"" : "";

    foreach ($domains as $domain) {
      // Git add current features - this is due to the copy of the tests that
      // happens below.  the copies are removed by the subsequent 'git clean'.
      if (!$dry_run) {
        $this->_exec('git add tests/behat/features/');
      }

      // Copy all tests in templates to each domain
      // also use sed to replace the @templates tag with @<domain>
      // OR, if $wip_template is true, copy from the wip_template directory instead of the templates directory
      // but don't copy template tests to domains on the exceptions list.
      $copy_templates = !in_array($domain, $exceptions_to_template_copies);

      // It is sometimes useful to turn the following off, to
      // allow much more rapid testing of specific tests
      //
      // $copy_templates = false;.
      $this->say("  Testing domain $domain");
      $this->say($copy_templates
        ? "  copying templates from directory $copy_from"
        : "  *not* copying any templates");

      if ($copy_templates) {
        $cmd = "cp -r tests/behat/features/$copy_from tests/behat/features/$domain/ && find tests/behat/features/$domain -type f -name \"*.feature\" -exec sed -i '1 s/@templates/@$domain/g' {} \;";
        if ($dry_run) {
          $this->say('    dry-run: ' . $cmd);
        }
        else {
          $behat = shell_exec($cmd);
        }
      }
      $shell_cmd = $lando . '\'google-chrome\' --headless --no-sandbox --disable-dev-shm-usage --disable-web-security --remote-debugging-port=9222 --window-size=1440,1080 &) | behat --format pretty /app/tests/behat --colors --no-interaction --stop-on-failure --config /app/tests/behat/local.yml --profile local --tags @' . $domain . ' -v 2>&1' . $lando_end;

      if ($dry_run) {
        $this->say("    dry-run: $shell_cmd");
        $behat = '';
      }
      else {
        $this->say("    running: $shell_cmd");
        $this->say("------------------ start of $domain test results ------------------");
        // Open a pipe to the command and capture its output.
        $descriptorspec = [
          // Stdin.
          0 => ["pipe", "r"],
          // Stdout.
          1 => ["pipe", "w"],
          // Stderr.
          2 => ["pipe", "w"],
        ];
        $process = proc_open($shell_cmd, $descriptorspec, $pipes);

        // Read the output from the command in real-time.
        while ($line = fgets($pipes[1])) {
          echo $line;
          $pattern = "/Failed scenarios/i";
          if (preg_match($pattern, $line)) {
            // Close the pipes and the process.
            fclose($pipes[0]);
            fclose($pipes[1]);
            fclose($pipes[2]);
            proc_close($process);
            $this->_exec('git clean -f tests/behat/features/');
            throw new \Exception('Failed behat tests');
          }
        }

        // Close the pipes and the process.
        fclose($pipes[0]);
        fclose($pipes[1]);
        fclose($pipes[2]);
        $return_value = proc_close($process);
        $this->say("------------------ end of $domain test, return_value = $return_value ------------------");
      }

      if (!$no_drush_cmds) {
        $this->_exec($this->lando() . 'drush cim -y');
        $this->_exec($this->lando() . 'drush cr');
      }

      if (!$dry_run) {
        $this->_exec('git clean -f tests/behat/features/');
      }

      if ($return_value !== 0) {
        $this->yell('*** behat tests finished with return value = ' . $return_value);
      }
    }
  }

  /**
   * Get behat definition list.
   *
   * @command amp:behat:dl
   * @description Run behat.
   */
  public function behat_dl() {
    $lando = $this->lando() == 'lando ' ? "lando ssh -c \"(" : "(";
    $lando_end = $this->lando() == 'lando ' ? "\"" : "";
    $this->_exec($lando . '\'google-chrome\' --headless --no-sandbox --disable-dev-shm-usage --disable-web-security --remote-debugging-port=9222 &) | behat -dl  /app/tests/behat --config /app/tests/behat/local.yml --profile local' . $lando_end);
  }

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
   * Login with user id.
   *
   * @command amp:uli
   * @description Login locally with personal user id set in github.
   */
  public function uli() {
    if ($this->lando() == 'lando ') {
      $this->_exec("export $(lando ssh -s appserver -c env | grep AMP_UID)");
    }
    $uid = Xss::filter(shell_exec("printenv AMP_UID"));
    $this->_exec($this->lando() . "drush uli --uid=$uid");
    $this->_exec($this->lando() . "drush cr");
  }

  /**
   * Reload site with prod db.
   *
   * @command amp:did
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
        gunzip lando-import.sql.gz
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
      $this->_exec($this->lando() . "blt amp:ds $domain_id");
    }
    else {
      $this->_exec("sleep 2");
      $this->_exec($this->lando() . "drush cr");
    }
    $this->_exec($this->lando() . "blt amp:uli");
  }

  /**
   * Update ran in github actions.
   *
   * @command amp:ciupdate
   * @description Updates through CI.
   */
  public function ciupdate(array $args) {
    $arrrrgs = implode($args);

    $this->_exec("touch log.txt");
    if ($arrrrgs == 'drupal/core') {
      $this->_exec("composer update drupal/core drupal/core-composer-scaffold drupal/core-dev drupal/core-recommended drupal/core-project-message -W --ignore-platform-req=ext-gd >log.txt 2>&1");
      $this->composer_updates('/Upgrading (drupal)\/core \((.* \=\> .*)\)$/mU');
    }
    elseif (!empty($arrrrgs)) {
      $this->_exec("composer update $arrrrgs --no-scripts --ignore-platform-req=ext-gd >log.txt 2>&1");
      $this->_exec("cat log.txt");
      $this->composer_updates('/Upgrading .*\/(.*)\((.* \=\> .*)\)$/m');
    }
  }

  /**
   * Run composer updates.
   */
  private function composer_updates($regex) {
    $log = file_get_contents("log.txt");
    $log = preg_match_all($regex, $log, $update_matches);
    $this->say("-=-=-=-=-Log Message=-=-===-\n$log");
    $update_list = '';
    foreach ($update_matches[1] as $key => $update_match) {
      $seperator = $key > 0 ? ' — ' : '';
      $version = $update_matches[2][$key];
      $update_list .= "$seperator$update_match: $version";
    }
    // $this->_exec("lando drush updatedb -y");
    // $this->_exec("lando drush cr");
    if ($log > 0) {
      $this->say("\n The following updated:
$update_list");
      $this->_exec("git add composer.*");
      $this->_exec("git commit -m\"$update_list\"");
      $this->_exec("rm log.txt");
    }
  }

  /**
   * Drush Deploy.
   *
   * @command amp:deploy
   * @description Drush deploy and then set domain.
   */
  public function deploy(array $args) {
    $domain_id = implode($args);
    if (!is_numeric($domain_id)) {
      $domain_id = '';
    }
    $this->_exec($this->lando() . "drush deploy -y");
    $this->_exec("blt amp:ds $domain_id");
  }

  /**
   * Domain Switch.
   *
   * @command amp:ds
   * @description Set domain for site.
   */
  public function ds(array $args) {
    $domain_id = implode($args);
    if (!is_numeric($domain_id)) {
      $domain_id = '';
    }
    $lando = $this->lando();
    if (!file_exists('blt/md/domains.json')) {
      $domain_get = shell_exec("$lando drush domain:list --format=json");
      $this->_exec("touch blt/md/domains.json");
      $this->_exec("echo $domain_get>>blt/md/domains.json");
    }
    else {
      $domain_get = file_get_contents('blt/md/domains.json');
      $this->say("-=-=-=-=-Domain list coming from blt/md/domains.json=-=-===-\n");
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
   * @command amp:mds
   * @description Setup commands for md branch.
   */
  public function mds() {
    $branch = shell_exec("git rev-parse --abbrev-ref HEAD");
    if (!file_exists('blt/md/domains.json')) {
      $domain_get = shell_exec($this->lando() . " drush domain:list --format=json");
      $this->_exec("touch blt/md/domains.json");
      $this->_exec("echo $domain_get>>blt/md/domains.json");
    }
    else {
      $domain_get = file_get_contents('blt/md/domains.json');
      $this->say("-=-=-=-=-Domain list coming from blt/md/domains.json=-=-===-\n");
    }
    $domains = json_decode($domain_get, TRUE);
    foreach ($domains as $key => $domain) {
      $this->say("$key - " . $domain['id']);
    }
    $domain_id = $this->ask("Which domain should be the default?");
    $default_domain = $domains[$domain_id]['id'];
    $this->_exec("touch blt/md/$branch");
    $this->_exec("echo '$default_domain'>>blt/md/$branch");
  }

  /**
   * Checkout branch.
   *
   * @command amp:checkout
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
      $this->_exec($this->lando() . "blt amp:ds $domain");
    }
    $this->_exec($this->lando() . "blt amp:uli");
  }

}
