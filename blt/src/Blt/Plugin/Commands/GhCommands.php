<?php

namespace Example\Blt\Plugin\Commands;

use Acquia\Blt\Robo\BltTasks;
use Symfony\Component\Console\Event\ConsoleCommandEvent;

/**
 * Defines commands in the "gh" namespace.
 */
class GhCommands extends BltTasks {

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
    $location_url = $this->grabLocation('amp-daily-backup');
    $this->_exec("wget -O daily_backup.zip '$location_url'");
    $this->_exec("unzip daily_backup.zip && rm daily_backup.zip");
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
    $this->say("-------------- start debugging pullfiles ----------------");
    $location_url = $this->grabLocation('amp-file-backup');
    $this->say("------ location_url = $location_url");
    $this->_exec("wget -O gh_files.zip '$location_url'");
    $this->_exec("mkdir files && unzip gh_files.zip -d files && rm gh_files.zip");
    $prev_files = 'web/sites/default/files';
    if (file_exists($prev_files)) {
      $this->_exec("rm -fR $prev_files");
    }
    $this->_exec("mv files $prev_files");
    $this->say(" -------------- end debugging pullfiles ----------------");
  }

  /**
   * Pull latest Database from artifacts.
   */
  private function grabLocation($name) {
    $this->say("------ debugging grapLocation --- Grabbing github artifact location with name '$name' ");
    $artifact_call = $this->ghApiCall("https://api.github.com/repos/necyberteam/cyberteam_drupal/actions/artifacts");
    $result = json_decode($artifact_call);
    foreach ($result->artifacts as $artifact) {
      if ($artifact->name == $name) {
        $artifact_id = $artifact->id;
        break;
      }
    }
    $artifact_zip = $this->ghApiCall("https://api.github.com/repos/necyberteam/cyberteam_drupal/actions/artifacts/$artifact_id/zip", 1);
    $regex = '/https:\/\/.*/m';
    $location_url_search = preg_match_all($regex, $artifact_zip, $matches);
    $this->say("----- location_url_search = " . print_r($location_url_search, TRUE));
    $location_url = $matches[0][0];
    $this->say("------ grabLocation location_url = $location_url");

    return $location_url;
  }

  /**
   * Github api call function.
   */
  private function ghApiCall($api_url, $header = 0) {
    $this->say("------ debugging ghApiCall  ----- api_url = '$api_url' ");
    $api_token = getenv('GITHUB_TOKEN');
    $this->say("------ debugging first 20 chars of GITHUB_TOKEN: " . substr($api_token, 0, 20));

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_USERPWD, $api_token);
    // Set url to post to.
    curl_setopt($ch, CURLOPT_URL, $api_url);
    // Return into a variable.
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    if ($header) {
      curl_setopt($ch, CURLOPT_HEADER, 1);
    }
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
      "User-Agent: Awesome-Octocat-App",
    ]);
    // Run the whole process.
    $result = curl_exec($ch);
    $this->say("------ grabLocation result = " . print_r($result, TRUE));

    return $result;
  }
}
