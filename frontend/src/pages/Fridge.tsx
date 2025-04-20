import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Checkbox, IconButton, Badge, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Divider, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import KitchenIcon from '@mui/icons-material/Kitchen';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';

const categories = [
    {
        id: 'vegetables',
        name: 'ผัก',
        icon: '🥬',
        items: [
            { id: 'cabbage', name: 'กะหล่ำปลี' },
            { id: 'carrot', name: 'แครอท' },
            { id: 'tomato', name: 'มะเขือเทศ' },
            { id: 'cucumber', name: 'แตงกวา' },
            { id: 'lettuce', name: 'ผักกาด' },
            { id: 'onion', name: 'หัวหอม' },
            { id: 'garlic', name: 'กระเทียม' },
            { id: 'ginger', name: 'ขิง' },
            { id: 'chili', name: 'พริก' },
            { id: 'basil', name: 'ใบกะเพรา' },
        ]
    },
    {
        id: 'meat',
        name: 'เนื้อสัตว์',
        icon: '🥩',
        items: [
            { id: 'chicken', name: 'เนื้อไก่' },
            { id: 'pork', name: 'เนื้อหมู' },
            { id: 'beef', name: 'เนื้อวัว' },
            { id: 'fish', name: 'ปลา' },
            { id: 'shrimp', name: 'กุ้ง' },
            { id: 'squid', name: 'ปลาหมึก' },
            { id: 'egg', name: 'ไข่' },
        ]
    },
    {
        id: 'noodles',
        name: 'เส้น',
        icon: '🍜',
        items: [
            { id: 'rice-noodle', name: 'เส้นหมี่' },
            { id: 'egg-noodle', name: 'บะหมี่' },
            { id: 'glass-noodle', name: 'วุ้นเส้น' },
            { id: 'spaghetti', name: 'สปาเก็ตตี้' },
        ]
    },
    {
        id: 'rice',
        name: 'ข้าว',
        icon: '🍚',
        items: [
            { id: 'jasmine-rice', name: 'ข้าวหอมมะลิ' },
            { id: 'sticky-rice', name: 'ข้าวเหนียว' },
            { id: 'brown-rice', name: 'ข้าวกล้อง' },
        ]
    },
    {
        id: 'seasoning',
        name: 'เครื่องปรุง',
        icon: '🧂',
        items: [
            { id: 'soy-sauce', name: 'ซีอิ๊ว' },
            { id: 'fish-sauce', name: 'น้ำปลา' },
            { id: 'oyster-sauce', name: 'น้ำมันหอย' },
            { id: 'sugar', name: 'น้ำตาล' },
            { id: 'salt', name: 'เกลือ' },
            { id: 'pepper', name: 'พริกไทย' },
        ]
    }
];

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

interface SelectedItem {
    id: string;
    name: string;
    category: string;
}

// เพิ่มข้อมูลเมนูตัวอย่าง
const sampleRecipes = [
    {
        id: 'pad-kra-pao',
        name: 'ผัดกะเพรา',
        ingredients: ['basil', 'chicken', 'chili', 'garlic'],
        image: '/images/pad-kra-pao.jpg'
    },
    {
        id: 'tom-yum',
        name: 'ต้มยำ',
        ingredients: ['shrimp', 'chili', 'lemon-grass', 'mushroom'],
        image: '/images/tom-yum.jpg'
    },
    {
        id: 'pad-thai',
        name: 'ผัดไทย',
        ingredients: ['rice-noodle', 'egg', 'shrimp', 'bean-sprout'],
        image: '/images/pad-thai.jpg'
    }
];

const Fridge: React.FC = () => {
    const navigate = useNavigate();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [openCart, setOpenCart] = useState(false);

    const handleItemToggle = (itemId: string) => {
        setSelectedItems(prev => 
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const getSelectedItemsCount = () => {
        return selectedItems.length;
    };

    const getSelectedItemsDetails = (): SelectedItem[] => {
        return selectedItems.map(itemId => {
            for (const category of categories) {
                const item = category.items.find(i => i.id === itemId);
                if (item) {
                    return {
                        id: item.id,
                        name: item.name,
                        category: category.name
                    };
                }
            }
            return null;
        }).filter((item): item is SelectedItem => item !== null);
    };

    const handleRemoveItem = (itemId: string) => {
        setSelectedItems(prev => prev.filter(id => id !== itemId));
    };

    const getPossibleRecipes = () => {
        return sampleRecipes.filter(recipe => 
            recipe.ingredients.every(ingredient => 
                selectedItems.includes(ingredient)
            )
        );
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ 
                my: { xs: 2, sm: 4 }, 
                minHeight: '80vh', 
                display: 'flex', 
                flexDirection: 'column'
            }}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    mb: { xs: 2, sm: 4 },
                    px: { xs: 1, sm: 0 }
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton onClick={() => navigate('/search')}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography 
                            variant="h4" 
                            component="h1"
                            sx={{
                                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
                            }}
                        >
                            ในตู้เย็นมีอะไร?
                        </Typography>
                    </Box>
                    <IconButton 
                        color="primary" 
                        aria-label="fridge"
                        onClick={() => setOpenCart(true)}
                        sx={{
                            '& .MuiSvgIcon-root': {
                                fontSize: { xs: '1.8rem', sm: '2rem' }
                            }
                        }}
                    >
                        <Badge 
                            badgeContent={getSelectedItemsCount()} 
                            color="error"
                            sx={{
                                '& .MuiBadge-badge': {
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                                }
                            }}
                        >
                            <KitchenIcon />
                        </Badge>
                    </IconButton>
                </Box>

                {!selectedCategory ? (
                    <Grid container spacing={{ xs: 2, sm: 3 }}>
                        {categories.map(category => (
                            <Grid item xs={6} sm={6} md={4} key={category.id}>
                                <StyledCard 
                                    onClick={() => handleCategorySelect(category.id)}
                                    sx={{
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'scale(1.02)',
                                            boxShadow: 6
                                        }
                                    }}
                                >
                                    <CardContent sx={{ 
                                        textAlign: 'center', 
                                        cursor: 'pointer',
                                        p: { xs: 2, sm: 3 }
                                    }}>
                                        <Typography 
                                            variant="h2" 
                                            sx={{ 
                                                mb: { xs: 1, sm: 2 },
                                                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' }
                                            }}
                                        >
                                            {category.icon}
                                        </Typography>
                                        <Typography 
                                            variant="h5" 
                                            component="h2"
                                            sx={{
                                                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }
                                            }}
                                        >
                                            {category.name}
                                        </Typography>
                                    </CardContent>
                                </StyledCard>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => setSelectedCategory(null)}
                            sx={{ 
                                mb: { xs: 2, sm: 3 },
                                fontSize: { xs: '0.9rem', sm: '1rem' }
                            }}
                        >
                            กลับไปเลือกหมวดหมู่
                        </Button>
                        
                        <Grid container spacing={{ xs: 1, sm: 2 }}>
                            {categories
                                .find(cat => cat.id === selectedCategory)
                                ?.items.map(item => (
                                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                                        <Card sx={{
                                            transition: 'transform 0.2s',
                                            '&:hover': {
                                                transform: 'scale(1.02)',
                                                boxShadow: 3
                                            }
                                        }}>
                                            <CardContent sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center',
                                                p: { xs: 1, sm: 2 }
                                            }}>
                                                <Checkbox
                                                    checked={selectedItems.includes(item.id)}
                                                    onChange={() => handleItemToggle(item.id)}
                                                />
                                                <Typography 
                                                    variant="body1"
                                                    sx={{
                                                        fontSize: { xs: '0.9rem', sm: '1rem' }
                                                    }}
                                                >
                                                    {item.name}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                        </Grid>
                    </Box>
                )}

                <Box sx={{ 
                    mt: 'auto', 
                    pt: { xs: 2, sm: 3 }, 
                    textAlign: 'center'
                }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<RestaurantIcon />}
                        onClick={() => navigate('/possible-recipes', { state: { selectedItems } })}
                        disabled={selectedItems.length === 0}
                        sx={{ 
                            minWidth: { xs: '250px', sm: '300px' },
                            py: { xs: 1.5, sm: 2 },
                            fontSize: { xs: '1rem', sm: '1.2rem' }
                        }}
                    >
                        ทำเมนูอะไรได้บ้าง
                    </Button>
                </Box>

                <Dialog 
                    open={openCart} 
                    onClose={() => setOpenCart(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">รายการที่เลือก</Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {getSelectedItemsCount()} รายการ
                            </Typography>
                        </Box>
                    </DialogTitle>
                    <DialogContent>
                        <List>
                            {getSelectedItemsDetails().map((item, index) => (
                                <React.Fragment key={item.id}>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton 
                                                edge="end" 
                                                aria-label="delete"
                                                onClick={() => handleRemoveItem(item.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText
                                            primary={item.name}
                                            secondary={item.category}
                                        />
                                    </ListItem>
                                    {index < getSelectedItemsCount() - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenCart(false)}>ปิด</Button>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={() => {
                                setOpenCart(false);
                                // TODO: Navigate to recipe search with selected items
                            }}
                        >
                            ทำอะไรกินดี?
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
};

export default Fridge; 