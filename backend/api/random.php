<?php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // สุ่มเมนูอาหารจากวัตถุดิบที่มี
        $ingredients = isset($_GET['ingredients']) ? explode(',', $_GET['ingredients']) : array();
        
        if (!empty($ingredients)) {
            $placeholders = str_repeat('?,', count($ingredients) - 1) . '?';
            
            $query = "SELECT r.*, GROUP_CONCAT(i.name) as ingredients 
                     FROM recipes r 
                     JOIN recipe_ingredients ri ON r.id = ri.recipe_id 
                     JOIN ingredients i ON ri.ingredient_id = i.id 
                     WHERE i.id IN ($placeholders)
                     GROUP BY r.id 
                     HAVING COUNT(DISTINCT i.id) = ?
                     ORDER BY RAND() 
                     LIMIT 1";
                     
            $stmt = $db->prepare($query);
            
            // เพิ่มจำนวนวัตถุดิบที่ต้องการให้ตรงกับจำนวน placeholders
            $params = array_merge($ingredients, array(count($ingredients)));
            $stmt->execute($params);
            
            $recipe = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($recipe) {
                echo json_encode($recipe);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "ไม่พบเมนูที่สามารถทำได้จากวัตถุดิบที่มี"));
            }
        } else {
            // สุ่มเมนูอาหารแบบสุ่มทั้งหมด
            $query = "SELECT r.*, GROUP_CONCAT(i.name) as ingredients 
                     FROM recipes r 
                     LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id 
                     LEFT JOIN ingredients i ON ri.ingredient_id = i.id 
                     GROUP BY r.id 
                     ORDER BY RAND() 
                     LIMIT 1";
                     
            $stmt = $db->prepare($query);
            $stmt->execute();
            
            $recipe = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($recipe) {
                echo json_encode($recipe);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "ไม่พบเมนูอาหาร"));
            }
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}
?> 