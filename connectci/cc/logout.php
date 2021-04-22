<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
session_start();
if (isset($_SESSION['message_type']) && isset($_SESSION['message'])) {
  $messageType = $_SESSION['message_type'];
  $message = $_SESSION['message'];
}
session_destroy();
session_start();
if (isset($messageType) && isset($message)) {
  $_SESSION['message_type'] = $messageType;
  $_SESSION['message'] = $message;
}
header("Location: ./cc-login.php"); exit;
?>
