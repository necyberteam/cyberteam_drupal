<?php
if ($_GET['q']=="logout" || $_GET['q'] == "user/logout") {
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
  header("Location: ./"); exit;
}

require 'db-info.php';
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$getDomain = $conn->prepare("SELECT domains.program, domains.environment, programs.name, programs.site_title, programs.logo FROM domains LEFT JOIN programs ON programs.name = domains.program WHERE domain=?");
$getDomain->bind_param("s", $_SERVER['HTTP_HOST']);
$getDomain->execute();
$getDomainResult = $getDomain->get_result();
if ($getDomainResult->num_rows > 0) {
  while($row = $getDomainResult->fetch_assoc()) {
    $program = array("name" => $row['name'], "site_title" => $row['site_title'], "logo" => $row['logo']);
    $environment = $row['environment'];
  }
} else {
  $program = array("name" => "At-Large", "site_title" => "CyberTeam Portal");
}
$getDomain->close();

if (isset($_GET['q'])) {
  $q = $conn->real_escape_string($_GET['q']);
  if (preg_match("/^[0-9]*$/", explode("/", $_GET['q'])[1])) {
    $entity_type = explode("/", $_GET['q'])[0];
    $entity_id = explode("/", $_GET['q'])[1];
    $mode = (explode("/", $_GET['q'])[2] == "edit" ? "edit" : "view");
  }
} else {
  //show homepage
  $q = $entity_type = "front";
}

if ($mode == "edit") {
  // if user not logged in show access denied
  if (!isset($_SESSION['uid']) || empty($_SESSION['uid'])) {
    $hasAccess = "false";
  } else {
    if (in_array("administrator", $_SESSION['roles'])) {
      $hasAccess = "true";
    }
  }
}

$checkAlias = $conn->prepare("SELECT * FROM aliases WHERE alias=?");
$checkAlias->bind_param("s", $q);
$checkAlias->execute();
$checkAliasResult = $checkAlias->get_result();
if ($checkAliasResult->num_rows > 0) {
  while($row = $checkAliasResult->fetch_assoc()) {
    $entity_type = $row['entity_type'];
    $entity_id = $row['entity_id'];
  }
}
$checkAlias->close();

if (in_array($q, array("front", "projects", "resources", "affinity-groups", "blog", "news", "people"))) {
  if (file_exists('./entities/'.$entity_type.'.php')) {
    include './entities/' . $entity_type . '.php';
  } else {
    $pageNotFound = "true";
  }
} else {
  if (isset($entity_id) && $entity_id != "" && file_exists('./entities/' . $entity_type . '.php')) {
    include './entities/' . $entity_type . '.php';
  } else {
    $pageNotFound = "true";
  }
}
include './components/header.php';
if (file_exists('./render/' . $entity_type . '.php') && $pageNotFound != "true" && $hasAccess != "false") {
  include './render/' . $entity_type . '.php';
} else {
  if ($hasAccess == "false") {
    include './components/access-denied.php';
  } else {
    include './components/page-not-found.php';
  }
}
include './components/footer.php';
?>
