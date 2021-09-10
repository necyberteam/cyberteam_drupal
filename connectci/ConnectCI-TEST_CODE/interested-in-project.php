<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="MobileOptimized" content="width" />
  <meta name="HandheldFriendly" content="true" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <meta name="rights" content="/site-information-and-policies" />
  <meta name="apple-mobile-web-app-title" content="Cyberteam Portal">
  <title>Interested In Project | Cyberteam Portal</title>
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
    oldBrowserStyles.href = '/themes/nect-theme/css/style-ie.css';
    document.head.appendChild(oldBrowserStyles);
    alert('This website works best in modern browsers. Please consider updating.');
  }
</script>
</head>
<body>
  <div class="container-fluid">
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
    ?><div class="my-3"><a href="./interested-in-project-export.php" target="_blank" class="btn btn-primary btn-sm float-right"><i class="fa fa-download"></i> Export</a></div>
    <div class="table-responsive">
      <table class="table table-sm table-hover" id="interestedTable">
      <thead>
        <tr>
          <th>project_title</th>
          <th>name</th>
          <th>email</th>
          <th>date_interested</th>
          <th>user_program</th>
          <th>project_program</th>
          <th>project_leader_email</th>
          <th>project_leader</th>
        </tr>
      </thead>
      <tbody>
        <?php
        $getInterestInProjectQuery = 'SELECT a.id, a.flag_id, a.entity_id, a.uid, a.created, b.sid, b.value AS project_title, c.field_user_first_name_value AS first_name, d.field_user_last_name_value AS last_name, e.mail AS email, taxonomy_term_field_data.name AS user_program, f.value as pl_first, g.value as pl_last, h.value as pl_email, i.value as p_program FROM flagging a LEFT JOIN webform_submission_data b ON a.entity_id = b.sid && b.name="project_title" LEFT JOIN user__field_user_first_name c ON a.uid = c.entity_id LEFT JOIN user__field_user_last_name d ON a.uid = d.entity_id LEFT JOIN users_field_data e ON a.uid = e.uid LEFT JOIN user__field_region ON a.uid = user__field_region.entity_id LEFT JOIN taxonomy_term_field_data ON user__field_region.field_region_target_id = taxonomy_term_field_data.tid LEFT JOIN webform_submission_data f ON a.entity_id = f.sid && f.name="project_leader" && f.property="first" LEFT JOIN webform_submission_data g ON a.entity_id = g.sid && g.name="project_leader" && g.property="last" LEFT JOIN webform_submission_data h ON a.entity_id = h.sid && h.name="email" LEFT JOIN webform_submission_data i ON a.entity_id = i.sid && i.name="region" WHERE a.flag_id="interested_in_project"';
        $getInterestInProject = $conn->prepare($getInterestInProjectQuery);
        $getInterestInProject->execute();
        $getInterestInProjectResult = $getInterestInProject->get_result();
        if ($getInterestInProjectResult->num_rows > 0) {
          while($row = $getInterestInProjectResult->fetch_assoc()) { ?>
            <tr>
            <td><?php echo $row['project_title']; ?></td>
            <td><?php echo $row['last_name']; ?>, <?php echo $row['first_name']; ?></td>
            <td><?php echo $row['email']; ?></td>
            <td><?php echo date("m/d/Y", $row['created']); ?></td>
            <td><?php echo $row['user_program']; ?></td>
            <td><?php echo $row['p_program']; ?></td>
            <td><?php echo $row['pl_email']; ?></td>
            <td><?php echo $row['pl_last']; ?>, <?php echo $row['pl_first']; ?></td>
          </tr>
          <?php }
        } ?>
      </tbody>
    </table>
  </div><?php
    $getInterestInProject->close();
    $conn->close();
    /*$getStudentsWithProjectQuery = 'SELECT DISTINCT webform_submission_data.value AS uid, user__field_user_first_name.field_user_first_name_value AS first_name, user__field_user_last_name.field_user_last_name_value AS last_name, users_field_data.mail AS email, users_field_data.created AS created, taxonomy_term_field_data.name AS program FROM webform_submission_data LEFT JOIN user__field_user_first_name ON webform_submission_data.value = user__field_user_first_name.entity_id LEFT JOIN user__field_user_last_name ON webform_submission_data.value = user__field_user_last_name.entity_id LEFT JOIN users_field_data ON webform_submission_data.value = users_field_data.uid LEFT JOIN user__field_region ON webform_submission_data.value = user__field_region.entity_id LEFT JOIN taxonomy_term_field_data ON user__field_region.field_region_target_id = taxonomy_term_field_data.tid WHERE webform_submission_data.name="student" && webform_submission_data.webform_id="project" ORDER BY CAST(webform_submission_data.value AS unsigned) ASC';*/
    ?>

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

  <script>
  $(document).ready(function() {
    $('#interestedTable').DataTable({
      "paging":false
    });
  });
</script>
</body>
</html>
