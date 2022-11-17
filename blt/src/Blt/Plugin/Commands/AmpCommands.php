<?php

namespace Example\Blt\Plugin\Commands;

use Acquia\Blt\Robo\BltTasks;
use Symfony\Component\Console\Event\ConsoleCommandEvent;
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
    } else {
      $token = $this->ask("What is your GitHub token: ");
      $uid = $this->ask("What is your drupal user id: ");
    }
    $this->_exec("composer install --ignore-platform-reqs -n");
    $this->_exec("ln -s web docroot && mkdir backups");
    $this->_exec("mkdir -p web/sites/default/settings");
    $this->_exec("cp blt/lando.local.settings.php web/sites/default/settings/local.settings.php");
    $this->_exec("lando composer install --ignore-platform-reqs -n");
    $hash = \Drupal\Component\Utility\Crypt::randomBytesBase64(55);
    $this->_exec("echo 'PANTHEON_ENVIRONMENT=local
DRUPAL_HASH_SALT=$hash
AMP_UID=$uid
GITHUB_TOKEN=$token'>.env");
    $this->say("❗️ Environment vars setup, now starting lando. ❗️");
    $this->_exec("lando start");
    $this->_exec("lando blt blt:telemetry:disable --no-interaction");
    $this->_exec("lando xdebug-off");
    $this->_exec("lando blt gh:pulldb");
    $this->_exec("lando blt gh:pullfiles");
    $this->_exec("lando blt amp:did");
    $this->_exec("lando drush deploy");
    $this->_exec("cd web/themes/custom/accesstheme && lando npm install && lando npm run build:sass");
  }

  /**
   * Start lando.
   *
   * @command amp:start
   * @description Start lando.
   */
  public function start() {
    $this->_exec("lando start");
  }

  /**
   * Run behat.
   *
   * @command amp:behat
   * @description Run behat.
   */
  public function behat(array $args) {

    // set following to true to see a dry-run of this script,
    // with no actual copying or running of tests
    $dry_run = false;


    // to make testing faster, skip the drush commands (useful during development)
    // to enable this, in the shell, do "export BEHAT_NO_DRUSH=true"
    // to disable this, in the shell, do "export BEHAT_NO_DRUSH=false"
    $no_drush_cmds = strcasecmp(getenv("BEHAT_NO_DRUSH"), 'TRUE') == 0;

    // special handling for the 'wip_template' directory -- we want to run
    // all the tests in this directory on all the domains but save time by
    // not copying & running all the tests in the templates directory
    $wip_template = false;

    if ($args) {
      $domains = $args;
      $wip_template = $domains[0] == 'wip_template';
    }

    if (!$args || $wip_template) {
      // make copies of the tests to these domains:  ky, gp, careers, nect
      $domains = [
        'careers',
        'gpc',
        'ky',
        'nect',
        // these domains are sufficiently different that the template tests
        // should *not* be copied to them
        //'amp',
        //'coco',
        //'rmacc',
        //'usrse'
        //'cci',
        //'champ'
      ];
    }

    $copy_from = $wip_template ? "wip_template" : "templates";

    $this->say("------------------ BEHAT TESTING ------------------------");
    $this->say("Copying template tests to these domains:  " . implode(', ', $domains));

    if ($no_drush_cmds) {
      $this->say("NOTE: drush commands being skipped because env variable BEHAT_NO_DRUSH is true");
    }

    $lando = $this->lando() == 'lando '? "lando ssh -c \"(":"(";
    $lando_end = $this->lando() == 'lando '?"\"":"";

    foreach ($domains as $domain) {
      // git add current features - this is due to the copy of the tests that
      // happens below.  the copies are removed by the subsequent 'git clean'
      if (!$dry_run) $this->_exec('git add tests/behat/features/');

      // copy all tests in templates to each domain
      // also use sed to replace the @templates tag with @<domain>
      // OR, if $wip_template is true, copy from the wip_template directory instead of the templates directory

      // if domain is one of the following, don't copy the templates
      $exceptions_to_template_copies = array('templates', 'wip', 'Jasper', 'Hannah');
      $copy_templates = !in_array($domain, $exceptions_to_template_copies);


      // it is sometimes useful to turn the following off, to
      // allow much more rapid testing of specific tests
      //
      // $copy_templates = false;

      $this->say("  Testing domain $domain");
      $this->say($copy_templates
        ? "  copying templates from directory $copy_from"
        : "  *not* copying any templates");

      if ($copy_templates) {
        $cmd = "cp tests/behat/features/$copy_from/* tests/behat/features/$domain/ && sed -i '1 s/@templates/@$domain/g' tests/behat/features/$domain/*.feature";
        if ($dry_run) $this->say('dry-run: ' . $cmd);
        else $behat = shell_exec($cmd);
      }
      $shell_cmd = $lando . '\'google-chrome\' --headless --no-sandbox --disable-dev-shm-usage --disable-web-security --remote-debugging-port=9222 --window-size=1440,1080 &) | behat  --format pretty /app/tests/behat --colors --no-interaction --stop-on-failure --config /app/tests/behat/local.yml --profile local --tags @' . $domain . ' -v' . $lando_end;

      if ($dry_run) {
        $shell_cmd = 'echo dry-run: ' . $shell_cmd;
      }
      $behat = shell_exec($shell_cmd);
      $this->say($behat);

      if (!$no_drush_cmds) {
        $this->_exec( $this->lando() . 'drush cim -y');
        $this->_exec( $this->lando() . 'drush cr');
      }

      if (!$dry_run) $this->_exec( 'git clean -f tests/behat/features/');

      # Todo: need to figure out a better way of getting this output.
      $pattern = "/Failed scenarios/i";
      if (preg_match($pattern, $behat)) {
        throw new \Exception('Failed behat tests.');
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
    $lando = $this->lando() == 'lando '?"lando ssh -c \"(":"(";
    $lando_end = $this->lando() == 'lando '?"\"":"";
    $this->_exec($lando . '\'google-chrome\' --headless --no-sandbox --disable-dev-shm-usage --disable-web-security --remote-debugging-port=9222 &) | behat -dl  /app/tests/behat --config /app/tests/behat/local.yml --profile local' . $lando_end);
  }

  /**
   * Command prefix.
   */
  private function lando() {
    $lando = "lando ";
    if ( getcwd() == '/app' ) {
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
  }

  /**
   * Reload site with prod db.
   *
   * @command amp:did
   * @description pull in production database.
   */
  public function did() {
    if ($this->lando() == 'lando ') {
      $this->_exec("lando db-import backups/site.sql.gz");
    } else {
      $this->_exec("drush sql-drop -y &&
        cp backups/site.sql.gz lando-import.sql.gz &&
        gunzip lando-import.sql.gz
        drush sqlc < lando-import.sql &&
        rm -fR lando-import.sql
      ");
    }
    $this->_exec($this->lando() . "drush deploy -y");
    $this->_exec($this->lando() . "drush cim -y");
    $this->_exec($this->lando() . "drush cr");
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
    } elseif (!empty($arrrrgs)) {
      $this->_exec("composer update $arrrrgs --no-scripts --ignore-platform-req=ext-gd >log.txt 2>&1");
      $this->_exec("cat log.txt");
      $this->composer_updates('/Upgrading .*\/(.*)\((.* \=\> .*)\)$/m');
    }
  }

  private function composer_updates($regex) {
    $log = file_get_contents("log.txt");
    $log = preg_match_all($regex, $log, $update_matches);
    $this->say("-=-=-=-=-Log Message=-=-===-\n$log");
    $update_list = '';
    foreach ($update_matches[1] as $key => $update_match) {
      $seperator = $key > 0 ? ' — ': '';
      $version = $update_matches[2][$key];
      $update_list .= "$seperator$update_match: $version";
    }
      #$this->_exec("lando drush updatedb -y");
      #$this->_exec("lando drush cr");
    if ($log > 0) {
      $this->say("\n The following updated:
$update_list");
      $this->_exec("git add composer.*");
      $this->_exec("git commit -m\"$update_list\"");
      $this->_exec("rm log.txt");
    }
  }

}
