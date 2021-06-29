<?php

$servername = "";
$username = "";
$password = "";
$dbname = "connect_ci";

$localhost = array(
  '127.0.0.1',
  '::1'
);

if(in_array($_SERVER['REMOTE_ADDR'], $localhost)){
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);
}

session_start();

/*
 * If your site is in a subdirectory add it below without the trailing slash.
 * For example:
 * $site_path = "/example";
*/
$site_path = "";
?>
