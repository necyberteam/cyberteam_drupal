<?php

namespace Mih\Robo\Plugin\Commands;

use Robo\Exception\TaskException;
use Robo\Result;
use Robo\Robo;
use Robo\Tasks;
use Symfony\Component\Console\Event\ConsoleCommandEvent;

/**
 * Defines commands in the "gh" namespace.
 */
class GhCommands extends Tasks {

  /**
   * Iterate tag number.
   *
   * @command gh:tag
   * @description take current tag number and iterate.
   */
  public function iterateTag(array $args) {
    if ($args) {
      $current_tag = $args[0];
      $tag = explode('.', $current_tag);
      $tag[2] = $tag[2]+1;
      $new_tag = implode('.', $tag);
      return $new_tag;
    }

  }

  /**
   * Command to run to keep codespaces alive.
   *
   * @command gh:keepalive
   * @description Continuous loop that says bing.
   */
  public function keepAlive() {
    while (1) {
      $this->say("🔁 Bing");
      $this->_exec("sleep 120");
    }
  }

  /**
   * Pull latest Database from artifacts.
   *
   * @command gh:pulldb
   * @description Pulls latest database artifact from Github.
   */
  public function pulldb() {
    $this->_exec("gh run download -R github.com/necyberteam/cyberteam_drupal -n amp-daily-backup");
    $prev_backup = 'backups/site.sql.gz';
    if (file_exists($prev_backup)) {
      $this->_exec("rm $prev_backup");
    }
    $this->_exec("mv site.sql.gz backups/site.sql.gz");
  }

  /**
   * Pull latest Database from artifacts.
   *
   * @command gh:pullfiles
   * @description Pulls latest database artifact from Github.
   */
  public function pullfiles() {
    $this->_exec("gh run download -R github.com/necyberteam/cyberteam_drupal -n amp-file-backup");
    $prev_files = 'docroot/sites/default/files';
    if (file_exists($prev_files)) {
      $this->_exec("rm -fR $prev_files");
    }

    $this->_exec("tar -xzvf files.tar.gz");
    $this->_exec("mv files docroot/sites/default && rm -fR files.tar.gz");
  }

  /**
   * Create github pull request.
   *
   * @command gh:pr
   * @description Create a pull request.
   */
  public function ghpr() {
    $branch = shell_exec("git rev-parse --abbrev-ref HEAD");

    $branch = explode("-", $branch);

    $issue_number = $branch[1];
    $issue_number = str_replace(array("\n", "\r"), '', $issue_number);

    $ask_description = $this->ask("Describe context / purpose for this PR");

    $template = "## Describe context / purpose for this PR
$ask_description
## Issue link
https://cyberteamportal.atlassian.net/browse/D8-$issue_number
## Any other related PRs?
-
## Link to MultiDev instance
http://md-$issue_number-accessmatch.pantheonsite.io

## Checklist for PR author
- [ ] I have checked that the PR is ready to be merged
- [ ] I have reviewed the DIFF and checked that the changes are as expected
- [ ] I have assigned myself or someone else to review the PR";

    $this->say("Creating PR for D8-$issue_number");

    $this->_exec("gh pr create --title 'D8-$issue_number' --body '$template'");
  }

}
