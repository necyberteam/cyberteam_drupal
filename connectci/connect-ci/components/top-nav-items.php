<?php if (in_array("administrator", $_SESSION['roles']) && isset($_SESSION['tfa'])) { ?>
  <li class="nav-item"><a href="#" class="nav-link"><i class="fas fa-wrench pr-1"></i> Admin</a></li>
<?php } ?>
<?php if (isset($_SESSION['uid'])) { ?>
  <li class="nav-item"><a href="<?php echo $site_path; ?>/user" class="nav-link"><i class="fas fa-user pr-1"></i> My Profile</a></li>
  <li class="nav-item"><a href="<?php echo $site_path; ?>/user/logout" class="nav-link">Log Out</a></li>
<?php } else { ?>
  <li class="nav-item"><a href="<?php echo $site_path; ?>/user/login" class="nav-link"><i class="fas fa-sign-in-alt pr-1"></i> Log In</a></li>
  <li class="nav-item"><a href="<?php echo $site_path; ?>/user/register" class="nav-link">Join</a></li>
<?php } ?>
