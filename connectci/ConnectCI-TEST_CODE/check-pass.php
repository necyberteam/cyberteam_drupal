<?php
$context = stream_context_create(array(
    'http' => array(
        'method' => 'POST',
        'header' => "Content-Type: application/json\r\n",
        'content' => '{"name":"eric.brown","pass":"PASSWORD"}'
    )
));
$response = file_get_contents('https://nectdev.wpi.edu/user/login?_format=json', FALSE, $context);
$responseDecoded = json_decode($response, true);
if (isset($responseDecoded['current_user']['uid']) && !empty($responseDecoded['current_user']['uid'])) {
  echo "validated <br>";
  print_r($responseDecoded);
} else {
  echo "failed";
}
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
include '../db-info.php';

/*$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$check = $conn->prepare("select uid, mail, pass from users_field_data where mail='eric.brown@unh.edu'");
$check->execute();
$checkResult = $check->get_result();
$row = $checkResult->fetch_assoc();
print_r($row);
if (check("PASSWORD", $row['pass'])) {
  echo "verified";
} else {
  echo "failed";
}
$check->close();
$conn->close();*/
?>
