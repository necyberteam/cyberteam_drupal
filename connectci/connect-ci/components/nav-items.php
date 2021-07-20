<?php
/*<li class="expanded dropdown nav-item">
<a href="#" class="dropdown-toggle nav-link py-lg-4 my-lg-0">My Profile</a>
<div class="dropdown-menu my-lg-0">
<a href="#" class="dropdown-item">Item 1</a>
<a href="#" class="dropdown-item">Item 2</a>
<a href="#" class="dropdown-item">Item 3</a>
<div class="dropdown-divider"></div>
<a href="#" class="dropdown-item">Below Divider</a>
</div>
</li>*/
?>
<?php if (isset($_SESSION['uid']) && isset($_SESSION['tfa'])) { ?>
  <li class="nav-item"><a href="<?php echo $site_path; ?>/dashboard" class="nav-link py-lg-4 my-lg-0"><i class="fas fa-tachometer-alt pr-1"></i> Dashboard</a></li>
  <li class="nav-item"><a href="<?php echo $site_path; ?>/profile" class="nav-link py-lg-4 my-lg-0"><i class="fas fa-user pr-1"></i> Profile</a></li>
  <li class="expanded dropdown nav-item">
  <a class="dropdown-toggle nav-link py-lg-4 my-lg-0"><i class="fas fa-cog pr-1"></i> Settings</a>
    <div class="dropdown-menu my-lg-0">
      <a href="#" class="dropdown-item">Edit Profile</a>
      <a href="#" class="dropdown-item">Change Password</a>
      <a href="<?php echo $site_path; ?>/reset-tfa" class="dropdown-item">Reset TFA</a>
    </div>
  </li>
<?php } ?>
<li class="nav-item"><a href="#" class="nav-link py-lg-4 my-lg-0" data-toggle="modal" data-target="#contact"><i class="fas fa-question-circle pr-1"></i> Help</a></li>
<?php if (isset($_SESSION['uid']) && isset($_SESSION['tfa'])) { ?>
  <li class="nav-item"><a href="<?php echo $site_path; ?>/logout" class="nav-link py-lg-4 my-lg-0"><i class="fas fa-sign-out-alt pr-1"></i> Log Out</a></li>
<?php } ?>
