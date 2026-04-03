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

    // Create a temporary directory for download to avoid path traversal issues
    // (GitHub CLI v2.63.1+ has stricter path validation that can cause false positives)
    $downloadDir = 'artifact-download-tmp';
    if (!file_exists($downloadDir)) {
      mkdir($downloadDir, 0755, true);
    }

    // Download the artifact to explicit directory to work around gh CLI path traversal check
    $result = $this->_exec("gh run download -R github.com/necyberteam/cyberteam_drupal -n amp-daily-backup -D $downloadDir");

    // Ensure backups directory exists
    if (!file_exists('backups')) {
      $this->_exec("mkdir -p backups");
    }

    // Check what files were downloaded
    $this->say("Checking downloaded files...");
    $this->_exec("ls -la $downloadDir");

    $found_file = false;
    $target_file = 'backups/site.sql.gz';

    // Check for various possible file names in download directory
    if (file_exists("$downloadDir/site.sql.gz")) {
      $this->say("Found site.sql.gz");
      $this->_exec("mv $downloadDir/site.sql.gz $target_file");
      $found_file = true;
    }
    elseif (file_exists("$downloadDir/site.sql")) {
      $this->say("Found site.sql, compressing...");
      $this->_exec("gzip $downloadDir/site.sql");
      $this->_exec("mv $downloadDir/site.sql.gz $target_file");
      $found_file = true;
    }

    if (!$found_file) {
      $this->say("❗️ No database file found. Available files:");
      $this->_exec("find $downloadDir -name '*.sql*' -o -name 'site.*'");
      // Clean up temp directory
      $this->_exec("rm -fR $downloadDir");
      throw new \Exception('Failed to find database backup file');
    }

    // Clean up temp directory
    $this->_exec("rm -fR $downloadDir");

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
    $this->say("Downloading latest file backup from GitHub artifacts...");

    // List available workflows/runs to debug
    $this->_exec("gh run list -R github.com/necyberteam/cyberteam_drupal -L 5");

    // Create a temporary directory for download to avoid path traversal issues
    // (GitHub CLI v2.63.1+ has stricter path validation that can cause false positives)
    $downloadDir = 'artifact-download-tmp';
    if (!file_exists($downloadDir)) {
      mkdir($downloadDir, 0755, true);
    }

    // Download the artifact to explicit directory to work around gh CLI path traversal check
    $result = $this->_exec("gh run download -R github.com/necyberteam/cyberteam_drupal -n amp-file-backup -D $downloadDir");

    // Check what files were downloaded
    $this->say("Checking downloaded files...");
    $this->_exec("ls -la $downloadDir");

    // Check if files.tar.gz exists in the download directory
    $tarFile = "$downloadDir/files.tar.gz";
    if (!file_exists($tarFile)) {
      $this->say("❗️ No files.tar.gz found. Available files:");
      $this->_exec("find $downloadDir -name '*.tar.gz' -o -name 'files.*'");
      // Clean up temp directory
      $this->_exec("rm -fR $downloadDir");
      throw new \Exception('Failed to find files backup file');
    }

    // Remove existing files directory if it exists
    $prev_files = 'web/sites/default/files';
    if (file_exists($prev_files)) {
      $this->_exec("rm -fR $prev_files");
    }

    // Extract and move files
    $this->_exec("tar -xzvf $tarFile");
    $this->_exec("mv files web/sites/default/files");

    // Clean up
    $this->_exec("rm -fR $downloadDir");

    $this->say("✅ File backup downloaded successfully!");
  }

  /**
   * Generate notification catalog and deploy to GitHub Pages.
   *
   * @command gh:mkdocs-deploy
   * @description Generate notification catalog and deploy to GitHub Pages.
   */
  public function mkdocsWikiDeploy() {
    // Verify mkdocs is available on PATH.
    $mkdocsCheck = shell_exec('which mkdocs 2>/dev/null');
    if (empty(trim($mkdocsCheck ?? ''))) {
      $this->say("❗️ mkdocs not found on PATH. Install with: pip install mkdocs-material");
      return 1;
    }

    // Determine auth method: GH_TOKEN_REPO for CI, SSH keys for local.
    $token = getenv('GH_TOKEN_REPO');
    $useSSH = empty($token);
    if ($useSSH) {
      $this->say("GH_TOKEN_REPO not set — using SSH for authentication.");
    }

    $catalogDir = 'notification-docs';
    $cloneDir = 'notification-catalog-tmp';
    $catalogRepo = $useSSH
      ? 'git@github.com:access-ci-org/cyberteam_notification_catalog.git'
      : 'https://github.com/access-ci-org/cyberteam_notification_catalog';

    // Step 1: Generate the notification catalog via drush.
    $this->say("Generating notification catalog...");
    $result = $this->_exec("ddev drush access_misc:generate-notification-catalog --output-dir=/var/www/html/$catalogDir");
    if (!$result->wasSuccessful()) {
      $this->say("❗️ Failed to generate notification catalog.");
      return $result;
    }

    // Step 2: Clone the catalog repo into a temp directory.
    $this->say("Cloning $catalogRepo...");
    if (file_exists($cloneDir)) {
      $this->_exec("rm -fR $cloneDir");
    }
    $result = $this->_exec("git clone --branch main $catalogRepo $cloneDir");
    if (!$result->wasSuccessful()) {
      $this->say("❗️ Failed to clone $catalogRepo.");
      $this->_exec("rm -fR $catalogDir");
      return $result;
    }

    // Step 3: Copy generated markdown files into the clone's docs/notifications/.
    $this->say("Copying generated docs into clone...");
    $notificationsDir = "$cloneDir/docs/notifications";
    if (!file_exists($notificationsDir)) {
      mkdir($notificationsDir, 0755, true);
    }
    $this->_exec("cp -R $catalogDir/. $notificationsDir/");

    // Step 4: Install Python dependencies (skip if mkdocs already available).
    $mkdocsVersion = shell_exec('mkdocs --version 2>/dev/null');
    if (empty(trim($mkdocsVersion ?? ''))) {
      $this->say("Installing Python dependencies...");
      $result = $this->_exec("pip install -r $cloneDir/requirements.txt");
      if (!$result->wasSuccessful()) {
        $this->say("❗️ pip install failed.");
        $this->_exec("rm -fR $catalogDir $cloneDir");
        return $result;
      }
    }
    else {
      $this->say("mkdocs already installed, skipping pip install.");
    }

    // Step 5: Set authenticated remote URL and deploy via mkdocs.
    $this->say("Deploying via mkdocs gh-deploy...");
    if ($useSSH) {
      $deployCmd = "cd $cloneDir && mkdocs gh-deploy --remote-branch=gh-pages --force";
    }
    else {
      $authedRemote = "https://$token@github.com/access-ci-org/cyberteam_notification_catalog.git";
      $deployCmd = "cd $cloneDir && git remote set-url origin $authedRemote && mkdocs gh-deploy --remote-branch=gh-pages --force";
    }
    $result = $this->_exec($deployCmd);
    if (!$result->wasSuccessful()) {
      $this->say("❗️ mkdocs gh-deploy failed.");
      $this->_exec("rm -fR $catalogDir $cloneDir");
      return $result;
    }

    // Step 6: Clean up.
    $this->say("Cleaning up...");
    $this->_exec("rm -fR $catalogDir $cloneDir");

    $this->say("✅ Notification catalog deployed to GitHub Pages successfully!");
  }

  /**
   * Create github pull request.
   *
   * @command gh:pr
   * @description Create a pull request.
   */
  public function ghpr() {
    $branch = shell_exec("git rev-parse --abbrev-ref HEAD");
    $branch = preg_replace('/\r\n|\r|\n/', '', $branch);

    $target_branch = $branch == 'md-dev' ? 'main' : 'md-dev';

    $branch = explode("-", $branch);

    $issue_number = $branch[1];
    $issue_number = preg_replace('/\r\n|\r|\n/', '', $issue_number);

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

    // Copy template to clipboard for easy pasting into PR description.
    // MacOS only.
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'DAR') {
      $this->_exec("echo '$template' | pbcopy");
      $this->say("PR description template copied to clipboard!");
    }
    $this->_exec("gh pr create --title '#$issue_number' --body '$template' --base $target_branch");
  }

}
