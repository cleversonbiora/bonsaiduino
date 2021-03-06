<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate color object
include_once '../objects/color.php';
 
$database = new Database();
$db = $database->getConnection();
 
$color = new Color($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set color property values
$color->Red = $data->Red;
$color->Green = $data->Green;
$color->Blue = $data->Blue;
 
if($color->update()){
    echo '{';
        echo '"message": "color was updated."';
    echo '}';
}
 
else{
    echo '{';
        echo '"message": "Unable to update color."';
    echo '}';
}
?>