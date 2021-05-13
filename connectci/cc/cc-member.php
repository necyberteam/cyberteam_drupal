<?php
session_start();
if(empty($_SESSION["uid"]) || empty($_SESSION['campus_champions_admin'])) {
  header("Location: ./cc-login.php"); exit;
}
if (isset($_GET['uid']) && preg_match("/^[0-9]*$/", $_GET['uid'])) {
  $uid = $_GET['uid'];
} else {
  header("Location: ./campus_champions.php"); exit;
}
if (isset($_GET['application_id']) && preg_match("/^[0-9]*$/", $_GET['application_id'])) {
  $sid = $_GET['application_id'];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="MobileOptimized" content="width" />
  <meta name="HandheldFriendly" content="true" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <meta name="rights" content="/site-information-and-policies" />
  <meta name="apple-mobile-web-app-title" content="Cyberteam Portal">
  <title>Campus Champions | Cyberteam Portal</title>
  <link href="https://cdn.datatables.net/buttons/1.7.0/css/buttons.dataTables.min.css" rel="stylesheet" crossorigin="anonymous" />
  <link href="https://cdn.datatables.net/1.10.23/css/dataTables.bootstrap4.min.css" rel="stylesheet" crossorigin="anonymous" />
  <link href="https://cdn.datatables.net/buttons/1.7.0/css/buttons.bootstrap4.min.css" rel="stylesheet" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
  <link rel="stylesheet" media="all" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  <link rel="stylesheet" media="all" href="https://use.typekit.net/awb5aoh.css" />
  <link rel="stylesheet" media="all" href="https://necyberteam.org/themes/nect-theme/css/style.css" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

  <script>
  function browserCanUseCssVariables() {
    return window.CSS && CSS.supports('color', 'var(--fake-var)');
  }
  if (!browserCanUseCssVariables()) {
    var oldBrowserStyles = document.createElement('link');
    oldBrowserStyles.rel = 'stylesheet';
    oldBrowserStyles.type = 'text/css';
    oldBrowserStyles.href = 'https://necyberteam.org/themes/nect-theme/css/style-ie.css';
    document.head.appendChild(oldBrowserStyles);
    alert('This website works best in modern browsers. Please consider updating.');
  }
</script>
</head>
<body onload="parent.postMessage(document.body.scrollHeight, '*');">
  <div class="container">
    <?php
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
    require '../../db-info.php';
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) { ?>
      <div class="alert alert-danger"><strong>Connection Error:</strong> Please contact a system administrator.</div>
    <?php } ?>
    <div class="my-2"><?php include "./message.php"; ?></div>
    <div class="card my-2">
      <div class="card-body">
        <form method="POST" action="./cc-member-process.php">
          <section class="row justify-content-center">
            <div class="col mx-auto">
              <?php
              $findUserQuery = 'SELECT (SELECT count(*) FROM (SELECT uid FROM campus_champions WHERE uid=?) tl) as in_cc, cc.id as cc_id, ue.uid, cc.approved, cc.carnegie_code, cc.classification, uf.field_user_first_name_value AS first_name, ul.field_user_last_name_value AS last_name, ue.mail AS email, ui.field_institution_value AS institution FROM users_field_data ue LEFT JOIN user__field_user_first_name uf ON ue.uid = uf.entity_id LEFT JOIN user__field_user_last_name ul ON ue.uid = ul.entity_id LEFT JOIN campus_champions cc ON ue.uid = cc.uid LEFT JOIN user__field_institution ui ON ue.uid = ui.entity_id WHERE ue.uid=?';
              $findUser = $conn->prepare($findUserQuery);
              $findUser->bind_param("ii",$uid, $uid);
              $findUser->execute();
              $findUserResult = $findUser->get_result();
              if ($findUserResult->num_rows > 0) {
                while($row = $findUserResult->fetch_assoc()) {
                  if ($row['in_cc'] == 0) {
                    //new entry ?>
                    <input type="hidden" name="type" value="new">
                  <?php } else {
                    //update entry ?>
                    <input type="hidden" name="type" value="update">
                    <input type="hidden" name="cc_id" value="<?php echo $row['cc_id']; ?>">
                  <?php }
                  if (isset($sid) && $sid != "") { ?>
                    <input type="hidden" name="sid" value="<?php echo $sid; ?>">
                  <?php }
                  ?>
                  <input type="hidden" name="uid" value="<?php echo $uid; ?>">
                  <div class="form-row">
                    <div class="col-md-4 mb-3">
                      <input type="text" name="f_name" class="form-control" placeholder="First name" value="<?php echo !empty($row['first_name']) ? $row['first_name'] : '';?>" disabled>
                    </div>
                    <div class="col-md-4 mb-3">
                      <input type="text" name="l_name" class="form-control" placeholder="Last name" value="<?php echo !empty($row['last_name']) ? $row['last_name'] : '';?>" disabled>
                    </div>
                    <div class="col-md-4 mb-3">
                      <input type="text" name="email" class="form-control" placeholder="Email" value="<?php echo !empty($row['email']) ? $row['email'] : '';?>" disabled>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-6 mb-3">
                      <input type="text" name="carnegie_code" class="form-control" placeholder="Carnegie Code" value="<?php echo !empty($row['carnegie_code']) ? $row['carnegie_code'] : '';?>" required>
                    </div>
                    <div class="col-md-6 mb-3">
                      <input type="text" name="institution" class="form-control" placeholder="Institution" value="<?php echo !empty($row['institution']) ? $row['institution'] : '';?>" disabled>
                    </div>
                  </div>
                  <div class="form-row align-items-center">
                    <div class="col-md-6 mb-3">
                      <select name="classification" class="custom-select">
                        <option <?php echo empty($row['classification']) ? 'selected' : ''; ?> value="">Choose classification...</option>
                        <option <?php echo ($row['classification'] == 'champion') ? 'selected' : ''; ?> value="champion">Champion</option>
                        <option <?php echo ($row['classification'] == 'student') ? 'selected' : ''; ?> value="student">Student</option>
                        <option <?php echo ($row['classification'] == 'alumni') ? 'selected' : ''; ?> value="alumni">Alumni</option>
                      </select>
                    </div>
                    <div class="col-md-6 mb-3">
                      <div class="custom-control custom-checkbox">
                        <input type="hidden" name="approved" value="0">
                        <input type="checkbox" class="custom-control-input" id="approved" name="approved" value="1" <?php echo ($row['approved'] == "1") ? 'checked' : ''; ?>>
                        <label class="custom-control-label" for="approved">Approved?</label>
                      </div>
                    </div>
                  </div>
                  <?php
                }
              } else {
                //user does not exist
                header("Location: ./campus_champions.php"); exit;
              }
              $findUser->close();
              $conn->close();
              ?>
              <input type="submit" class="btn btn-primary btn-sm" value="Save">
            </div>
          </section>
        </form>
      </div>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js" crossorigin="anonymous"></script>
  <script src="https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js" crossorigin="anonymous"></script>
  <script src="https://cdn.datatables.net/1.10.23/js/dataTables.bootstrap4.min.js" crossorigin="anonymous"></script>
  <script src="https://cdn.datatables.net/buttons/1.7.0/js/dataTables.buttons.min.js" crossorigin="anonymous"></script>
  <script src="https://cdn.datatables.net/buttons/1.7.0/js/buttons.bootstrap4.min.js" crossorigin="anonymous"></script>
  <script src="https://cdn.datatables.net/buttons/1.7.0/js/buttons.html5.min.js" crossorigin="anonymous"></script>
  <script src="https://cdn.datatables.net/buttons/1.7.0/js/buttons.print.min.js" crossorigin="anonymous"></script>
  <script src="https://cdn.datatables.net/buttons/1.7.0/js/buttons.colVis.min.js" crossorigin="anonymous"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.contentWindow.min.js"></script>
</body>
</html>
