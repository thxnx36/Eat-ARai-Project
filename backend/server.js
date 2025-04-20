const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Routes
app.get('/api/recipes', async (req, res) => {
    try {
        const [recipes] = await pool.query(`
            SELECT r.*, GROUP_CONCAT(i.name) as ingredient_names
            FROM recipes r
            LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
            LEFT JOIN ingredients i ON ri.ingredient_id = i.id
            GROUP BY r.id
        `);
        res.json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/recipes/search', async (req, res) => {
    try {
        const { ingredientIds } = req.body;
        if (!Array.isArray(ingredientIds)) {
            return res.status(400).json({ error: 'Invalid ingredient IDs' });
        }

        const [recipes] = await pool.query(`
            SELECT r.*, GROUP_CONCAT(i.name) as ingredient_names
            FROM recipes r
            JOIN recipe_ingredients ri ON r.id = ri.recipe_id
            JOIN ingredients i ON ri.ingredient_id = i.id
            WHERE i.id IN (?)
            GROUP BY r.id
            HAVING COUNT(DISTINCT i.id) = ?
        `, [ingredientIds, ingredientIds.length]);

        res.json(recipes);
    } catch (error) {
        console.error('Error searching recipes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/recipes/random', async (req, res) => {
    try {
        const [recipes] = await pool.query(`
            SELECT r.*, GROUP_CONCAT(i.name) as ingredient_names
            FROM recipes r
            LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
            LEFT JOIN ingredients i ON ri.ingredient_id = i.id
            GROUP BY r.id
            ORDER BY RAND()
            LIMIT 1
        `);
        res.json(recipes[0] || null);
    } catch (error) {
        console.error('Error fetching random recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/ingredients', async (req, res) => {
    try {
        const [ingredients] = await pool.query('SELECT * FROM ingredients');
        res.json(ingredients);
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 