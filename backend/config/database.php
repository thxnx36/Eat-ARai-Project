<?php
class Database {
    private $host = "localhost";
    private $db_name = "eat_arai";
    private $username = "root";
    private $password = "EatArai123!";
    public $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        } catch(PDOException $e) {
            throw new Exception("Connection error: " . $e->getMessage());
        }

        return $this->conn;
    }
}
?> 