<?php
class Color{
 
    // database connection and table name
    private $conn;
    private $table_name = "Color";
 
    // object properties
    public $Red;
    public $Green;
    public $Blue;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read sensors
    function read(){
    
        // select all query
        $query = "SELECT
                    p.Red, p.Green, p.Blue
                FROM
                    " . $this->table_name . " p
                LIMIT 0,1";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
        // set values to object properties
        $this->Red = $row['Red'];
        $this->Green = $row['Green'];
        $this->Blue = $row['Blue'];
    }

    function update(){
    
        // query to insert record
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                    Red=:Red, Green=:Green, Blue=:Blue";
    
        // prepare query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->Red=htmlspecialchars(strip_tags($this->Red));
        $this->Green=htmlspecialchars(strip_tags($this->Green));
        $this->Blue=htmlspecialchars(strip_tags($this->Blue));
    
        // bind values
        $stmt->bindParam(":Red", $this->Red);
        $stmt->bindParam(":Green", $this->Green);
        $stmt->bindParam(":Blue", $this->Blue);
    
        // execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
        
    }
}