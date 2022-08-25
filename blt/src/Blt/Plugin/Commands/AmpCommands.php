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
  public function landosetup() {
    $this->_exec("ln -s web docroot && mkdir backups");
    $this->_exec("mkdir -p web/sites/default/settings");
    $this->_exec("cp blt/lando.local.settings.php web/sites/default/settings/local.settings.php");
    $username = $this->ask("What is your drupal username: ");
    $hash = \Drupal\Component\Utility\Crypt::randomBytesBase64(55);
    $this->_exec("echo 'PANTHEON_ENVIRONMENT=local
DRUPAL_HASH_SALT=$hash
AMP_USERNAME=$username'>.env");
    $this->say("❗️ Environment vars setup, now starting lando. ❗️");
    $this->_exec("lando start");
    $this->_exec("lando xdebug-off");
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
    if ($args) {
      $domains = $args;
    } else {
      $domains = [
        'amp',
        'careers',
        'cci',
        'champ',
        'coco',
        'cyberteam',
        'gpc',
        'ky',
        'rmacc',
        'usrse'
      ];
    }

    $lando = $this->lando() == 'lando '?"lando ssh -c \"(":"(";
    $lando_end = $this->lando() == 'lando '?"\"":"";

    foreach ($domains as $domain) {
      $behat = shell_exec($lando . '\'google-chrome\' --headless --no-sandbox --disable-dev-shm-usage --disable-web-security --remote-debugging-port=9222 &) | behat  --format pretty /app/tests/behat --colors --no-interaction --stop-on-failure --config /app/tests/behat/local.yml --profile local --tags @' . $domain . ' -v' . $lando_end);
      $this->say($behat);
      $this->_exec( $this->lando() . 'drush cim -y');
      $this->_exec( $this->lando() . 'drush cr');
      # Todo: need to figure out a better way of getting this output.
      $pattern = "/Failed scenarios/i";
      if (preg_match($pattern, $behat)) {
        $this->_exec("exit 1");
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
   * Login with username.
   *
   * @command amp:uli
   * @description Login locally with personal username set in github.
   */
  public function uli() {
    if ($this->lando() == 'lando ') {
      $this->_exec("export $(lando ssh -s appserver -c env | grep AMP_USERNAME)");
    }
    $username = Xss::filter(shell_exec("printenv AMP_USERNAME"));
    $this->_exec($this->lando() . "drush uli --name=$username");
  }

  /**
   * Reload site with prod db.
   *
   * @command amp:did
   * @description pull in production database.
   */
  public function did() {
    $this->_exec($this->lando() . "db-import backups/site.sql.gz");
    $this->_exec("lando drush deploy -y");
    $this->_exec("lando drush cim -y");
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
      $this->_exec("composer update drupal/core drupal/core-composer-scaffold drupal/core-dev drupal/core-recommended drupal/core-project-message -W >log.txt 2>&1");
      $this->composer_updates('/Upgrading (drupal)\/core \((.* \=\> .*)\)$/mU');
    } elseif (!empty($arrrrgs)) {
      $this->_exec("composer update $arrrrgs --no-scripts >log.txt 2>&1");
      $this->composer_updates('/Upgrading .*\/(.*)\((.* \=\> .*)\)$/msU');
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
      $this->_exec("lando drush updatedb -y");
      $this->_exec("lando drush cr");
    if ($log > 0) {
      $this->say("\n The following updated:
$update_list");
      $this->_exec("git add composer.*");
      $this->_exec("git commit -m\"$update_list\"");
      $this->_exec("rm log.txt");
    }
  }

}
