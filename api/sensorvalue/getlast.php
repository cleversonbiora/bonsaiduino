<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/sensorvalue.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare sensorvalue object
$sensorvalue = new SensorValue($db);
 
// set ID property of sensorvalue to be edited
$SensorId = isset($_GET['sensorId']) ? $_GET['sensorId'] : die();
 
// read the details of sensorvalue to be edited
$sensorvalue->readLast($SensorId);
 
// create array
$sensorvalue_arr = array(
    "Id" =>  $sensorvalue->Id,
    "Value" => $sensorvalue->Value,
    "Date" => $sensorvalue->Date,
    "SensorId" => $sensorvalue->SensorId
);
 
// make it json format
print_r(json_encode($sensorvalue_arr));
?>