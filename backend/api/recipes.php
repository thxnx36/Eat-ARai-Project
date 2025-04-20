<?php
// ตั้งค่า CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=UTF-8');

// จัดการ OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';

try {
    $db = new Database();
    $conn = $db->getConnection();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // รับข้อมูลจาก POST request
        $data = json_decode(file_get_contents('php://input'), true);
        $ingredientIds = $data['ingredientIds'] ?? [];

        if (empty($ingredientIds)) {
            throw new Exception('No ingredient IDs provided');
        }

        // ค้นหาเมนูที่ใช้วัตถุดิบที่เลือก
        $placeholders = str_repeat('?,', count($ingredientIds) - 1) . '?';
        $sql = "SELECT DISTINCT r.*, GROUP_CONCAT(i.name) as ingredient_names 
                FROM recipes r 
                JOIN recipe_ingredients ri ON r.id = ri.recipe_id 
                JOIN ingredients i ON ri.ingredient_id = i.id 
                WHERE ri.ingredient_id IN ($placeholders)
                GROUP BY r.id";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute($ingredientIds);
        $recipes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // แปลง ingredient_names เป็น array
        foreach ($recipes as &$recipe) {
            $recipe['ingredients'] = explode(',', $recipe['ingredient_names']);
            unset($recipe['ingredient_names']);
        }

        echo json_encode($recipes);
    } else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // GET request - ดึงข้อมูลเมนูทั้งหมด
        $sql = "SELECT r.*, GROUP_CONCAT(i.name) as ingredient_names 
                FROM recipes r 
                LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id 
                LEFT JOIN ingredients i ON ri.ingredient_id = i.id 
                GROUP BY r.id";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $recipes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // แปลง ingredient_names เป็น array
        foreach ($recipes as &$recipe) {
            $recipe['ingredients'] = explode(',', $recipe['ingredient_names']);
            unset($recipe['ingredient_names']);
        }

        echo json_encode($recipes);
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?> 