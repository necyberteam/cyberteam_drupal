<?php
$domains = array(
  "nectdev.wpi.edu" => array("region" => "northeast", "site_title" => "Northeast Cyberteam"),
  "nectd8.wpi.edu" => array("region" => "northeast", "site_title" => "Northeast Cyberteam"),
  "connectcidev.wpi.edu" => array("region" => "connectdev", "site_title" => "Connect.CI Dev"),
  "connectci.wpi.edu" => array("region" => "connect", "site_title" => "Connect.CI")
);
if (isset($domains[$_SERVER['HTTP_HOST']])) {
  echo "region : " . $domains[$_SERVER['HTTP_HOST']]['region'] . "<br>";
  echo "site_title : " . $domains[$_SERVER['HTTP_HOST']]['site_title'] . "<br>";
} else {
  echo "region : " . "At-Large" . "<br>";
  echo "site_title : " . "Connect.CI: The Portal for CyberTeams" . "<br>";
}
?>
