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
$sensor1 = new SensorValue($db);
$sensor2 = new SensorValue($db);
$sensor3 = new SensorValue($db);
$sensor4 = new SensorValue($db);
 
// set ID property of sensorvalue to be edited
$sensor1->readLast(1);
$soilMoisture = $sensor1->Value;

$sensor2->readLast(2);
$luminosity = $sensor2->Value;

$sensor3->readLast(3);
$temperature = $sensor3->Value;

$sensor4->readLast(4);
$humidity = $sensor4->Value;
// create array
$sensorvalue_arr = array(
    "soilMoisture" =>  round($soilMoisture),
    "luminosity" => round($luminosity),
    "temperature" => round($temperature),
    "humidity" => round($humidity)
);
 
// make it json format
print_r(json_encode($sensorvalue_arr));
?>