<?php
if (isset($_GET['q'])) {
  $q = $_GET['q'];
  if (preg_match("/^[0-9]*$/", explode("/", $_GET['q'])[1])) {
    $entity_type = explode("/", $_GET['q'])[0];
    $entity_id = explode("/", $_GET['q'])[1];
    $mode = (explode("/", $_GET['q'])[2] == "edit" ? "edit" : "view");
  }
} else {
  //show homepage
  $q = $entity_type = "front";
}
echo $q;

?>
