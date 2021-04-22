<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="MobileOptimized" content="width" />
  <meta name="HandheldFriendly" content="true" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="shortcut icon" href="/themes/nect-theme/favicon.ico" type="image/vnd.microsoft.icon" />

  <meta name="rights" content="/site-information-and-policies" />
  <meta name="apple-mobile-web-app-title" content="Cyberteam Portal">
  <title>Students With/Without Project | Cyberteam Portal</title>
  <link rel="stylesheet" media="all" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
  <link rel="stylesheet" media="all" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  <link rel="stylesheet" media="all" href="https://use.typekit.net/awb5aoh.css" />
  <link rel="stylesheet" media="all" href="https://necyberteam.org/themes/nect-theme/css/style.css" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/jquery.mark.min.js"></script>

  <script>
  function browserCanUseCssVariables() {
    return window.CSS && CSS.supports('color', 'var(--fake-var)');
  }
  if (!browserCanUseCssVariables()) {
    var oldBrowserStyles = document.createElement('link');
    oldBrowserStyles.rel = 'stylesheet';
    oldBrowserStyles.type = 'text/css';
    oldBrowserStyles.href = '/themes/nect-theme/css/style-ie.css';
    document.head.appendChild(oldBrowserStyles);
    alert('This website works best in modern browsers. Please consider updating.');
  }
</script>
</head>
<body>
  <div class="container">
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
    ?><div class="my-3"><a href="./students-project-export.php" target="_blank" class="btn btn-primary btn-sm float-right"><i class="fa fa-download"></i> Export Zip</a></div><?php
    $getStudentsWithProjectQuery = 'SELECT DISTINCT webform_submission_data.value AS uid, user__field_user_first_name.field_user_first_name_value AS first_name, user__field_user_last_name.field_user_last_name_value AS last_name, users_field_data.mail AS email, users_field_data.created AS created, taxonomy_term_field_data.name AS program FROM webform_submission_data LEFT JOIN user__field_user_first_name ON webform_submission_data.value = user__field_user_first_name.entity_id LEFT JOIN user__field_user_last_name ON webform_submission_data.value = user__field_user_last_name.entity_id LEFT JOIN users_field_data ON webform_submission_data.value = users_field_data.uid LEFT JOIN user__field_region ON webform_submission_data.value = user__field_region.entity_id LEFT JOIN taxonomy_term_field_data ON user__field_region.field_region_target_id = taxonomy_term_field_data.tid WHERE webform_submission_data.name="student" && webform_submission_data.webform_id="project" ORDER BY CAST(webform_submission_data.value AS unsigned) ASC';
    $getStudentsWithProject = $conn->prepare($getStudentsWithProjectQuery);
    $getStudentsWithProject->execute();
    $gStuWithResult = $getStudentsWithProject->get_result();
    if ($gStuWithResult->num_rows > 0) { ?>
      <h3>Students With Project</h3>
      <div class="table-responsive">
        <table class="table table-sm table-hover">
          <thead>
            <tr>
              <th scope="col">uid</th>
              <th scope="col">first_name</th>
              <th scope="col">last_name</th>
              <th scope="col">email</th>
              <th scope="col">joined</th>
              <th scope="col">program</th>
            </tr>
          </thead>
          <tbody><?php
          while($user = $gStuWithResult->fetch_assoc()) { ?>
          <tr>
            <td><?php echo $user["uid"]; ?></td>
            <td><?php echo $user["first_name"]; ?></td>
            <td><?php echo $user["last_name"]; ?></td>
            <td><?php echo $user["email"]; ?></td>
            <td><?php echo date("m/d/Y", $user["created"]); ?></td>
            <td><?php echo $user["program"]; ?></td>
          </tr>
        <?php } ?>
      </tbody>
    </table>
  </div><?php
} else { ?>
  <div class="alert alert-warning">There are no users.</div>
<?php }
$getStudentsWithProject->close();
?>

<hr></hr>

<?php
$getStudentsWithoutProjectQuery = 'SELECT user__roles.entity_id AS uid, user__field_user_first_name.field_user_first_name_value AS first_name, user__field_user_last_name.field_user_last_name_value AS last_name, users_field_data.mail AS email, users_field_data.created AS created, taxonomy_term_field_data.name AS program FROM user__roles LEFT JOIN user__field_user_first_name ON user__roles.entity_id = user__field_user_first_name.entity_id LEFT JOIN user__field_user_last_name ON user__roles.entity_id = user__field_user_last_name.entity_id LEFT JOIN users_field_data ON user__roles.entity_id = users_field_data.uid LEFT JOIN user__field_region ON user__roles.entity_id = user__field_region.entity_id LEFT JOIN taxonomy_term_field_data ON user__field_region.field_region_target_id = taxonomy_term_field_data.tid WHERE user__roles.roles_target_id = "student" && user__roles.entity_id NOT IN (SELECT DISTINCT webform_submission_data.value FROM webform_submission_data WHERE webform_submission_data.name="student" && webform_submission_data.webform_id="project") ORDER BY CAST(user__roles.entity_id AS unsigned) ASC';
$getStudentsWithoutProject = $conn->prepare($getStudentsWithoutProjectQuery);
$getStudentsWithoutProject->execute();
$gStuWithoutResult = $getStudentsWithoutProject->get_result();
if ($gStuWithoutResult->num_rows > 0) { ?>
  <h3>Students Without Project</h3>
  <div class="table-responsive">
    <table class="table table-sm table-hover">
      <thead>
        <tr>
          <th scope="col">uid</th>
          <th scope="col">first_name</th>
          <th scope="col">last_name</th>
          <th scope="col">email</th>
          <th scope="col">joined</th>
          <th scope="col">program</th>
        </tr>
      </thead>
      <tbody><?php
      while($user = $gStuWithoutResult->fetch_assoc()) { ?>
      <tr>
        <td><?php echo $user["uid"]; ?></td>
        <td><?php echo $user["first_name"]; ?></td>
        <td><?php echo $user["last_name"]; ?></td>
        <td><?php echo $user["email"]; ?></td>
        <td><?php echo date("m/d/Y", $user["created"]); ?></td>
        <td><?php echo $user["program"]; ?></td>
      </tr>
    <?php } ?>
  </tbody>
</table>
</div><?php
} else { ?>
  <div class="alert alert-warning">There are no users.</div>
<?php }
$getStudentsWithoutProject->close();
$conn->close();
?>

</div>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/picturefill/2.3.1/picturefill.min.js"></script>
<script src="https://necyberteam.org/themes/nect-theme/js/main.js"></script>

</body>
</html>
