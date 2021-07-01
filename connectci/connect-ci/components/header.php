<!DOCTYPE html>
<html>

<head>
  <title><?php echo $page_title; ?> | <?php echo $program['site_title']; ?></title>
  <meta http-equiv=X-UA-Compatible content="IE=Edge,chrome=1" />
  <meta name=viewport content="width=device-width,initial-scale=1.0,maximum-scale=1.0" />

  <link href="https://cdn.datatables.net/buttons/1.7.0/css/buttons.dataTables.min.css" rel="stylesheet" crossorigin="anonymous" />
  <link href="https://cdn.datatables.net/1.10.23/css/dataTables.bootstrap4.min.css" rel="stylesheet" crossorigin="anonymous" />
  <link href="https://cdn.datatables.net/buttons/1.7.0/css/buttons.bootstrap4.min.css" rel="stylesheet" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha512-znmTf4HNoF9U6mfB6KlhAShbRvbt4CvCaHoNV0gyssfToNQ/9A0eNdUbvsSwOIUoJdMjFG2ndSvr0Lo3ZpsTqQ==" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
  <link rel="stylesheet" media="all" href="https://use.typekit.net/awb5aoh.css" />
  <link rel="stylesheet" href="<?php echo $site_path; ?>/css/style.php">
  <link rel="shortcut icon" href="<?php echo $site_path; ?>/favicon.ico" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>

<body class="<?php echo strtolower(str_replace(" ","-", $program['name'])) . "-cyberteam"; ?> bg-light" data-spy="scroll" data-target="#scroll" data-offset="1">
  <div class="wrapper">
      <nav class="navbar navbar-expand-sm" id="secondaryNav">
        <div class="container px-0">
          <button class="navbar-toggler navbar-toggler-right ml-auto py-1" type="button" data-toggle="collapse" data-target="#navbarSecondary" aria-controls="navbarSecondary" aria-expanded="false" aria-label="Admin Tools">
            <i class="fas fa-user pr-1"></i> User Menu
          </button>
          <div class="collapse navbar-collapse" id="navbarSecondary">
            <ul class="navbar-nav ml-auto">
              <?php include 'top-nav-items.php'; ?>
            </ul>
          </div>
        </div>
      </nav>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top shadow-sm py-lg-0" id="mainNav">
      <div class="container">
        <a class="navbar-brand" href="<?php echo $site_path; ?>/">
          <?php if (isset($program['logo']) && $program['logo'] != "") { ?>
            <img src="<?php echo $program['logo']; ?>" class="logo" alt="<?php echo $program['site_title']; ?>">
          <?php } else {
            echo $program['site_title'];
          } ?>
        </a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fa fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarMain">
          <ul class="navbar-nav ml-auto">
            <?php include 'nav-items.php'; ?>
          </ul>
        </div>
      </div>
    </nav>
    <?php if ($entity_type != "front") { include 'message.php'; } ?>
