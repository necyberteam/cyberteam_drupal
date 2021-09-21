<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
require '../db-info.php';
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  ?><div class="alert alert-danger"><strong>Connection Error:</strong> Please contact a system administrator.</div><?php
  /*die("Connection failed: " . $conn->connect_error);*/
}

$getProjectStatusesQuery = 'SELECT DISTINCT webform_submission_data.value AS uid, user__field_user_first_name.field_user_first_name_value AS first_name, user__field_user_last_name.field_user_last_name_value AS last_name, users_field_data.mail AS email, users_field_data.created AS created, taxonomy_term_field_data.name AS program FROM webform_submission_data LEFT JOIN user__field_user_first_name ON webform_submission_data.value = user__field_user_first_name.entity_id LEFT JOIN user__field_user_last_name ON webform_submission_data.value = user__field_user_last_name.entity_id LEFT JOIN users_field_data ON webform_submission_data.value = users_field_data.uid LEFT JOIN user__field_region ON webform_submission_data.value = user__field_region.entity_id LEFT JOIN taxonomy_term_field_data ON user__field_region.field_region_target_id = taxonomy_term_field_data.tid WHERE webform_submission_data.name="student" && webform_submission_data.webform_id="project" ORDER BY CAST(webform_submission_data.value AS unsigned) ASC';
$getProjectStatuses = $conn->prepare($getProjectStatusesQuery);
$getProjectStatuses->execute();
$gProjectsResult = $getProjectStatuses->get_result();
if ($gProjectsResult->num_rows > 0) {
  while($user = $gProjectsResult->fetch_assoc()) {
      $projectsArray[] = array('uid' => $user["uid"],
      'first_name' => $user["first_name"],
      'last_name' => $user["last_name"],
      'email' => $user["email"],
      'joined' => $user["created"],
      'program' => $user["program"]
    );
  }
}
$getProjectStatuses->close();

  function outputZip($fileArr, $dirname) {
    $zipname = $dirname . ".zip";
    $zip = new ZipArchive;
    $zip->open($zipname, ZipArchive::CREATE);

    foreach ($fileArr as $file) {
      $output = fopen("php://memory", "w");
      fputcsv($output, array_keys($file['data'][0]));
      # Then loop through the rows
      foreach ($file['data'] as $row) {
        # Add the rows to the body
        fputcsv($output, $row); // here you can change delimiter/enclosure
      }
      # Close the stream off
      rewind($output);
      $zip->addFromString($dirname ."/". $file['name'] . ".csv", stream_get_contents($output));
      fclose($output);
    }

    $zip->close();
    header("Content-Type: application/zip");
    header("Content-Disposition: attachment; filename=$zipname");
    header('Content-Length: ' . filesize($zipname));
    header("Cache-Control: no-cache, no-store, must-revalidate");
    header("Pragma: no-cache");
    header("Expires: 0");
    readfile($zipname);
    unlink($zipname);
  }

  $tz = 'America/New_York';
  $timestamp = time();
  $dt = new DateTime("now", new DateTimeZone($tz));
  $dt->setTimestamp($timestamp);
  $date = $dt->format("Ymd");

  $dirname = "project-statuses-" . $date;
  $fileArr[] = array('name' => 'project-statuses', 'data' => $projectsArray);
  outputZip($fileArr, $dirname);
  //header("Location: students-project.php");
  exit;
?>
