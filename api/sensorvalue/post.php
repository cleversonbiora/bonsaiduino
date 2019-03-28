<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate sensorvalue object
include_once '../objects/sensorvalue.php';
 
$database = new Database();
$db = $database->getConnection();
 
$sensorvalue = new SensorValue($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set sensorvalue property values
$sensorvalue->Value = $data->value;
$sensorvalue->Date = date("Y-m-d H:i:s"); ;
$sensorvalue->SensorId = $data->sensorid;
 
// create the sensorvalue
if($sensorvalue->create()){
    echo '{';
        echo '"message": "sensorvalue was created."';
    echo '}';
}
 
// if unable to create the sensorvalue, tell the user
else{
    echo '{';
        echo '"message": "Unable to create sensorvalue."';
    echo '}';
}
?>