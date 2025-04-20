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
            { id: 1, name: 'ข้าวสวย', category: 'ข้าว' },
            { id: 2, name: 'หมูสับ', category: 'เนื้อสัตว์' },
            { id: 3, name: 'ไข่ไก่', category: 'เนื้อสัตว์' },
            { id: 4, name: 'กระเทียม', category: 'ผัก' },
            { id: 5, name: 'หอมแดง', category: 'ผัก' },
            { id: 6, name: 'ต้นหอม', category: 'ผัก' },
            { id: 7, name: 'น้ำมันพืช', category: 'น้ำมัน' },
            { id: 8, name: 'ซีอิ๊วขาว', category: 'เครื่องปรุงรส' },
            { id: 9, name: 'น้ำปลา', category: 'เครื่องปรุงรส' },
            { id: 10, name: 'พริกไทย', category: 'เครื่องเทศ' }
        ]
    },
    {
        id: 2,
        name: 'ข้าวผัดกุ้ง',
        description: 'ข้าวผัดกุ้งสด รสชาติอร่อย',
        image_path: '/images/recipes/khao_pad_kung.jpg',
        category: 'ข้าว',
        ingredients: [
            { id: 1, name: 'ข้าวสวย', category: 'ข้าว' },
            { id: 11, name: 'กุ้งสด', category: 'เนื้อสัตว์' },
            { id: 3, name: 'ไข่ไก่', category: 'เนื้อสัตว์' },
            { id: 4, name: 'กระเทียม', category: 'ผัก' },
            { id: 5, name: 'หอมแดง', category: 'ผัก' },
            { id: 6, name: 'ต้นหอม', category: 'ผัก' },
            { id: 7, name: 'น้ำมันพืช', category: 'น้ำมัน' },
            { id: 8, name: 'ซีอิ๊วขาว', category: 'เครื่องปรุงรส' },
            { id: 9, name: 'น้ำปลา', category: 'เครื่องปรุงรส' },
            { id: 10, name: 'พริกไทย', category: 'เครื่องเทศ' }
        ]
    },
    {
        id: 3,
        name: 'ข้าวผัดไก่',
        description: 'ข้าวผัดไก่สูตรเด็ด',
        image_path: '/images/recipes/khao_pad_kai.jpg',
        category: 'ข้าว',
        ingredients: [
            { id: 1, name: 'ข้าวสวย', category: 'ข้าว' },
            { id: 12, name: 'ไก่สับ', category: 'เนื้อสัตว์' },
            { id: 3, name: 'ไข่ไก่', category: 'เนื้อสัตว์' },
            { id: 4, name: 'กระเทียม', category: 'ผัก' },
            { id: 5, name: 'หอมแดง', category: 'ผัก' },
            { id: 6, name: 'ต้นหอม', category: 'ผัก' },
            { id: 7, name: 'น้ำมันพืช', category: 'น้ำมัน' },
            { id: 8, name: 'ซีอิ๊วขาว', category: 'เครื่องปรุงรส' },
            { id: 9, name: 'น้ำปลา', category: 'เครื่องปรุงรส' },
            { id: 10, name: 'พริกไทย', category: 'เครื่องเทศ' }
        ]
    },
    {
        id: 4,
        name: 'ผัดไทย',
        description: 'ผัดไทยสูตรต้นตำรับ',
        image_path: '/images/recipes/pad_thai.jpg',
        category: 'เส้น',
        ingredients: [
            { id: 13, name: 'เส้นผัดไทย', category: 'เส้น' },
            { id: 14, name: 'ถั่วงอก', category: 'ผัก' },
            { id: 15, name: 'ไชโป๊', category: 'ผัก' },
            { id: 6, name: 'ต้นหอม', category: 'ผัก' },
            { id: 16, name: 'ไข่', category: 'เนื้อสัตว์' },
            { id: 17, name: 'กุ้งแห้ง', category: 'เนื้อสัตว์' },
            { id: 18, name: 'เต้าหู้', category: 'โปรตีน' },
            { id: 19, name: 'น้ำตาลปี๊บ', category: 'เครื่องปรุงรส' },
            { id: 20, name: 'น้ำมะขามเปียก', category: 'เครื่องปรุงรส' },
            { id: 9, name: 'น้ำปลา', category: 'เครื่องปรุงรส' }
        ]
    },
    {
        id: 5,
        name: 'ก๋วยเตี๋ยวต้มยำ',
        description: 'ก๋วยเตี๋ยวต้มยำรสจัด',
        image_path: '/images/recipes/tom_yum_noodle.jpg',
        category: 'เส้น',
        ingredients: [
            { id: 21, name: 'เส้นก๋วยเตี๋ยว', category: 'เส้น' },
            { id: 11, name: 'กุ้งสด', category: 'เนื้อสัตว์' },
            { id: 22, name: 'หมูสับ', category: 'เนื้อสัตว์' },
            { id: 23, name: 'ผักบุ้ง', category: 'ผัก' },
            { id: 24, name: 'พริกสด', category: 'ผัก' },
            { id: 25, name: 'มะนาว', category: 'ผัก' },
            { id: 26, name: 'น้ำพริกเผา', category: 'เครื่องปรุงรส' },
            { id: 27, name: 'น้ำมะนาว', category: 'เครื่องปรุงรส' },
            { id: 9, name: 'น้ำปลา', category: 'เครื่องปรุงรส' },
            { id: 28, name: 'พริกป่น', category: 'เครื่องเทศ' }
        ]
    },
    {
        id: 6,
        name: 'ส้มตำ',
        description: 'ส้มตำไทยรสจัด',
        image_path: '/images/recipes/som_tam.jpg',
        category: 'เผ็ด',
        ingredients: [
            { id: 29, name: 'มะละกอ', category: 'ผัก' },
            { id: 30, name: 'มะเขือเทศ', category: 'ผัก' },
            { id: 31, name: 'ถั่วฝักยาว', category: 'ผัก' },
            { id: 32, name: 'กระเทียม', category: 'ผัก' },
            { id: 33, name: 'พริกสด', category: 'ผัก' },
            { id: 34, name: 'มะนาว', category: 'ผัก' },
            { id: 35, name: 'น้ำตาลปี๊บ', category: 'เครื่องปรุงรส' },
            { id: 9, name: 'น้ำปลา', category: 'เครื่องปรุงรส' },
            { id: 36, name: 'กะปิ', category: 'เครื่องปรุงรส' },
            { id: 37, name: 'ปูเค็ม', category: 'เครื่องปรุงรส' }
        ]
    },
    {
        id: 7,
        name: 'ต้มยำกุ้ง',
        description: 'ต้มยำกุ้งรสจัด',
        image_path: '/images/recipes/tom_yum_kung.jpg',
        category: 'เผ็ด',
        ingredients: [
            { id: 11, name: 'กุ้งสด', category: 'เนื้อสัตว์' },
            { id: 38, name: 'เห็ดฟาง', category: 'ผัก' },
            { id: 39, name: 'ข่า', category: 'สมุนไพร' },
            { id: 40, name: 'ตะไคร้', category: 'สมุนไพร' },
            { id: 41, name: 'ใบมะกรูด', category: 'สมุนไพร' },
            { id: 42, name: 'พริกขี้หนู', category: 'ผัก' },
            { id: 43, name: 'น้ำพริกเผา', category: 'เครื่องปรุงรส' },
            { id: 44, name: 'น้ำมะนาว', category: 'เครื่องปรุงรส' },
            { id: 9, name: 'น้ำปลา', category: 'เครื่องปรุงรส' },
            { id: 45, name: 'ผงปรุงรส', category: 'เครื่องปรุงรส' }
        ]
    },
    {
        id: 8,
        name: 'แกงจืด',
        description: 'แกงจืดรสกลมกล่อม',
        image_path: '/images/recipes/kaeng_jeut.jpg',
        category: 'ไม่เผ็ด',
        ingredients: [
            { id: 46, name: 'หมูบด', category: 'เนื้อสัตว์' },
            { id: 47, name: 'เต้าหู้ไข่', category: 'โปรตีน' },
            { id: 48, name: 'ผักกาดขาว', category: 'ผัก' },
            { id: 49, name: 'แครอท', category: 'ผัก' },
            { id: 50, name: 'ต้นหอม', category: 'ผัก' },
            { id: 51, name: 'ผักชี', category: 'ผัก' },
            { id: 52, name: 'กระเทียม', category: 'ผัก' },
            { id: 53, name: 'รากผักชี', category: 'ผัก' },
            { id: 54, name: 'ซีอิ๊วขาว', category: 'เครื่องปรุงรส' },
            { id: 10, name: 'พริกไทย', category: 'เครื่องเทศ' }
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
            console.log('API Response:', response.data);
            
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