<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/color.php';
 
// instantiate database and sensor object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$color = new Color($db);
// query sensors
$color->read();
 
// create array
$color_arr = array(
    "Red" =>  $color->Red,
    "Green" => $color->Green,
    "Blue" => $color->Blue
);
 
// make it json format
print_r(json_encode($color_arr));
?>