<?php
if (isset($_GET['q'])) {
  $entity_type = explode("/", $_GET['q'])[0];
  $entity_id = explode("/", $_GET['q'])[1];
  $mode = (explode("/", $_GET['q'])[2] == "edit" ? "edit" : "view");
} else {
  //show homepage
  $entity_type = "front";
}
echo "<br>entity_type: " . $entity_type;
echo "<br>entity_id: " . $entity_id;
echo "<br>mode: " . $mode;
/*
if ($mode == "edit") {
  // if user not logged in show access denied
  if (!isset($_SESSION['uid']) || empty($_SESSION['uid'])) {
    $accessDenied = "true";
  } else {

  }
  if (in_array("administrator", $_SESSION['roles'])) {
    //allow
  }
  // else if user is logged in and does not have access, show access denied
  // else show the edit page
}
require 'db-info.php';
if ($entity_type == "project") {
  include 'entities/project.php';
}
if ($entity_type == "resource") {
  include 'entities/resource.php';
}
if ($entity_type == "user") {
  include 'entities/project.php';
}
if ($entity_type == "about") {
  include 'entities/about.php';
}
$page_title = "Home";
include 'components/header.php';
*/
?>
