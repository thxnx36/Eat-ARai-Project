<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once dirname(__DIR__) . '/config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();

    $query = "SELECT * FROM ingredients ORDER BY category, name";
    $stmt = $db->prepare($query);
    $stmt->execute();

    $ingredients = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($ingredients) {
        echo json_encode($ingredients);
    } else {
        echo json_encode([]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Database error: ' . $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Server error: ' . $e->getMessage()
    ]);
}
?> 