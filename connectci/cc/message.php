<?php
if (isset($_SESSION['message_type']) && isset($_SESSION['message'])) { ?>
  <div class="container my-2 mx-auto">
    <div class="alert alert-<?php echo $_SESSION['message_type']; ?> mb-2">
      <?php echo $_SESSION['message']; ?>
    </div>
  </div>
  <?php
  unset($_SESSION['message_type']);
  unset($_SESSION['message']);
  ?>
<?php } ?>
