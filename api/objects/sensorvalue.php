<?php
class SensorValue{
 
    // database connection and table name
    private $conn;
    private $table_name = "SensorValue";
 
    // object properties
    public $Id;
    public $Value;
    public $Date;
    public $SensorId;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read sensors
    function read($SensorId){
    
        // select all query
        $query = "SELECT
                    p.Id, p.Value, p.Date, p.SensorId
                FROM
                    " . $this->table_name . " p
                WHERE p.SensorId = " . $SensorId . "
                ORDER BY
                    p.Date DESC";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // create product
    function create(){
    
        // query to insert record
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    Value=:Value, Date=:Date, SensorId=:SensorId";
    
        // prepare query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->Value=htmlspecialchars(strip_tags($this->Value));
        $this->Date=htmlspecialchars(strip_tags($this->Date));
        $this->SensorId=htmlspecialchars(strip_tags($this->SensorId));
    
        // bind values
        $stmt->bindParam(":Value", $this->Value);
        $stmt->bindParam(":Date", $this->Date);
        $stmt->bindParam(":SensorId", $this->SensorId);
    
        // execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
        
    }
    // used when filling up the update product form
    function readLast($SensorId){
    
        // query to read single record
        $query = "SELECT
                    p.Id, p.Value, p.Date, p.SensorId
                FROM
                    " . $this->table_name . " p
                WHERE 
                    p.SensorId = " . $SensorId . "
                ORDER BY
                    p.Date DESC
                LIMIT
                    0,1";
    
        // prepare query statement
        $stmt = $this->conn->prepare( $query );
    
        // bind id of product to be updated
        $stmt->bindParam(1, $this->SensorId);
    
        // execute query
        $stmt->execute();
    
        // get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
        // set values to object properties
        $this->Id = $row['Id'];
        $this->Value = $row['Value'];
        $this->Date = $row['Date'];
        $this->SensorId = $row['SensorId'];
    }

    function lastWeek($SensorId){
    
        // select all query
        $query = "SELECT 
                DATE(Date) as Date,AVG(Value) as AvgValue
                FROM
                    " . $this->table_name . "
                WHERE 
                    SensorId = " . $SensorId . " and DATE(Date) > CURDATE() - INTERVAL 7 DAY
                GROUP BY 
                    DATE(Date)";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function today($SensorId){
    
        // select all query
        $query = "SELECT 
                HOUR(Date) as Hour,AVG(Value) as AvgValue
                FROM
                    " . $this->table_name . "
                WHERE 
                    SensorId = " . $SensorId . " and DATE(Date) = CURDATE()
                GROUP BY 
                    HOUR(Date)";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }
}