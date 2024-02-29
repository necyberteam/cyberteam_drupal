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
  <title>Tag Checker | Cyberteam Portal</title>
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
<body class="bg-light">
  <div class="container my-3">
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

    $tagsToCheckArray = array(
      //array(31,220),
      array(47,171,203),
      array(53,17),
      //array(56,508),
      //array(61,22),
      //array(63,185),
      array(66,6),
      //array(75,223),
      //array(81,417),
      array(82,317,378),
      //array(86,492),
      //array(90,486),
      //array(163,87),
      //array(186,437),
      //array(212,446),
      array(249,319),
      //array(266,431),
      //array(271,389),
      //array(272,403),
      //array(277,412),
      //array(288,408),
      //array(303,390),
      //array(316,388),
      //array(330,420),
      //array(374,301),
      //array(376,80),
      //array(415,214),
      //array(426,9),
      //array(428,299),
      //array(432,211),
      array(456,361),
      //array(463,41),
      //array(464,534),
      //array(468,33),
      //array(472,360),
      //array(475,340),
      //array(485,302),
      array(490,454)
    );

    foreach ($tagsToCheckArray as $tagsToCheck) {
      ?><div class="card mb-3"><div class="card-body"><?php
      $getTermName = $conn->prepare("SELECT tid, status, name FROM taxonomy_term_field_data WHERE tid in (" . implode(',', $tagsToCheck) . ")");
      $getTermName->execute();
      $getTermNameResults = $getTermName->get_result();
      if ($getTermNameResults->num_rows > 0) {
        ?><div class="mb-2"><strong>Showing Tags:</strong> <?php
        $i = 1;
        while ($tag = $getTermNameResults->fetch_assoc()) {
          echo $tag['name'] . " (".$tag['tid'].")";
          echo ($i++ < $getTermNameResults->num_rows) ? ', ' : '';
          $tagInfo[$tag['tid']] = array("tid" => $tag['tid'], "name" => $tag['name']);
          $peopleWithSkill = $conn->prepare("SELECT users_field_data.uid, user__field_user_first_name.field_user_first_name_value AS first_name, user__field_user_last_name.field_user_last_name_value AS last_name FROM users_field_data LEFT JOIN user__field_user_first_name ON users_field_data.uid = user__field_user_first_name.entity_id LEFT JOIN user__field_user_last_name ON users_field_data.uid = user__field_user_last_name.entity_id LEFT JOIN flagging ON users_field_data.uid = flagging.uid LEFT JOIN taxonomy_term_field_data ON flagging.entity_id = taxonomy_term_field_data.tid WHERE flagging.flag_id = 'skill' && taxonomy_term_field_data.tid = ?");
          $peopleWithSkill->bind_param("i", $tag['tid']);
          $peopleWithSkill->execute();
          $peopleWithSkillResult = $peopleWithSkill->get_result();
          if ($peopleWithSkillResult->num_rows > 0) {
            while($person = $peopleWithSkillResult->fetch_assoc()) {
              $peopleWithSkillArray[$tag['tid']][] = array("tid" => $tag['tid'], "name" => $tag['name'], "uid" => $person['uid'], "first_name" => $person['first_name'], "last_name" => $person['last_name']);
            }
          }
          $peopleWithSkill->close();

          $peopleWithInterest = $conn->prepare("SELECT users_field_data.uid, user__field_user_first_name.field_user_first_name_value AS first_name, user__field_user_last_name.field_user_last_name_value AS last_name FROM users_field_data LEFT JOIN user__field_user_first_name ON users_field_data.uid = user__field_user_first_name.entity_id LEFT JOIN user__field_user_last_name ON users_field_data.uid = user__field_user_last_name.entity_id LEFT JOIN flagging ON users_field_data.uid = flagging.uid LEFT JOIN taxonomy_term_field_data ON flagging.entity_id = taxonomy_term_field_data.tid WHERE flagging.flag_id = 'interest' && taxonomy_term_field_data.tid = ?");
          $peopleWithInterest->bind_param("i", $tag['tid']);
          $peopleWithInterest->execute();
          $peopleWithInterestResult = $peopleWithInterest->get_result();
          if ($peopleWithInterestResult->num_rows > 0) {
            while($person = $peopleWithInterestResult->fetch_assoc()) {
              $peopleWithInterestArray[$tag['tid']][] = array("tid" => $tag['tid'], "name" => $tag['name'], "uid" => $person['uid'], "first_name" => $person['first_name'], "last_name" => $person['last_name']);
            }
          }
          $peopleWithInterest->close();


          $projectsWithTag = $conn->prepare("SELECT webform_submission_data.sid, webform_submission_data.value AS project_title FROM webform_submission_data WHERE webform_submission_data.sid IN (SELECT webform_submission_data.sid FROM webform_submission_data WHERE webform_submission_data.name = 'tags' && webform_submission_data.value = ?) && webform_submission_data.name = 'project_title' && webform_submission_data.webform_id='project'");
          $projectsWithTag->bind_param("i", $tag['tid']);
          $projectsWithTag->execute();
          $projectsWithTagResult = $projectsWithTag->get_result();
          if ($projectsWithTagResult->num_rows > 0) {
            while($project = $projectsWithTagResult->fetch_assoc()) {
              $projectsWithTagArray[$tag['tid']][] = array("tid" => $tag['tid'], "name" => $tag['name'], "sid" => $project['sid'], "project_title" => $project['project_title']);
            }
          }
          $projectsWithTag->close();

          $resourcesWithTag = $conn->prepare("SELECT webform_submission_data.sid, webform_submission_data.value AS resource_title FROM webform_submission_data WHERE webform_submission_data.sid IN (SELECT webform_submission_data.sid FROM webform_submission_data WHERE webform_submission_data.name = 'tags' && webform_submission_data.value = ?) && webform_submission_data.name = 'title' && webform_submission_data.webform_id='resource'");
          $resourcesWithTag->bind_param("i", $tag['tid']);
          $resourcesWithTag->execute();
          $resourcesWithTagResult = $resourcesWithTag->get_result();
          if ($resourcesWithTagResult->num_rows > 0) {
            while($resource = $resourcesWithTagResult->fetch_assoc()) {
              $resourcesWithTagArray[$tag['tid']][] = array("tid" => $tag['tid'], "name" => $tag['name'], "sid" => $resource['sid'], "resource_title" => $resource['resource_title']);
            }
          }
          $resourcesWithTag->close();

          $nodesWithTag = $conn->prepare("SELECT node__field_tags.bundle, node__field_tags.entity_id, node__field_tags.field_tags_target_id, node_field_data.title, taxonomy_term_field_data.name FROM node__field_tags LEFT JOIN node_field_data ON node__field_tags.entity_id = node_field_data.nid LEFT JOIN taxonomy_term_field_data on node__field_tags.field_tags_target_id = taxonomy_term_field_data.tid WHERE node__field_tags.field_tags_target_id = ?");
          /* Alternate query: SELECT taxonomy_index.nid, taxonomy_index.tid, node__field_tags.bundle, node_field_data.title, taxonomy_term_field_data.name FROM taxonomy_index LEFT JOIN node_field_data ON taxonomy_index.nid = node_field_data.nid LEFT JOIN node__field_tags ON taxonomy_index.tid = node__field_tags.field_tags_target_id LEFT JOIN taxonomy_term_field_data ON taxonomy_index.tid = taxonomy_term_field_data.tid WHERE taxonomy_index.tid = ?;*/
          $nodesWithTag->bind_param("i", $tag['tid']);
          $nodesWithTag->execute();
          $nodesWithTagResult = $nodesWithTag->get_result();
          if ($nodesWithTagResult->num_rows > 0) {
            while($node = $nodesWithTagResult->fetch_assoc()) {
              $nodesWithTagArray[$tag['tid']][] = array("tid" => $tag['tid'], "name" => $tag['name'], "bundle" => $node['bundle'], "nid" => $node['entity_id'], "node_title" => $node['title']);
            }
          }
          $nodesWithTag->close();

        }
        ?><br></div><?php
        foreach ($tagsToCheck as $tag) {
          if (isset($tagInfo[$tag])) {
            ?><div class="card mb-2"><div class="card-body"><?php
            if($peopleWithSkillArray[$tag]) {
              ?><strong>People With <?php echo $tagInfo[$tag]['name'] . " (".$tagInfo[$tag]['tid'].")"; ?> as Skill</strong>
              <div class="table-responsive my-2">
                <table class="table table-sm table-hover">
                  <thead>
                    <tr>
                      <th scope="col">uid</th>
                      <th scope="col">first_name</th>
                      <th scope="col">last_name</th>
                      <th scope="col">view profile</th>
                    </tr>
                  </thead>
                  <tbody>
                    <?php foreach ($peopleWithSkillArray[$tag] as $person) { ?>
                      <tr>
                        <td><?php echo $person['uid']; ?></td>
                        <td><?php echo $person['first_name']; ?></td>
                        <td><?php echo $person['last_name']; ?></td>
                        <td><a href="https://necyberteam.org/user/<?php echo $person['uid'];?>" target="_blank">view profile</a></td>
                      </tr>
                    <?php } ?>
                  </tbody>
                </table>
              </div><?php
            } else {
              ?><div class="alert alert-info my-2">There are no people with <?php echo $tagInfo[$tag]['name'] . " (".$tagInfo[$tag]['tid'].")"; ?> as Skill</div><?php
            }
            if($peopleWithInterestArray[$tag]) {
              ?><strong>People With <?php echo $tagInfo[$tag]['name'] . " (".$tagInfo[$tag]['tid'].")"; ?> as Interest</strong>
              <div class="table-responsive my-2">
                <table class="table table-sm table-hover">
                  <thead>
                    <tr>
                      <th scope="col">uid</th>
                      <th scope="col">first_name</th>
                      <th scope="col">last_name</th>
                      <th scope="col">view profile</th>
                    </tr>
                  </thead>
                  <tbody>
                    <?php foreach ($peopleWithInterestArray[$tag] as $person) { ?>
                      <tr>
                        <td><?php echo $person['uid']; ?></td>
                        <td><?php echo $person['first_name']; ?></td>
                        <td><?php echo $person['last_name']; ?></td>
                        <td><a href="https://necyberteam.org/user/<?php echo $person['uid'];?>" target="_blank">view profile</a></td>
                      </tr>
                    <?php } ?>
                  </tbody>
                </table>
              </div><?php
            } else {
              ?><div class="alert alert-info my-2">There are no people with <?php echo $tagInfo[$tag]['name'] . " (".$tagInfo[$tag]['tid'].")"; ?> as Interest</div><?php
            }
            if($projectsWithTagArray[$tag]) {
              ?><strong>Projects With <?php echo $tagInfo[$tag]['name'] . " (".$tagInfo[$tag]['tid'].")"; ?> as Tag</strong>
              <div class="table-responsive my-2">
                <table class="table table-sm table-hover">
                  <thead>
                    <tr>
                      <th scope="col">sid</th>
                      <th scope="col">project_title</th>
                      <th scope="col">view project</th>
                    </tr>
                  </thead>
                  <tbody>
                    <?php foreach ($projectsWithTagArray[$tag] as $project) { ?>
                      <tr>
                        <td><?php echo $project['sid']; ?></td>
                        <td><?php echo $project['project_title']; ?></td>
                        <td><a href="https://necyberteam.org/project/<?php echo $project['sid'];?>" target="_blank">view project</a></td>
                      </tr>
                    <?php } ?>
                  </tbody>
                </table>
              </div><?php
            } else {
              ?><div class="alert alert-info my-2">There are no projects with <?php echo $tagInfo[$tag]['name'] . " (".$tagInfo[$tag]['tid'].")"; ?> as tag.</div><?php
            }
            if($resourcesWithTagArray[$tag]) {
              ?><strong>Resources With <?php echo $tagInfo[$tag]['name'] . " (".$tagInfo[$tag]['tid'].")"; ?> as Tag</strong>
              <div class="table-responsive my-2">
                <table class="table table-sm table-hover">
                  <thead>
                    <tr>
                      <th scope="col">sid</th>
                      <th scope="col">resource_title</th>
                      <th scope="col">view resource</th>
                    </tr>
                  </thead>
                  <tbody>
                    <?php foreach ($resourcesWithTagArray[$tag] as $resource) { ?>
                      <tr>
                        <td><?php echo $resource['sid']; ?></td>
                        <td><?php echo $resource['resource_title']; ?></td>
                        <td><a href="https://necyberteam.org/resource/<?php echo $resource['sid'];?>" target="_blank">view resource</a></td>
                      </tr>
                    <?php } ?>
                  </tbody>
                </table>
              </div><?php
            } else {
              ?><div class="alert alert-info my-2">There are no resources with <?php echo $tagInfo[$tag]['name'] . " (".$tagInfo[$tag]['tid'].")"; ?> as tag.</div><?php
            }
            if($nodesWithTagArray[$tag]) {
              ?><strong>Content With <?php echo $tagInfo[$tag]['name'] . " (".$tagInfo[$tag]['tid'].")"; ?> as Tag</strong>
              <div class="table-responsive my-2">
                <table class="table table-sm table-hover">
                  <thead>
                    <tr>
                      <th scope="col">content_type</th>
                      <th scope="col">nid</th>
                      <th scope="col">content_title</th>
                      <th scope="col">view content</th>
                    </tr>
                  </thead>
                  <tbody>
                    <?php foreach ($nodesWithTagArray[$tag] as $node) { ?>
                      <tr>
                        <td><?php echo $node['bundle']; ?></td>
                        <td><?php echo $node['nid']; ?></td>
                        <td><?php echo $node['node_title']; ?></td>
                        <td><a href="https://necyberteam.org/node/<?php echo $node['nid'];?>" target="_blank">view content</a></td>
                      </tr>
                    <?php } ?>
                  </tbody>
                </table>
              </div><?php
            } else {
              ?><div class="alert alert-info my-2">There is no content with <?php echo $tagInfo[$tag]['name'] . " (".$tagInfo[$tag]['tid'].")"; ?> as tag.</div><?php
            }
            ?></div></div><?php
          }
        }
      }
      $getTermName->close();
      ?></div></div><?php
    }


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
