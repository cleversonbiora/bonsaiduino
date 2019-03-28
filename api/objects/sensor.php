<?php
class Sensor{
 
    // database connection and table name
    private $conn;
    private $table_name = "Sensor";
 
    // object properties
    public $Id;
    public $Name;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read sensors
    function read(){
    
        // select all query
        $query = "SELECT
                    p.Id, p.Name
                FROM
                    " . $this->table_name . " p
                ORDER BY
                    p.Name DESC";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }
}