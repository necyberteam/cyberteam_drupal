<?php

namespace Example\Blt\Plugin\Commands;

use Acquia\Blt\Robo\BltTasks;
use Symfony\Component\Console\Event\ConsoleCommandEvent;

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
    $this->_exec("ln -s web docroot");
    $this->_exec("mkdir -p web/sites/default/settings");
    $this->_exec("mv blt/lando.local.settings.php web/sites/default/settings/local.settings.php");
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
   * @description Start lando and run the behat fix.
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
  public function behat() {
    if ( getcwd() == '/app' ) {
      $this->_exec('(\'google-chrome\' --headless --no-sandbox --disable-dev-shm-usage --disable-web-security --remote-debugging-port=9222 &) | behat  --format pretty /app/tests/behat --colors --no-interaction --stop-on-failure --config /app/tests/behat/local.yml --profile local --tags ~@liaison -v');
    } else {
      $this->_exec('lando ssh -c "(\'google-chrome\' --headless --no-sandbox --disable-dev-shm-usage --disable-web-security --remote-debugging-port=9222 &) | behat  --format pretty /app/tests/behat --colors --no-interaction --stop-on-failure --config /app/tests/behat/local.yml --profile local --tags ~@liaison -v"');
    }
  }

  /**
   * Login with username.
   *
   * @command amp:uli
   * @description Login locally with personal username set in github.
   */
  public function uli() {
    $un = $_ENV["AMP_USERNAME"];
    if ( getcwd() == '/app' ) {
      $this->_exec("drush uli --name='$un'");
    } else {
      $this->_exec("lando drush uli --name=$un");
    }
  }

  /**
   * Reload site with prod db.
   *
   * @command amp:did
   * @description pull in production database.
   */
  public function did() {
    $un = $_ENV["AMP_USERNAME"];
    $this->_exec("lando db-import backups/site.sql.gz");
    #$this->_exec("lando drush deploy -y");
    #$this->_exec("lando drush cim -y");
    $this->_exec("lando drush cr");
    $this->_exec("lando drush uli --name=$un");
  }

}
