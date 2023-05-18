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
    # Not to self: Can't place composer install in here because
    # it needs to run before you can run this command.
    $this->_exec("ln -s web docroot && mkdir backups");
    $this->_exec("mkdir -p web/sites/default/settings");
    $this->_exec("cp blt/lando.local.settings.php web/sites/default/settings/local.settings.php");
    $this->_exec($this->lando() . "composer install --ignore-platform-reqs -n");
    $hash = \Drupal\Component\Utility\Crypt::randomBytesBase64(55);
    $this->_exec("echo 'PANTHEON_ENVIRONMENT=local
DRUPAL_HASH_SALT=$hash
AMP_UID=$uid
GITHUB_TOKEN=$token'>.env");
    $this->say("❗️ Environment vars setup, now starting lando. ❗️");
    $this->_exec($this->lando() . " start");
    $this->_exec($this->lando() . " blt blt:telemetry:disable --no-interaction");
    $this->_exec($this->lando() . " xdebug-off");
    $this->_exec($this->lando() . " blt gh:pulldb");
    $this->_exec($this->lando() . " blt gh:pullfiles");
    $this->_exec($this->lando() . " blt amp:did");
    $this->_exec($this->lando() . " drush deploy");
    $this->_exec("cd web/themes/custom/accesstheme && lando npm install && lando npm run build:sass");
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
    } else {
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

    // to make testing faster, skip the drush commands (useful during development)
    // to enable this, in the shell, do "export BEHAT_NO_DRUSH=true"
    // to disable this, in the shell, do "export BEHAT_NO_DRUSH=false"
    // or put "no-drush" as an argument on commandline.
    $no_drush_cmds = array_search("no-drush", $args);
    if ($no_drush_cmds !== false) {
      // remove this argument from the args array because $args is used
      // below to contain a list of domains to test, or to test all
      // domains if args is empty
      array_splice($args, $no_drush_cmds, 1);
      $no_drush_cmds = true;
    }
    $no_drush_cmds |= strcasecmp(getenv("BEHAT_NO_DRUSH"), 'TRUE') == 0;
    if ($no_drush_cmds) {
      $this->say("NOTE: drush commands being skipped.");
    }

    // set following to true to see a dry-run of this script,
    // with no actual copying or running of tests
    // or put "dry-run" as an argument on commandline.
    $dry_run = array_search("dry-run", $args);
    if ($dry_run !== false) {
      // remove this argument from the args array because $args is used
      // below to contain a list of domains to test, or to test all
      // domains if args is empty
      array_splice($args, $dry_run, 1);
      $dry_run = true;
    }
    if ($dry_run) {
      $this->say("NOTE: dry-run -- nothing actually being executed.");
    }


    // special handling for the 'wip_template' directory -- we want to run
    // all the tests in this directory on all the domains but save time by
    // not copying & running all the tests in the templates directory
    $wip_template = false;

    if ($args) {
      $domains = $args;
      $wip_template = array_search('wip_template', $args) !== false;
    }

    if (!$args || $wip_template) {
      // make copies of the tests to these domains:  ky, gp, careers, nect
      $domains = [
        // these domains are sufficiently different that the template tests
        // should *not* be copied to them
        'cci',
        'asp',
        'champ',
        'coco',
        // 'rmacc',  // no such testing folder
        'usrse',
        // these domains get all the templated tests copied to them
        'careers',
        'gpc',
        'ky',
        'nect',
      ];
    }

    // if domain is one of the following, don't copy the templates
    $exceptions_to_template_copies = array(
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
    );

    $copy_from = $wip_template ? "wip_template" : "templates";

    $lando = $this->lando() == 'lando ' ? "lando ssh -c \"(" : "(";
    $lando_end = $this->lando() == 'lando ' ? "\"" : "";

    foreach ($domains as $domain) {
      // git add current features - this is due to the copy of the tests that
      // happens below.  the copies are removed by the subsequent 'git clean'
      if (!$dry_run) $this->_exec('git add tests/behat/features/');

      // copy all tests in templates to each domain
      // also use sed to replace the @templates tag with @<domain>
      // OR, if $wip_template is true, copy from the wip_template directory instead of the templates directory
      // but don't copy template tests to domains on the exceptions list
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
        $cmd = "cp tests/behat/features/$copy_from/*.feature tests/behat/features/$domain/ && sed -i '1 s/@templates/@$domain/g' tests/behat/features/$domain/*.feature";
        if ($dry_run) $this->say('    dry-run: ' . $cmd);
        else $behat = shell_exec($cmd);
      }
      $shell_cmd = $lando . '\'google-chrome\' --headless --no-sandbox --disable-dev-shm-usage --disable-web-security --remote-debugging-port=9222 --window-size=1440,1080 &) | behat --format pretty /app/tests/behat --colors --no-interaction --stop-on-failure --config /app/tests/behat/local.yml --profile local --tags @' . $domain . ' -v 2>&1' . $lando_end;

      if ($dry_run) {
        $this->say("    dry-run: $shell_cmd");
        $behat = '';
      } else {
        $this->say("    running: $shell_cmd");
        $this->say("------------------ start of $domain test results ------------------");
        // Open a pipe to the command and capture its output
        $descriptorspec = array(
          0 => array("pipe", "r"), // stdin
          1 => array("pipe", "w"), // stdout
          2 => array("pipe", "w"), // stderr
        );
        $process = proc_open($shell_cmd, $descriptorspec, $pipes);

        // Read the output from the command in real-time
        while ($line = fgets($pipes[1])) {
          echo $line;
          $pattern = "/Failed scenarios/i";
          if (preg_match($pattern, $line)) {
            // Close the pipes and the process
            fclose($pipes[0]);
            fclose($pipes[1]);
            fclose($pipes[2]);
            proc_close($process);
            $this->_exec('git clean -f tests/behat/features/');
            throw new \Exception('Failed behat tests');
          }
        }

        // Close the pipes and the process
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

      if (!$dry_run) $this->_exec('git clean -f tests/behat/features/');

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
      $seperator = $key > 0 ? ' — ' : '';
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
