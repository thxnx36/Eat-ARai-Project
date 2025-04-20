<?php
// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config/database.php';

$request_uri = $_SERVER['REQUEST_URI'];
$api_path = '/api/';

if (strpos($request_uri, $api_path) === 0) {
    $endpoint = substr($request_uri, strlen($api_path));
    $endpoint = strtok($endpoint, '?');
    
    $api_file = __DIR__ . '/api/' . $endpoint;
    
    if (file_exists($api_file)) {
        require_once $api_file;
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Invalid API path']);
}
?> 