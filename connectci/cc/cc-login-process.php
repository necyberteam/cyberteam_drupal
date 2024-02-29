<?php
session_start();
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
if (isset($_POST['username']) && isset($_POST['password'])) {
  $context = stream_context_create(array(
      'http' => array(
          'method' => 'POST',
          'header' => "Content-Type: application/json\r\n",
          'content' => '{"name":"'.$_POST['username'].'","pass":"'.$_POST['password'].'"}'
      )
  ));
  include "./drupal-url.php";
  $response = file_get_contents($drupalUrl.'/user/login?_format=json', FALSE, $context);
  $responseDecoded = json_decode($response, true);
  if (isset($responseDecoded['current_user']['uid']) && !empty($responseDecoded['current_user']['uid']) &&
  isset($responseDecoded['current_user']['roles']) && !empty($responseDecoded['current_user']['roles']) &&
  (in_array("campuschampionsadmin", $responseDecoded['current_user']['roles']) || in_array("administrator", $responseDecoded['current_user']['roles']))) {
    $_SESSION['uid'] = $responseDecoded['current_user']['uid'];
    $_SESSION['campus_champions_admin'] = "true";
    header("Location: ./campus_champions.php"); exit;
  } else {
    $_SESSION['message_type'] = "danger";
    $_SESSION['message'] = "The username or password you entered were not correct.";
    header("Location: ./cc-login.php"); exit;  }
} else {
  // Error 1 - Please enter an email
  $_SESSION['message_type'] = "warning";
  $_SESSION['message'] = "Please enter a username and a password.";
  header("Location: ./cc-login.php"); exit;
}
?>
