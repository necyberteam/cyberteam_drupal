<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
session_start();
if(empty($_SESSION["uid"]) || empty($_SESSION['campus_champions_admin'])) {
  header("Location: ./cc-login.php"); exit;
}
require '../../db-info.php';
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) { ?>
  <div class="alert alert-danger"><strong>Connection Error:</strong> Please contact a system administrator.</div>
<?php }
if (isset($_POST['uid'])) { $uid = $conn->real_escape_string($_POST['uid']); } else { header("Location: ./campus_champions.php"); exit; }
if (isset($_POST['sid'])) { $sid = $conn->real_escape_string($_POST['sid']); } else { header("Location: ./campus_champions.php"); exit; }
if (isset($_POST['carnegie_code'])) { $carnegieCode = $conn->real_escape_string($_POST['carnegie_code']); } else { $carnegieCode = ""; }
if (isset($_POST['classification'])) { $classification = $conn->real_escape_string($_POST['classification']); } else { $classification = ""; }
if (isset($_POST['approved'])) { $approved = $conn->real_escape_string($_POST['approved']); } else { $approved = "0"; }
if (isset($sid) && $sid != "") {
  $updateApplication = $conn->prepare('UPDATE webform_submission_data SET value="reviewed" WHERE sid=? and name="status" and webform_id="join_campus_champions"');
  $updateApplication->bind_param("i", $sid);
  $updateApplication->execute();
  $updateApplication->close();
}
if ($_POST['type'] == "new") {
  //insert new record
  $insertCC = $conn->prepare("INSERT INTO campus_champions(uid, carnegie_code, approved, classification) VALUES (?,?,?,?)");
  $insertCC->bind_param("ssss", $uid, $carnegieCode, $approved, $classification);
  $insertCC->execute();
  $insertCC->close();
  header("Location: ./campus_champions.php"); exit;
} elseif ($_POST['type'] == "update") {
  //update existing record
  if (isset($_POST['cc_id'])) { $ccId = $conn->real_escape_string($_POST['cc_id']); } else { header("Location: ./campus_champions.php"); exit; }
  $updateCC = $conn->prepare("UPDATE campus_champions SET carnegie_code=?, approved=?, classification=? WHERE id=?");
  $updateCC->bind_param("ssss", $carnegieCode, $approved, $classification, $ccId);
  $updateCC->execute();
  $updateCC->close();
  header("Location: ./campus_champions.php"); exit;
} else {
  header("Location: ./campus_champions.php"); exit;
}
?>
