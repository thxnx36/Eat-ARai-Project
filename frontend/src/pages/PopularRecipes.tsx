import React, { useEffect, useState } from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    Grid, 
    Paper, 
    Tabs, 
    Tab,
    Button,
    IconButton,
    Card,
    CardContent,
    CardMedia,
    Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CoolIcon from '@mui/icons-material/AcUnit';
import { keyframes } from '@mui/system';
import axios from 'axios';

// สร้าง animation effects
const float = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
`;

const shine = keyframes`
    0% { transform: scale(1); opacity: 0.9; }
    50% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); opacity: 0.9; }
`;

const gradient = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

interface Recipe {
    id: number;
    name: string;
    description: string;
    image_path: string;
    category: string;
    ingredients: { id: number; name: string; category: string }[];
}

const fallbackRecipes: Recipe[] = [
    {
        id: 1,
        name: 'ข้าวผัดหมู',
        description: 'ข้าวผัดหมูสูตรเด็ด รสชาติกลมกล่อม',
        image_path: '/images/recipes/khao_pad_moo.jpg',
        category: 'ข้าว',
        ingredients: [
            { id: 1, name: 'ข้าว', category: 'ข้าว' },
            { id: 2, name: 'หมู', category: 'หมู' },
            { id: 3, name: 'น้ำตาล', category: 'เครื่องปรุงรส' },
            { id: 4, name: 'น้ำมัน', category: 'น้ำมัน' },
            { id: 5, name: 'น้ำปลา', category: 'น้ำปลา' },
            { id: 6, name: 'พริกไทย', category: 'เครื่องเทศ' },
            { id: 7, name: 'กระเทียม', category: 'เครื่องเทศ' },
            { id: 8, name: 'น้ำหอม', category: 'เครื่องเทศ' },
            { id: 9, name: 'น้ำตาล', category: 'เครื่องปรุงรส' },
            { id: 10, name: 'น้ำมัน', category: 'น้ำมัน' }
        ]
    },
    {
        id: 2,
        name: 'ข้าวผัดกุ้ง',
        description: 'ข้าวผัดกุ้งสด รสชาติอร่อย',
        image_path: '/images/recipes/khao_pad_kung.jpg',
        category: 'ข้าว',
        ingredients: [
            { id: 11, name: 'ข้าว', category: 'ข้าว' },
            { id: 12, name: 'กุ้ง', category: 'กุ้ง' },
            { id: 13, name: 'น้ำตาล', category: 'เครื่องปรุงรส' },
            { id: 14, name: 'น้ำมัน', category: 'น้ำมัน' },
            { id: 15, name: 'น้ำปลา', category: 'น้ำปลา' },
            { id: 16, name: 'พริกไทย', category: 'เครื่องเทศ' },
            { id: 17, name: 'กระเทียม', category: 'เครื่องเทศ' },
            { id: 18, name: 'น้ำหอม', category: 'เครื่องเทศ' },
            { id: 19, name: 'น้ำตาล', category: 'เครื่องปรุงรส' },
            { id: 20, name: 'น้ำมัน', category: 'น้ำมัน' }
        ]
    },
    {
        id: 3,
        name: 'ข้าวผัดไก่',
        description: 'ข้าวผัดไก่สูตรเด็ด',
        image_path: '/images/recipes/khao_pad_kai.jpg',
        category: 'ข้าว',
        ingredients: [
            { id: 21, name: 'ข้าว', category: 'ข้าว' },
            { id: 22, name: 'ไก่', category: 'ไก่' },
            { id: 23, name: 'น้ำตาล', category: 'เครื่องปรุงรส' },
            { id: 24, name: 'น้ำมัน', category: 'น้ำมัน' },
            { id: 25, name: 'น้ำปลา', category: 'น้ำปลา' },
            { id: 26, name: 'พริกไทย', category: 'เครื่องเทศ' },
            { id: 27, name: 'กระเทียม', category: 'เครื่องเทศ' },
            { id: 28, name: 'น้ำหอม', category: 'เครื่องเทศ' },
            { id: 29, name: 'น้ำตาล', category: 'เครื่องปรุงรส' },
            { id: 30, name: 'น้ำมัน', category: 'น้ำมัน' }
        ]
    },
    {
        id: 4,
        name: 'ผัดไทย',
        description: 'ผัดไทยสูตรต้นตำรับ',
        image_path: '/images/recipes/pad_thai.jpg',
        category: 'เส้น',
        ingredients: [
            { id: 31, name: 'เส้นหมู', category: 'เส้น' },
            { id: 32, name: 'หมู', category: 'หมู' },
            { id: 33, name: 'น้ำตาล', category: 'เครื่องปรุงรส' },
            { id: 34, name: 'น้ำมัน', category: 'น้ำมัน' },
            { id: 35, name: 'น้ำปลา', category: 'น้ำปลา' },
            { id: 36, name: 'พริกไทย', category: 'เครื่องเทศ' },
            { id: 37, name: 'กระเทียม', category: 'เครื่องเทศ' },
            { id: 38, name: 'น้ำหอม', category: 'เครื่องเทศ' },
            { id: 39, name: 'น้ำตาล', category: 'เครื่องปรุงรส' },
            { id: 40, name: 'น้ำมัน', category: 'น้ำมัน' }
        ]
    },
    {
        id: 5,
        name: 'ก๋วยเตี๋ยวต้มยำ',
        description: 'ก๋วยเตี๋ยวต้มยำรสจัด',
        image_path: '/images/recipes/tom_yum_noodle.jpg',
        category: 'เส้น',
        ingredients: [
            { id: 41, name: 'เส้นก๋วยเตี๋ยว', category: 'เส้น' },
            { id: 42, name: 'กุ้ง', category: 'กุ้ง' },
            { id: 43, name: 'น้ำตาล', category: 'เครื่องปรุงรส' },
            { id: 44, name: 'น้ำมัน', category: 'น้ำมัน' },
            { id: 45, name: 'น้ำปลา', category: 'น้ำปลา' },
            { id: 46, name: 'พริกไทย', category: 'เครื่องเทศ' },
            { id: 47, name: 'กระเทียม', category: 'เครื่องเทศ' },
            { id: 48, name: 'น้ำหอม', category: 'เครื่องเทศ' },
            { id: 49, name: 'น้ำตาล', category: 'เครื่องปรุงรส' },
            { id: 50, name: 'น้ำมัน', category: 'น้ำมัน' }
        ]
    },
    {
        id: 6,
        name: 'ส้มตำ',
        description: 'ส้มตำไทยรสจัด',
        image_path: '/images/recipes/som_tam.jpg',
        category: 'เผ็ด',
        ingredients: [
            { id: 51, name: 'ส้ม', category: 'ส้ม' },
            { id: 52, name: 'น้ำตาล', category: 'เครื่องปรุงรส' },
            { id: 53, name: 'น้ำมัน', category: 'น้ำมัน' },
            { id: 54, name: 'พริกไทย', category: 'เครื่องเทศ' },
            { id: 55, name: 'กระเทียม', category: 'เครื่องเทศ' },
            { id: 56, name: 'น้ำหอม', category: 'เครื่องเทศ' },
            { id: 57, name: 'น้ำตาล', category: 'เครื่องปรุงรส' },
            { id: 58, name: 'น้ำมัน', category: 'น้ำมัน' }
        ]
    },
    {
        id: 7,
        name: 'ต้มยำกุ้ง',
        description: 'ต้มยำกุ้งรสจัด',
        image_path: '/images/recipes/tom_yum_kung.jpg',
        category: 'เผ็ด',
        ingredients: [
            { id: 59, name: 'กุ้ง', category: 'กุ้ง' },
            { id: 60, name: 'น้ำตาล', category: 'เครื่องปรุงรส' },
            { id: 61, name: 'น้ำมัน', category: 'น้ำมัน' },
            { id: 62, name: 'พริกไทย', category: 'เครื่องเทศ' },
            { id: 63, name: 'กระเทียม', category: 'เครื่องเทศ' },
            { id: 64, name: 'น้ำหอม', category: 'เครื่องเทศ' },
            { id: 65, name: 'น้ำตาล', category: 'เครื่องปรุงรส' },
            { id: 66, name: 'น้ำมัน', category: 'น้ำมัน' }
        ]
    },
    {
        id: 8,
        name: 'แกงจืด',
        description: 'แกงจืดรสกลมกล่อม',
        image_path: '/images/recipes/kaeng_jeut.jpg',
        category: 'ไม่เผ็ด',
        ingredients: [
            { id: 67, name: 'หมู', category: 'หมู' },
            { id: 68, name: 'น้ำตาล', category: 'เครื่องปรุงรส' },
            { id: 69, name: 'น้ำมัน', category: 'น้ำมัน' },
            { id: 70, name: 'พริกไทย', category: 'เครื่องเทศ' },
            { id: 71, name: 'กระเทียม', category: 'เครื่องเทศ' },
            { id: 72, name: 'น้ำหอม', category: 'เครื่องเทศ' },
            { id: 73, name: 'น้ำตาล', category: 'เครื่องปรุงรส' },
            { id: 74, name: 'น้ำมัน', category: 'น้ำมัน' }
        ]
    }
];

const PopularRecipes: React.FC = () => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPopularRecipes();
    }, []);

    const fetchPopularRecipes = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('http://localhost:80/backend/api/popular_recipes.php');
            
            if (response.data && Array.isArray(response.data)) {
                setRecipes(response.data);
            } else if (response.data && response.data.data) {
                setRecipes(response.data.data);
            } else {
                setRecipes(fallbackRecipes);
            }
        } catch (err) {
            console.error('Error fetching popular recipes:', err);
            setRecipes(fallbackRecipes);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const tabIcons = [
        { 
            icon: <RiceBowlIcon />, 
            label: 'เมนูข้าว', 
            category: 'ข้าว',
            gradient: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
            color: '#FF9800'
        },
        { 
            icon: <RamenDiningIcon />, 
            label: 'เมนูเส้น', 
            category: 'เส้น',
            gradient: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
            color: '#4CAF50'
        },
        { 
            icon: <LocalFireDepartmentIcon />, 
            label: 'เมนูเผ็ด', 
            category: 'เผ็ด',
            gradient: 'linear-gradient(135deg, #F44336 0%, #E57373 100%)',
            color: '#F44336'
        },
        { 
            icon: <CoolIcon />, 
            label: 'เมนูไม่เผ็ด', 
            category: 'ไม่เผ็ด',
            gradient: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
            color: '#2196F3'
        }
    ];

    const getCurrentRecipes = (): Recipe[] => {
        const category = tabIcons[value].category;
        return recipes.filter(recipe => recipe.category === category);
    };

    const currentRecipes = getCurrentRecipes();

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ mt: '64px', textAlign: 'center', py: 4 }}>
                <Typography>กำลังโหลดข้อมูล...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ mt: '64px', textAlign: 'center', py: 4 }}>
                <Typography color="error">{error}</Typography>
            </Container>
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
                        onClick={() => navigate('/')}
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
                        เมนูยอดฮิต ⭐️
                    </Typography>
                </Box>

                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        mb: 4,
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#e03434'
                        }
                    }}
                >
                    {tabIcons.map((tab, index) => (
                        <Tab
                            key={index}
                            icon={React.cloneElement(tab.icon, {
                                sx: {
                                    color: value === index ? '#e03434' : '#666',
                                    fontSize: { xs: 24, md: 28 }
                                }
                            })}
                            label={tab.label}
                            sx={{
                                minHeight: { xs: 72, md: 80 },
                                fontSize: { xs: '0.9rem', md: '1rem' },
                                fontWeight: value === index ? 'bold' : 'normal',
                                color: value === index ? '#e03434' : '#666',
                                '&:hover': {
                                    color: '#e03434',
                                    opacity: 0.8
                                }
                            }}
                        />
                    ))}
                </Tabs>

                <Grid container spacing={2}>
                    {currentRecipes.map((recipe) => (
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
                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                    <Typography 
                                        gutterBottom 
                                        variant="h5" 
                                        component="h2" 
                                        sx={{ 
                                            fontWeight: 'bold',
                                            color: '#e03434',
                                            mb: 2
                                        }}
                                    >
                                        {recipe.name}
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
                                            วัตถุดิบหลัก:
                                        </Typography>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            flexWrap: 'wrap', 
                                            gap: 1,
                                            mb: 2
                                        }}>
                                            {recipe.ingredients
                                                .filter(ingredient => 
                                                    !['เครื่องปรุงรส', 'เครื่องเทศ', 'น้ำมัน', 'น้ำ'].includes(ingredient.category)
                                                )
                                                .map((ingredient, index) => (
                                                    <Chip
                                                        key={`${ingredient.id}-${index}`}
                                                        label={ingredient.name}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: 'rgba(224, 52, 52, 0.1)',
                                                            color: '#e03434'
                                                        }}
                                                    />
                                                ))}
                                        </Box>
                                        <Typography 
                                            variant="subtitle2" 
                                            sx={{ 
                                                color: '#666',
                                                mb: 1,
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            วัตถุดิบเสริม:
                                        </Typography>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            flexWrap: 'wrap', 
                                            gap: 1 
                                        }}>
                                            {recipe.ingredients
                                                .filter(ingredient => 
                                                    ['เครื่องปรุงรส', 'เครื่องเทศ', 'น้ำมัน', 'น้ำ'].includes(ingredient.category)
                                                )
                                                .map((ingredient, index) => (
                                                    <Chip
                                                        key={`${ingredient.id}-${index}`}
                                                        label={ingredient.name}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: 'rgba(224, 52, 52, 0.1)',
                                                            color: '#666'
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
        </Container>
    );
};

export default PopularRecipes; 