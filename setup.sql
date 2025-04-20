-- สร้างฐานข้อมูล
CREATE DATABASE IF NOT EXISTS eat_arai;
USE eat_arai;

-- สร้างตารางวัตถุดิบ
CREATE TABLE IF NOT EXISTS ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- สร้างตารางสูตรอาหาร
CREATE TABLE IF NOT EXISTS recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- สร้างตารางความสัมพันธ์ระหว่างสูตรและวัตถุดิบ
CREATE TABLE IF NOT EXISTS recipe_ingredients (
    recipe_id INT,
    ingredient_id INT,
    quantity VARCHAR(50),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE,
    PRIMARY KEY (recipe_id, ingredient_id)
);

-- เพิ่มข้อมูลตัวอย่างในตารางวัตถุดิบ
INSERT INTO ingredients (name, category) VALUES
("ข้าวสวย", "ข้าวและแป้ง"),
("เส้นใหญ่", "ข้าวและแป้ง"),
("เส้นหมี่", "ข้าวและแป้ง"),
("หมูสับ", "เนื้อสัตว์"),
("หมูชิ้น", "เนื้อสัตว์"),
("ไก่", "เนื้อสัตว์"),
("กุ้ง", "เนื้อสัตว์"),
("ผักคะน้า", "ผัก"),
("ผักบุ้ง", "ผัก"),
("กะเพรา", "ผัก"),
("พริก", "เครื่องปรุง"),
("กระเทียม", "เครื่องปรุง"),
("น้ำมันหอย", "เครื่องปรุง"),
("ซีอิ๊วขาว", "เครื่องปรุง");

-- เพิ่มข้อมูลตัวอย่างในตารางสูตรอาหาร
INSERT INTO recipes (name, description, image_url) VALUES
("ผัดกะเพราหมูสับ", "เมนูยอดนิยมที่ทำง่ายและอร่อย", "/images/pad-kra-pao.jpg"),
("ผัดคะน้าหมู", "ผัดผักคะน้าใส่หมู รสชาติกลมกล่อม", "/images/pad-kana.jpg"),
("ผัดซีอิ๊ว", "เส้นใหญ่ผัดซีอิ๊ว ทานง่าย อร่อยได้ทุกมื้อ", "/images/pad-see-ew.jpg");

-- เพิ่มข้อมูลตัวอย่างในตารางความสัมพันธ์
INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
(1, 1), -- ผัดกะเพรา - ข้าวสวย
(1, 4), -- ผัดกะเพรา - หมูสับ
(1, 10), -- ผัดกะเพรา - กะเพรา
(1, 11), -- ผัดกะเพรา - พริก
(1, 12), -- ผัดกะเพรา - กระเทียม
(2, 1), -- ผัดคะน้า - ข้าวสวย
(2, 5), -- ผัดคะน้า - หมูชิ้น
(2, 8), -- ผัดคะน้า - ผักคะน้า
(2, 13), -- ผัดคะน้า - น้ำมันหอย
(3, 2), -- ผัดซีอิ๊ว - เส้นใหญ่
(3, 5), -- ผัดซีอิ๊ว - หมูชิ้น
(3, 14); -- ผัดซีอิ๊ว - ซีอิ๊วขาว 