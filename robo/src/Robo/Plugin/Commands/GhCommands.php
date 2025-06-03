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
    $this->say("Downloading latest database backup from GitHub artifacts...");
    
    // List available workflows/runs to debug
    $this->_exec("gh run list -R github.com/necyberteam/cyberteam_drupal -L 5");
    
    // Try to download the artifact
    $result = $this->_exec("gh run download -R github.com/necyberteam/cyberteam_drupal -n amp-daily-backup");
    
    // Ensure backups directory exists
    if (!file_exists('backups')) {
      $this->_exec("mkdir -p backups");
    }
    
    // Check what files were downloaded
    $this->say("Checking downloaded files...");
    $this->_exec("ls -la");
    
    $found_file = false;
    $target_file = 'backups/site.sql.gz';
    
    // Check for various possible file names
    if (file_exists('site.sql.gz')) {
      $this->say("Found site.sql.gz");
      $this->_exec("mv site.sql.gz $target_file");
      $found_file = true;
    } 
    elseif (file_exists('site.sql')) {
      $this->say("Found site.sql, compressing...");
      $this->_exec("gzip site.sql");
      $this->_exec("mv site.sql.gz $target_file");
      $found_file = true;
    }
    elseif (file_exists('amp-daily-backup/site.sql.gz')) {
      $this->say("Found site.sql.gz in subdirectory");
      $this->_exec("mv amp-daily-backup/site.sql.gz $target_file");
      $found_file = true;
    }
    elseif (file_exists('amp-daily-backup/site.sql')) {
      $this->say("Found site.sql in subdirectory, compressing...");
      $this->_exec("gzip amp-daily-backup/site.sql");
      $this->_exec("mv amp-daily-backup/site.sql.gz $target_file");
      $found_file = true;
    }
    
    if (!$found_file) {
      $this->say("❗️ No database file found. Available files:");
      $this->_exec("find . -name '*.sql*' -o -name 'site.*'");
      throw new \Exception('Failed to find database backup file');
    }
    
    // Remove old backup if it exists
    $prev_backup = 'backups/site.sql.gz.old';
    if (file_exists($target_file)) {
      $this->_exec("cp $target_file $prev_backup");
    }
    
    $this->say("✅ Database backup downloaded successfully to $target_file!");
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
