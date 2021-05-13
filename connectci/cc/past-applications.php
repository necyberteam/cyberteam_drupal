<?php
session_start();
if(empty($_SESSION["uid"]) || empty($_SESSION['campus_champions_admin'])) {
  header("Location: ./cc-login.php"); exit;
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
  <link href="https://cdn.datatables.net/plug-ins/1.10.24/features/searchHighlight/dataTables.searchHighlight.css" rel="stylesheet" />
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
  <div class="container-fluid">
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
    <div class="my-3"><a href="./campus_champions.php"><i class="fa fa-arrow-left pr-1"></i> back</a></div>
    <div class="card mb-3">
      <div class="card-body">
        <h3>Past Applications</h3>
        <div class="table-responsive">
          <table class="table table-sm table-hover" id="pastApplicationsTable">
            <thead>
              <tr>
                <th>name</th>
                <th>email</th>
                <th>institution</th>
                <th>application_date</th>
                <th>letter_of_collaboration</th>
                <th>review</th>
              </tr>
            </thead>
            <tbody>
              <?php
              include "./drupal-url.php";
              $getPastQuery = 'SELECT s.sid, s.completed, s.uid, f.uri, uf.field_user_first_name_value AS first_name, ul.field_user_last_name_value AS last_name, ue.mail AS email, ui.field_institution_value AS institution FROM webform_submission s LEFT JOIN webform_submission_data d ON s.sid = d.sid and d.name = "letter_of_collaboration" LEFT JOIN webform_submission_data status ON s.sid = status.sid and status.name = "status" LEFT JOIN file_managed f ON f.fid = d.value LEFT JOIN user__field_user_first_name uf ON s.uid = uf.entity_id LEFT JOIN user__field_user_last_name ul ON s.uid = ul.entity_id LEFT JOIN users_field_data ue ON s.uid = ue.uid LEFT JOIN user__field_institution ui ON s.uid = ui.entity_id WHERE s.webform_id = "join_campus_champions" and status.value="reviewed"';
              $getPast = $conn->prepare($getPastQuery);
              $getPast->execute();
              $getPastResult = $getPast->get_result();
              if ($getPastResult->num_rows > 0) {
                while($row = $getPastResult->fetch_assoc()) { ?>
                  <tr>
                    <td><?php echo $row['last_name']; ?>, <?php echo $row['first_name']; ?></td>
                    <td><?php echo $row['email']; ?></td>
                    <td><?php echo $row['institution']; ?></td>
                    <td><?php echo date("m/d/Y",$row['completed']); ?></td>
                    <td><a href="<?php echo str_replace("private://",$drupalUrl."/system/files/",$row['uri']); ?>" target="_blank"><i class="fa fa-download pr-1"></i> Download</a></td>
                    <td><a href="./cc-member.php?uid=<?php echo $row['uid']; ?>&application_id=<?php echo $row['sid']; ?>">review</a></td>
                  </tr>
                <?php }
              }
              $getPending->close();
              ?>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <?php
    $conn->close();
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
  <script src="https://cdn.datatables.net/plug-ins/1.10.24/features/searchHighlight/dataTables.searchHighlight.min.js" crossorigin="anonymous"></script>
  <script src="//bartaz.github.io/sandbox.js/jquery.highlight.js" crossorigin="anonymous"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.contentWindow.min.js"></script>
  <script>
    window.iFrameResizer = {
      targetOrigin: '*'
    }
  </script>
  <script>
  $(document).ready(function() {
    $('#pastApplicationsTable').DataTable({
      "paging":false,
      searchHighlight: true
    });
  });
</script>
</body>
</html>
