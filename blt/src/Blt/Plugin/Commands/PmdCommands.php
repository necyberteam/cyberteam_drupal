<?php

namespace Example\Blt\Plugin\Commands;

use Acquia\Blt\Robo\BltTasks;
use Symfony\Component\Console\Event\ConsoleCommandEvent;

/**
 * Defines commands in the "pmd" namespace.
 */
class PmdCommands extends BltTasks {

  /**
   * Command to check for multidev environment.
   *
   * @command pmd:check
   * @description Checks for MD environment.
   */
  public function check(array $args) {
    $sites = shell_exec("terminus multidev:list --format csv --fields id -- accessmatch");
    $sites = substr($sites, strpos($sites, "\n") + 1);
    $sites = str_replace("\n", "", $sites);
    if (strpos($sites, $args[0]) !== false) {
      $this->say("TRUE");
    }
    else {
      $this->say("FALSE");
    }
  }

  /**
   * Command to create a multidev environment.
   *
   * @command pmd:create
   * @description Create multidev environment.
   */
  public function create(array $args) {
    $md_exists = shell_exec("vendor/bin/blt pmd:check $args[0]");
    if ($md_exists === TRUE) {
      $this->say("This multidev environment already exists.");
    }
    else {
      $this->_exec("terminus multidev:create -- accessmatch.test $args[0]");
      $this->_exec("terminus remote:drush accessmatch.$args[0] -- deploy");
      $this->say("This multidev environment has been created and deployed.");
    }
  }
}
