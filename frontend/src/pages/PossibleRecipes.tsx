import React from 'react';
import { Container, Typography, Box, Grid, Paper, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate, useLocation } from 'react-router-dom';

// ข้อมูลเมนูตัวอย่าง
const sampleRecipes = [
    {
        id: 'pad-kra-pao',
        name: 'ผัดกะเพรา',
        ingredients: ['basil', 'chicken', 'chili', 'garlic'],
        image: '/images/pad-kra-pao.jpg',
        description: 'เมนูยอดนิยมของคนไทย ใช้ใบกะเพราเป็นส่วนประกอบหลัก รสชาติเผ็ดร้อน หอมกลิ่นใบกะเพรา'
    },
    {
        id: 'tom-yum',
        name: 'ต้มยำ',
        ingredients: ['shrimp', 'chili', 'lemon-grass', 'mushroom'],
        image: '/images/tom-yum.jpg',
        description: 'ซุปรสจัดจ้านที่ขึ้นชื่อของไทย มีรสเปรี้ยว เผ็ด เค็ม กลมกล่อม'
    },
    {
        id: 'pad-thai',
        name: 'ผัดไทย',
        ingredients: ['rice-noodle', 'egg', 'shrimp', 'bean-sprout'],
        image: '/images/pad-thai.jpg',
        description: 'อาหารจานเดียวที่คนทั่วโลกรู้จัก มีรสชาติกลมกล่อมทั้งเปรี้ยว หวาน เค็ม'
    },
    {
        id: 'green-curry',
        name: 'แกงเขียวหวาน',
        ingredients: ['chicken', 'coconut-milk', 'eggplant', 'basil'],
        image: '/images/green-curry.jpg',
        description: 'แกงไทยที่มีรสชาติเข้มข้นจากพริกแกงเขียวหวานและกะทิ'
    },
    {
        id: 'som-tum',
        name: 'ส้มตำ',
        ingredients: ['papaya', 'chili', 'lime', 'peanut'],
        image: '/images/som-tum.jpg',
        description: 'สลัดไทยที่มีรสชาติเปรี้ยว เผ็ด เค็ม หวาน กลมกล่อม'
    },
    {
        id: 'mango-sticky-rice',
        name: 'ข้าวเหนียวมะม่วง',
        ingredients: ['sticky-rice', 'mango', 'coconut-milk', 'sugar'],
        image: '/images/mango-sticky-rice.jpg',
        description: 'ของหวานไทยที่ขึ้นชื่อ มีรสชาติหวานมันจากข้าวเหนียวและกะทิ'
    },
    {
        id: 'pad-see-ew',
        name: 'ผัดซีอิ๊ว',
        ingredients: ['rice-noodle', 'chicken', 'egg', 'chinese-broccoli'],
        image: '/images/pad-see-ew.jpg',
        description: 'ผัดเส้นที่ใช้ซีอิ๊วเป็นเครื่องปรุงหลัก มีรสชาติกลมกล่อม'
    },
    {
        id: 'massaman-curry',
        name: 'แกงมัสมั่น',
        ingredients: ['beef', 'potato', 'onion', 'peanut'],
        image: '/images/massaman-curry.jpg',
        description: 'แกงไทยที่มีอิทธิพลจากอาหารมุสลิม มีรสชาติเข้มข้นและกลมกล่อม'
    },
    {
        id: 'khao-soi',
        name: 'ข้าวซอย',
        ingredients: ['egg-noodle', 'chicken', 'coconut-milk', 'lime'],
        image: '/images/khao-soi.jpg',
        description: 'อาหารเหนือที่มีรสชาติเข้มข้นจากกะทิและเครื่องแกง'
    },
    {
        id: 'larb',
        name: 'ลาบ',
        ingredients: ['pork', 'mint', 'lime', 'chili'],
        image: '/images/larb.jpg',
        description: 'สลัดเนื้อสับแบบไทยอีสาน มีรสชาติเปรี้ยว เผ็ด เค็ม'
    },
    {
        id: 'pad-prik-king',
        name: 'ผัดพริกแกง',
        ingredients: ['pork', 'green-beans', 'kaffir-lime-leaves', 'chili'],
        image: '/images/pad-prik-king.jpg',
        description: 'ผัดที่ใช้พริกแกงเป็นเครื่องปรุงหลัก มีรสชาติเผ็ดร้อน'
    },
    {
        id: 'tom-kha',
        name: 'ต้มข่าไก่',
        ingredients: ['chicken', 'coconut-milk', 'galangal', 'mushroom'],
        image: '/images/tom-kha.jpg',
        description: 'ซุปที่มีรสชาติกลมกล่อมจากกะทิและข่า'
    },
    {
        id: 'pad-pak-bung',
        name: 'ผัดผักบุ้ง',
        ingredients: ['morning-glory', 'garlic', 'chili', 'oyster-sauce'],
        image: '/images/pad-pak-bung.jpg',
        description: 'ผัดผักที่ทำง่ายและมีรสชาติอร่อย'
    },
    {
        id: 'khao-mun-gai',
        name: 'ข้าวมันไก่',
        ingredients: ['chicken', 'jasmine-rice', 'ginger', 'cucumber'],
        image: '/images/khao-mun-gai.jpg',
        description: 'อาหารจานเดียวที่มีข้าวหุงกับน้ำมันไก่และไก่ต้ม'
    },
    {
        id: 'pad-kra-pao-moo-sap',
        name: 'ผัดกะเพราหมูสับ',
        ingredients: ['pork-mince', 'basil', 'chili', 'garlic'],
        image: '/images/pad-kra-pao-moo-sap.jpg',
        description: 'ผัดกะเพราที่ใช้เนื้อหมูสับแทนเนื้อไก่'
    },
    {
        id: 'gaeng-keow-wan',
        name: 'แกงเขียวหวานหมู',
        ingredients: ['pork', 'coconut-milk', 'eggplant', 'basil'],
        image: '/images/gaeng-keow-wan.jpg',
        description: 'แกงเขียวหวานที่ใช้เนื้อหมูแทนเนื้อไก่'
    },
    {
        id: 'pad-pak-ruam',
        name: 'ผัดผักรวม',
        ingredients: ['mixed-vegetables', 'garlic', 'oyster-sauce', 'soy-sauce'],
        image: '/images/pad-pak-ruam.jpg',
        description: 'ผัดผักรวมที่มีผักหลากหลายชนิด'
    },
    {
        id: 'khao-pad',
        name: 'ข้าวผัด',
        ingredients: ['jasmine-rice', 'egg', 'onion', 'carrot'],
        image: '/images/khao-pad.jpg',
        description: 'ข้าวผัดที่ทำง่ายและมีรสชาติอร่อย'
    },
    {
        id: 'pad-prik-pao',
        name: 'ผัดพริกเผา',
        ingredients: ['pork', 'onion', 'bell-pepper', 'chili-paste'],
        image: '/images/pad-prik-pao.jpg',
        description: 'ผัดที่ใช้พริกเผาเป็นเครื่องปรุงหลัก'
    },
    {
        id: 'pad-ma-kheua-yao',
        name: 'ผัดมะเขือยาว',
        ingredients: ['eggplant', 'pork', 'basil', 'chili'],
        image: '/images/pad-ma-kheua-yao.jpg',
        description: 'ผัดมะเขือยาวที่มีรสชาติกลมกล่อม'
    }
];

const PossibleRecipes: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedItems = location.state?.selectedItems || [];

    console.log('Location state:', location.state);
    console.log('Selected items from state:', selectedItems);

    const getPossibleRecipes = () => {
        console.log('Sample recipes:', sampleRecipes);
        console.log('Selected items for filtering:', selectedItems);
        
        const filteredRecipes = sampleRecipes.filter(recipe => {
            const hasMatchingIngredient = recipe.ingredients.some(ingredient => {
                // ถ้าเลือกหมู ให้แสดงเมนูที่มีทั้ง pork และ pork-mince
                if (selectedItems.includes('pork')) {
                    const matches = ingredient === 'pork' || ingredient === 'pork-mince';
                    console.log(`Checking ${recipe.name} - ${ingredient} matches pork:`, matches);
                    return matches;
                }
                const matches = selectedItems.includes(ingredient);
                console.log(`Checking ${recipe.name} - ${ingredient} matches:`, matches);
                return matches;
            });
            console.log(`Recipe ${recipe.name} has matching ingredient:`, hasMatchingIngredient);
            return hasMatchingIngredient;
        });
        
        console.log('Filtered recipes:', filteredRecipes);
        return filteredRecipes;
    };

    const possibleRecipes = getPossibleRecipes();

    // เพิ่มการตรวจสอบว่ามีเมนูหรือไม่
    if (possibleRecipes.length === 0) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                        <IconButton onClick={() => navigate('/fridge')}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h4" component="h1">
                            ไม่พบเมนูที่สามารถทำได้
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                        ไม่พบเมนูที่สามารถทำได้จากวัตถุดิบที่เลือก กรุณาเลือกวัตถุดิบอื่นเพิ่มเติม
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                    <IconButton onClick={() => navigate('/fridge')}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" component="h1">
                        เมนูที่สามารถทำได้
                    </Typography>
                </Box>

                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
                    พบ {possibleRecipes.length} เมนูที่สามารถทำได้จากวัตถุดิบที่เลือก
                </Typography>

                <Grid container spacing={3}>
                    {possibleRecipes.map(recipe => (
                        <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                            <Paper 
                                elevation={3} 
                                sx={{ 
                                    p: 3,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                        transition: 'transform 0.2s',
                                        boxShadow: 6
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <RestaurantIcon color="primary" sx={{ fontSize: 40 }} />
                                    <Box>
                                        <Typography variant="h6">{recipe.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            วัตถุดิบที่ใช้: {recipe.ingredients.length} อย่าง
                                        </Typography>
                                    </Box>
                                </Box>
                                
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    {recipe.description}
                                </Typography>

                                <Box sx={{ mt: 'auto', pt: 2 }}>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        fullWidth
                                        onClick={() => {
                                            // TODO: Navigate to recipe details
                                            console.log('View recipe:', recipe.id);
                                        }}
                                    >
                                        ดูสูตรอาหาร
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default PossibleRecipes; 