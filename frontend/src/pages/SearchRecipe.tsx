import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Typography, 
    Button, 
    Grid, 
    Card, 
    CardContent, 
    CardMedia,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Collapse,
    ListItemButton,
    Chip,
    CircularProgress,
    Paper,
    Stack,
    IconButton
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import api, { Recipe as ApiRecipe, Ingredient as ApiIngredient } from '../services/api';

const float = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
`;

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

interface LocalRecipe extends ApiRecipe {
    ingredients: string[];
}

interface CategoryItem {
    id: number;
    name: string;
    icon: string;
}

interface Category {
    name: string;
    items: CategoryItem[];
}

const SearchRecipe: React.FC = () => {
    const navigate = useNavigate();
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [recipes, setRecipes] = useState<LocalRecipe[]>([]);
    const [ingredients, setIngredients] = useState<ApiIngredient[]>([]);
    const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await api.getIngredients();
                console.log('Received ingredients data:', data);
                
                if (!data) {
                    throw new Error('No data received from API');
                }
                
                if (Array.isArray(data)) {
                    setIngredients(data);
                } else if (typeof data === 'object' && data !== null) {
                    const responseData = data as { error?: string };
                    if (responseData.error) {
                        throw new Error(responseData.error);
                    }
                    const dataArray = Object.values(data) as ApiIngredient[];
                    if (Array.isArray(dataArray)) {
                        setIngredients(dataArray);
                    } else {
                        throw new Error('Invalid data structure received');
                    }
                } else {
                    throw new Error('Invalid ingredients data format');
                }
            } catch (error) {
                console.error('Error fetching ingredients:', error);
                setError('เกิดข้อผิดพลาดในการโหลดข้อมูลวัตถุดิบ');
                setIngredients([]);
            } finally {
                setLoading(false);
            }
        };
        fetchIngredients();
    }, []);

    const handleItemClick = (itemId: number) => {
        setSelectedItems(prev => 
            prev.includes(itemId) 
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const handleShowRecipes = async () => {
        try {
            setLoading(true);
            setError(null);
            const selectedIds = selectedItems.map(id => id);
            console.log('Selected ingredient IDs:', selectedIds);
            
            const recipes = await api.searchRecipesByIngredients(selectedIds);
            console.log('Received recipes:', recipes);
            
            setRecipes(recipes);
        } catch (error) {
            console.error('Error searching recipes:', error);
            setError('เกิดข้อผิดพลาดในการค้นหาเมนู');
        } finally {
            setLoading(false);
        }
    };

    const categories = React.useMemo(() => {
        if (!Array.isArray(ingredients) || ingredients.length === 0) {
            return [];
        }
        return ingredients.reduce((acc: Category[], ingredient) => {
            if (!ingredient || !ingredient.category) {
                console.warn('Invalid ingredient data:', ingredient);
                return acc;
            }
            const category = acc.find(c => c.name === ingredient.category);
            if (category) {
                category.items.push({
                    id: ingredient.id,
                    name: ingredient.name,
                    icon: ingredient.icon
                });
            } else {
                acc.push({
                    name: ingredient.category,
                    items: [{
                        id: ingredient.id,
                        name: ingredient.name,
                        icon: ingredient.icon
                    }]
                });
            }
            return acc;
        }, []);
    }, [ingredients]);

    const toggleCategory = (categoryName: string) => {
        setOpenCategories(prev => ({
            ...prev,
            [categoryName]: !prev[categoryName]
        }));
    };

    const handleGoHome = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '100vh',
                gap: 3
            }}>
                <CircularProgress size={60} sx={{ color: '#e03434' }} />
                <Typography variant="h6" color="text.secondary">
                    กำลังโหลด...
                </Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: '64px' }}>
            <Box sx={{ my: { xs: 2, sm: 4 } }}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2, 
                    mb: { xs: 2, sm: 4 },
                    px: { xs: 1, sm: 0 }
                }}>
                    <IconButton 
                        onClick={handleGoHome}
                        sx={{
                            backgroundColor: '#e03434',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#FF407A',
                                transform: 'scale(1.1)',
                            }
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography 
                        variant="h4" 
                        component="h1"
                        sx={{
                            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                            fontWeight: 'bold',
                            color: '#e03434'
                        }}
                    >
                        ของในตู้เย็นของฉัน 🧊
                    </Typography>
                </Box>


                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ 
                            borderRadius: 3,
                            overflow: 'hidden',
                            animation: `${fadeIn} 1s ease-out`,
                            bgcolor: 'background.paper',
                            height: '100%',
                            maxHeight: { xs: '400px', md: 'none' },
                            overflowY: { xs: 'auto', md: 'visible' }
                        }}>
                            <List sx={{ p: 2 }}>
                                {categories.map((category) => (
                                    <React.Fragment key={category.name}>
                                        <ListItemButton 
                                            onClick={() => toggleCategory(category.name)}
                                            sx={{
                                                bgcolor: openCategories[category.name] 
                                                    ? 'rgba(224, 52, 52, 0.1)' 
                                                    : 'transparent',
                                                borderRadius: 2,
                                                mb: 1,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    bgcolor: 'rgba(224, 52, 52, 0.05)'
                                                }
                                            }}
                                        >
                                            <ListItemText 
                                                primary={category.name}
                                                primaryTypographyProps={{
                                                    fontWeight: 'bold',
                                                    color: openCategories[category.name] ? '#e03434' : 'inherit'
                                                }}
                                            />
                                            <ExpandMore 
                                                sx={{ 
                                                    transform: openCategories[category.name] 
                                                        ? 'rotate(180deg)' 
                                                        : 'none',
                                                    transition: 'transform 0.3s ease',
                                                    color: openCategories[category.name] ? '#e03434' : 'inherit'
                                                }}
                                            />
                                        </ListItemButton>
                                        <Collapse in={openCategories[category.name]} timeout="auto" unmountOnExit>
                                            <Grid container spacing={1} sx={{ px: 2, pb: 2 }}>
                                                {category.items.map((item) => (
                                                    <Grid item key={item.id}>
                                                        <Chip
                                                            label={item.name}
                                                            onClick={() => handleItemClick(item.id)}
                                                            sx={{
                                                                bgcolor: selectedItems.includes(item.id) 
                                                                    ? 'linear-gradient(45deg, #e03434 30%, #ff6b6b 90%)'
                                                                    : 'white',
                                                                color: selectedItems.includes(item.id) ? 'white' : 'inherit',
                                                                border: selectedItems.includes(item.id) 
                                                                    ? 'none' 
                                                                    : '1px solid rgba(224, 52, 52, 0.5)',
                                                                '&:hover': {
                                                                    bgcolor: selectedItems.includes(item.id)
                                                                        ? 'linear-gradient(45deg, #ff6b6b 30%, #ff8b8b 90%)'
                                                                        : 'rgba(224, 52, 52, 0.1)'
                                                                },
                                                                transition: 'all 0.3s ease',
                                                                fontWeight: selectedItems.includes(item.id) ? 'bold' : 'normal'
                                                            }}
                                                        />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Collapse>
                                    </React.Fragment>
                                ))}
                            </List>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            gap: 4,
                            animation: `${fadeIn} 1s ease-out`
                        }}>
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'center',
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: 'center',
                                gap: 2
                            }}>
                                <Button
                                    variant="contained"
                                    onClick={handleShowRecipes}
                                    disabled={selectedItems.length === 0 || loading}
                                    startIcon={<SearchIcon />}
                                    sx={{
                                        background: 'linear-gradient(45deg, #e03434 30%, #ff6b6b 90%)',
                                        color: 'white',
                                        px: 6,
                                        py: 2,
                                        borderRadius: '30px',
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold',
                                        boxShadow: '0 4px 20px rgba(224, 52, 52, 0.25)',
                                        transition: 'all 0.3s ease',
                                        minWidth: '250px',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 6px 25px rgba(224, 52, 52, 0.35)'
                                        },
                                        '&:disabled': {
                                            background: 'linear-gradient(45deg, #ccc 30%, #ddd 90%)',
                                            color: '#fff'
                                        }
                                    }}
                                >
                                    {loading ? (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <CircularProgress size={24} color="inherit" />
                                            <span>กำลังค้นหา...</span>
                                        </Box>
                                    ) : (
                                        'ดูเมนูที่ทำได้'
                                    )}
                                </Button>

                                {selectedItems.length > 0 && (
                                    <Typography variant="body2" color="text.secondary">
                                        เลือกวัตถุดิบแล้ว {selectedItems.length} รายการ
                                    </Typography>
                                )}
                            </Box>

                            <Grid container spacing={3}>
                                {recipes.map((recipe) => (
                                    <Grid item xs={12} sm={6} key={recipe.id}>
                                        <Card 
                                            sx={{ 
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                borderRadius: 3,
                                                overflow: 'hidden',
                                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-5px)',
                                                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                                                }
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={recipe.image_path}
                                                alt={recipe.name}
                                                sx={{ 
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'scale(1.05)'
                                                    }
                                                }}
                                            />
                                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                                <Typography 
                                                    gutterBottom 
                                                    variant="h5" 
                                                    component="h2" 
                                                    sx={{ 
                                                        fontWeight: 'bold',
                                                        color: '#e03434'
                                                    }}
                                                >
                                                    {recipe.name}
                                                </Typography>
                                                <Typography 
                                                    variant="body2" 
                                                    color="text.secondary" 
                                                    paragraph
                                                    sx={{ mb: 3 }}
                                                >
                                                    {recipe.description}
                                                </Typography>
                                                <Box>
                                                    <Typography 
                                                        variant="subtitle2" 
                                                        sx={{ 
                                                            color: '#666',
                                                            mb: 1,
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                        วัตถุดิบที่ใช้:
                                                    </Typography>
                                                    <Box sx={{ 
                                                        display: 'flex', 
                                                        flexWrap: 'wrap', 
                                                        gap: 1 
                                                    }}>
                                                        {recipe.ingredients.map((ingredient, index) => (
                                                            <Chip
                                                                key={index}
                                                                label={ingredient}
                                                                size="small"
                                                                sx={{
                                                                    bgcolor: 'rgba(224, 52, 52, 0.1)',
                                                                    color: '#e03434',
                                                                    fontWeight: 500,
                                                                    '&:hover': {
                                                                        bgcolor: 'rgba(224, 52, 52, 0.2)'
                                                                    }
                                                                }}
                                                            />
                                                        ))}
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>

                {recipes.length === 0 && selectedItems.length > 0 && !loading && (
                    <Box sx={{ 
                        textAlign: 'center', 
                        mt: 4,
                        p: 3,
                        borderRadius: 2,
                        bgcolor: 'rgba(224, 52, 52, 0.05)',
                        animation: `${fadeIn} 0.5s ease-out`
                    }}>
                        <Typography variant="h6" color="text.secondary">
                            ไม่พบเมนูที่ตรงกับวัตถุดิบที่เลือก 😢
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            ลองเลือกวัตถุดิบอื่นๆ ดูนะคะ
                        </Typography>
                    </Box>
                )}

                {error && (
                    <Box sx={{ 
                        position: 'fixed',
                        bottom: { xs: 80, sm: 100 },
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1000,
                        bgcolor: 'error.main',
                        color: 'white',
                        px: 3,
                        py: 2,
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                        animation: `${fadeIn} 0.5s ease-out`
                    }}>
                        <Typography variant="body1">
                            {error}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default SearchRecipe; 