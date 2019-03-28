<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/sensorvalue.php';
 
// instantiate database and sensor object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$sensorvalue = new SensorValue($db);
$sensorId = isset($_GET['sensorId']) ? $_GET['sensorId'] : die();
// query sensors
$stmt = $sensorvalue->read($sensorId);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // sensors array
    $sensorvalues_arr=array();
    $sensorvalues_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $sensorvalue_item=array(
            "Id" => $Id,
            "Value" => $Value,
            "Date" => $Date,
            "SensorId" => $SensorId,
        );
 
        array_push($sensorvalues_arr["records"], $sensorvalue_item);
    }
 
    echo json_encode($sensorvalues_arr);
}
 
else{
    echo json_encode(
        array("message" => "No sensorvalues found.")
    );
}
?>