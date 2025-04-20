import axios from 'axios';

const API_URL = 'http://localhost:8002/api';

// สร้าง axios instance ที่มีการตั้งค่า default
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export interface Ingredient {
    id: number;
    name: string;
    category: string;
    icon: string;
}

export interface Recipe {
    id: number;
    name: string;
    description: string;
    image_path: string;
    ingredients: string[];
}

// Fallback data สำหรับกรณีที่ API ไม่ทำงาน
const fallbackRecipes: Recipe[] = [
    {
        id: 1,
        name: 'ข้าวผัดหมู',
        description: 'ข้าวผัดกับหมูสับ กระเทียม และเครื่องปรุงรส',
        image_path: '/images/recipes/khao-pad-moo.jpg',
        ingredients: ['ข้าวสวย', 'หมู', 'กระเทียม', 'ซีอิ๊ว']
    },
    {
        id: 2,
        name: 'ผัดไทยกุ้งสด',
        description: 'เส้นก๋วยเตี๋ยวผัดกับกุ้งสดและเครื่องปรุงรส',
        image_path: '/images/recipes/pad-thai.jpg',
        ingredients: ['เส้นก๋วยเตี๋ยว', 'กุ้ง', 'ไข่', 'ถั่วลิสง']
    }
];

export default {
    // วัตถุดิบ
    getIngredients: async (): Promise<Ingredient[]> => {
        try {
            const response = await api.get('/ingredients.php');
            if (response.data && typeof response.data === 'object' && 'error' in response.data) {
                throw new Error(response.data.error);
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching ingredients:', error);
            throw error;
        }
    },

    addIngredient: async (ingredient: Omit<Ingredient, 'id'>): Promise<Ingredient> => {
        const response = await api.post('/ingredients', ingredient);
        return response.data;
    },

    // เมนูอาหาร
    getRecipes: async (): Promise<Recipe[]> => {
        try {
            const response = await api.get('/recipes.php');
            if (response.data && typeof response.data === 'object' && 'error' in response.data) {
                throw new Error(response.data.error);
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching recipes:', error);
            throw error;
        }
    },

    addRecipe: async (recipe: Omit<Recipe, 'id'>): Promise<Recipe> => {
        const response = await api.post('/recipes', recipe);
        return response.data;
    },

    // ค้นหาเมนูจากวัตถุดิบ
    searchRecipesByIngredients: async (ingredientIds: number[]): Promise<Recipe[]> => {
        try {
            const response = await api.post('/recipes.php', 
                JSON.stringify({ ingredientIds }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.data && typeof response.data === 'object' && 'error' in response.data) {
                throw new Error(response.data.error);
            }
            return response.data;
        } catch (error) {
            console.error('Error searching recipes:', error);
            throw error;
        }
    },

    // สุ่มเมนู
    getRandomRecipe: async (): Promise<Recipe> => {
        try {
            const response = await api.get('/random.php');
            if (response.data && typeof response.data === 'object' && 'error' in response.data) {
                throw new Error(response.data.error);
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching random recipe:', error);
            throw error;
        }
    }
}; 