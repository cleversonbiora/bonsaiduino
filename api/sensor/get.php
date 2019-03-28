<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/sensor.php';
 
// instantiate database and sensor object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$sensor = new Sensor($db);
 
// query sensors
$stmt = $sensor->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // sensors array
    $sensors_arr=array();
    $sensors_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $sensor_item=array(
            "Id" => $Id,
            "Name" => $Name,
        );
 
        array_push($sensors_arr["records"], $sensor_item);
    }
 
    echo json_encode($sensors_arr);
}
 
else{
    echo json_encode(
        array("message" => "No sensors found.")
    );
}
?>