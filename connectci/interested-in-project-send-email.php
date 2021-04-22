<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
require '../db-info.php';
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$domains = array(
  "CAREERS" => "https://careers-ct.cyberinfrastructure.org/",
  "Great Plains" => "https://greatplains.cyberinfrastructure.org/",
  "Kentucky" => "https://kycyberteam.cyberinfrastructure.org/",
  "MINES" => "https://mines.cyberinfrastructure.org/",
  "Northeast" => "https://necyberteam.org/",
  "RMACC" => "https://rmacc.cyberinfrastructure.org/",
  "SWEETER" => "https://sweeter.cyberinfrastructure.org/",
  "TRECIS" => "https://trecis.cyberinfrastructure.org/"
  );
$getInterestInProjectQuery = 'SELECT a.id, a.flag_id, a.entity_id, a.uid, a.created, b.sid, b.value AS project_title, c.field_user_first_name_value AS first_name, d.field_user_last_name_value AS last_name, e.mail AS email, taxonomy_term_field_data.name AS user_program, f.value as pl_first, g.value as pl_last, h.value as pl_email, p_prog.name as p_program, j.value as anchor_institution FROM flagging a LEFT JOIN webform_submission_data b ON a.entity_id = b.sid && b.name="project_title" LEFT JOIN user__field_user_first_name c ON a.uid = c.entity_id LEFT JOIN user__field_user_last_name d ON a.uid = d.entity_id LEFT JOIN users_field_data e ON a.uid = e.uid LEFT JOIN user__field_region ON a.uid = user__field_region.entity_id LEFT JOIN taxonomy_term_field_data ON user__field_region.field_region_target_id = taxonomy_term_field_data.tid LEFT JOIN webform_submission_data f ON a.entity_id = f.sid && f.name="project_leader" && f.property="first" LEFT JOIN webform_submission_data g ON a.entity_id = g.sid && g.name="project_leader" && g.property="last" LEFT JOIN webform_submission_data h ON a.entity_id = h.sid && h.name="email" LEFT JOIN webform_submission_data i ON a.entity_id = i.sid && i.name="region" LEFT JOIN taxonomy_term_field_data p_prog ON i.value = p_prog.tid LEFT JOIN webform_submission_data j ON a.entity_id = j.sid && j.name="anchor_institution" WHERE a.flag_id="interested_in_project" and FROM_UNIXTIME(a.created) >= now() - INTERVAL 1 DAY';
$getInterestInProject = $conn->prepare($getInterestInProjectQuery);
$getInterestInProject->execute();
$getInterestInProjectResult = $getInterestInProject->get_result();
if ($getInterestInProjectResult->num_rows > 0) {
  while($row = $getInterestInProjectResult->fetch_assoc()) {
    $data[] = array('project_title' => $row['project_title'],
    'name' => $row['last_name'] . ', '. $row['first_name'],
    'email' => $row['email'],
    'date_interested' => date("m/d/Y", $row['created']),
    'user_program' => $row['user_program'],
    'project_program' => $row['p_program'],
    'anchor_institution' => $row['anchor_institution'],
    'project_leader_email' => $row['pl_email'],
    'project_leader' => $row['pl_last'] . ', '. $row['pl_first'],
    'user_link' => $domains[$row['user_program']] . "user/" . $row['uid'],
    'project_link' => $domains[$row['p_program']] . "project/" . $row['sid']
  );
 }
} else {
  $data = "";
}
$getInterestInProject->close();
$conn->close();

function sendMail($data, $filename) {
  $contacts = array(
    "jma@mghpcc.org, kaylea.nelson@yale.edu",
    "eibrown12@gmail.com"
  );
  foreach($contacts as $contact) {
    $to      = $contact;
    $subject = '[Connect.CI] Users interested in projects: ' . date("m/d/Y");
    $headers = "From: Connect.CI <noreply@wpi.edu>\r\nX-Mailer: PHP/" . phpversion();
    if ($contact != "eibrown12@gmail.com") {
      $headers .= "\r\nCc: eric.brown@unh.edu";
    }
    if (empty($data) || $data == "") {
      $message = "There were no users that indicated that they were interested in a project in the last 24 hours";
    } else {
      $semi_rand = md5(time());
      $mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";
      $headers .= "\r\nMIME-Version: 1.0\n" . "Content-Type: multipart/mixed;\r\n" . " boundary=\"{$mime_boundary}\"";
      $message = "--{$mime_boundary}\r\n" . "Content-Type: text/html; charset=\"UTF-8\"\r\n" . "Content-Transfer-Encoding: 7bit\r\n\n";
      $message .= "The following users indicated that they are interested in a project in the last 24 hours. " . "\r\n";
      $message .= "<table><tr>" .
      "<td>project_title</td>" .
      "<td>name</td>" .
      "<td>email</td>" .
      "<td>project_program</td>" .
      "<td>anchor_institution</td>" .
      "</tr>";
      foreach ($data as $row) {
        $message .= "<tr>" .
        "<td><a href='" . $row['project_link'] . "' target='_blank'>" . $row['project_title'] . "</a></td>" .
        "<td><a href='" . $row['user_link'] . "' target='_blank'>" . $row['name'] . "</a></td>" .
        "<td>" . $row['email'] . "</td>" .
        "<td>" . $row['project_program'] . "</td>" .
        "<td>" . $row['anchor_institution'] . "</td>" .
        "</tr>";
      }
      $message .= "</table>";
      $message .= "\r\n\n";

      $message .= "--{$mime_boundary}\r\n";
      $filedata = chunk_split(base64_encode(outputCSV($data)));
      $message .= "Content-Type: application/octet-stream; name=\"".$filename."\"\r\n" .
      "Content-Description: ".$filename."\r\n" .
      "Content-Disposition: attachment;\r\n" . " filename=\"".$filename."\";\r\n" .
      "Content-Transfer-Encoding: base64\r\n\n" . $filedata . "\r\n\n";

      $message .= "--{$mime_boundary}--";
    }
    if(mail($to, $subject, $message, $headers)) {
      //echo "sent";
    } else {
      //echo "failed";
    }
  }
}

function outputCSV($data) {
  # Start the ouput
  //$output = fopen("php://output", "w");
  $output = fopen("php://temp", "w+");
  fputcsv($output, array_keys($data[0]));
  # Then loop through the rows
  foreach ($data as $row) {
    # Add the rows to the body
    fputcsv($output, $row); // here you can change delimiter/enclosure
  }
  # Close the stream off
  //fclose($output);
  rewind($output);
  return stream_get_contents($output);
}

$filename = "interested_in_project_" . date('Ymd') . ".csv";
sendMail($data, $filename);
?>
