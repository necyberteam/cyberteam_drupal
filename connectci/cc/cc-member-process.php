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
//if (isset($_POST['sid'])) { $sid = $conn->real_escape_string($_POST['sid']); } else { header("Location: ./campus_champions.php"); exit; }
if (isset($_POST['carnegie_code'])) { $carnegieCode = $conn->real_escape_string($_POST['carnegie_code']); } else { $carnegieCode = ""; }
if (isset($_POST['classification'])) { $classification = $conn->real_escape_string($_POST['classification']); } else { $classification = ""; }
if (isset($_POST['approved'])) { $approved = $conn->real_escape_string($_POST['approved']); } else { $approved = "0"; }
if (isset($sid) && $sid != "") {
  $updateApplication = $conn->prepare('UPDATE webform_submission_data SET value="reviewed" WHERE sid=? and name="status" and webform_id="join_campus_champions"');
  $updateApplication->bind_param("i", $sid);
  $updateApplication->execute();
  $updateApplication->close();
}
// Update user__field_is_cc table with approved status
$bundle = 'user';
$deleted = 0;
$entity_id = $uid;
$revision_id = $uid;
$langcode = 'en';
$delta = 0;
$region_id = 572; // Campus Champions Region
$updateCC = $conn->prepare("INSERT INTO user__field_is_cc (bundle, deleted, entity_id, revision_id, langcode, delta, field_is_cc_value) VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE field_is_cc_value = ?");
$updateCC->bind_param("sisisiss", $bundle, $deleted, $entity_id, $revision_id, $langcode, $delta, $approved, $approved);
$updateCC->execute();
$updateCC->close();
// Update user__field_regions table
if ($approved) {
  // Set delta to one more than the current highest number
  $sql = 'select MAX(delta) from user__field_region ufr WHERE ufr.entity_id='.$entity_id;
  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      $delta = $row['MAX(delta)'] + 1;
    }
  }
  $updateCC = $conn->prepare("INSERT INTO user__field_region (bundle, deleted, entity_id, revision_id, langcode, delta, field_region_target_id) VALUES (?,?,?,?,?,?,?)");
  $updateCC->bind_param("sisisii", $bundle, $deleted, $entity_id, $revision_id, $langcode, $delta, $region_id);
} else {
  $updateCC = $conn->prepare("DELETE FROM user__field_region ufr WHERE ufr.entity_id = ? AND ufr.field_region_target_id = ?");
  $updateCC->bind_param("ss", $entity_id, $region_id);
}
$updateCC->execute();
$updateCC->close();
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
