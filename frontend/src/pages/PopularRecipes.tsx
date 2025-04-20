import React from 'react';
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
    CardMedia
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CoolIcon from '@mui/icons-material/AcUnit';
import { keyframes } from '@mui/system';

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
    id: string;
    name: string;
    description: string;
    image: string;
}

const PopularRecipes: React.FC = () => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // ข้อมูลเมนูยอดฮิตแบ่งตามหมวดหมู่
    const popularRecipes = {
        rice: [
            { id: 'khao-pad', name: 'ข้าวผัด', description: 'ข้าวผัดที่ทำง่ายและมีรสชาติอร่อย', image: '/images/khao-pad.jpg' },
            { id: 'khao-mun-gai', name: 'ข้าวมันไก่', description: 'อาหารจานเดียวที่มีข้าวหุงกับน้ำมันไก่และไก่ต้ม', image: '/images/khao-mun-gai.jpg' },
            { id: 'khao-ka-moo', name: 'ข้าวขาหมู', description: 'ข้าวราดขาหมูตุ๋นจนเปื่อยนุ่ม', image: '/images/khao-ka-moo.jpg' },
            { id: 'khao-mun-gai-tod', name: 'ข้าวมันไก่ทอด', description: 'ข้าวมันไก่ที่เสิร์ฟคู่กับไก่ทอดกรอบ', image: '/images/khao-mun-gai-tod.jpg' },
            { id: 'khao-pad-saparo', name: 'ข้าวผัดสะโพก', description: 'ข้าวผัดที่ใช้เนื้อสะโพกไก่เป็นส่วนประกอบ', image: '/images/khao-pad-saparo.jpg' },
            { id: 'khao-pad-kai', name: 'ข้าวผัดไก่', description: 'ข้าวผัดที่ใช้เนื้อไก่เป็นส่วนประกอบ', image: '/images/khao-pad-kai.jpg' },
            { id: 'khao-pad-moo', name: 'ข้าวผัดหมู', description: 'ข้าวผัดที่ใช้เนื้อหมูเป็นส่วนประกอบ', image: '/images/khao-pad-moo.jpg' },
            { id: 'khao-pad-goong', name: 'ข้าวผัดกุ้ง', description: 'ข้าวผัดที่ใช้กุ้งเป็นส่วนประกอบ', image: '/images/khao-pad-goong.jpg' },
            { id: 'khao-pad-poo', name: 'ข้าวผัดปู', description: 'ข้าวผัดที่ใช้เนื้อปูเป็นส่วนประกอบ', image: '/images/khao-pad-poo.jpg' },
            { id: 'khao-pad-ka-prao', name: 'ข้าวผัดกะเพรา', description: 'ข้าวผัดที่ใช้ใบกะเพราเป็นส่วนประกอบ', image: '/images/khao-pad-ka-prao.jpg' }
        ],
        noodle: [
            { id: 'pad-thai', name: 'ผัดไทย', description: 'อาหารจานเดียวที่คนทั่วโลกรู้จัก มีรสชาติกลมกล่อมทั้งเปรี้ยว หวาน เค็ม', image: '/images/pad-thai.jpg' },
            { id: 'pad-see-ew', name: 'ผัดซีอิ๊ว', description: 'ผัดเส้นที่ใช้ซีอิ๊วเป็นเครื่องปรุงหลัก มีรสชาติกลมกล่อม', image: '/images/pad-see-ew.jpg' },
            { id: 'khao-soi', name: 'ข้าวซอย', description: 'อาหารเหนือที่มีรสชาติเข้มข้นจากกะทิและเครื่องแกง', image: '/images/khao-soi.jpg' },
            { id: 'ba-mee-moo-dang', name: 'บะหมี่หมูแดง', description: 'บะหมี่ที่เสิร์ฟคู่กับหมูแดง', image: '/images/ba-mee-moo-dang.jpg' },
            { id: 'ba-mee-tom-yum', name: 'บะหมี่ต้มยำ', description: 'บะหมี่ที่ใช้เครื่องต้มยำเป็นส่วนประกอบ', image: '/images/ba-mee-tom-yum.jpg' },
            { id: 'pad-woon-sen', name: 'ผัดวุ้นเส้น', description: 'ผัดที่ใช้วุ้นเส้นเป็นส่วนประกอบหลัก', image: '/images/pad-woon-sen.jpg' },
            { id: 'pad-kee-mao', name: 'ผัดขี้เมา', description: 'ผัดเส้นที่มีรสชาติเผ็ดร้อน', image: '/images/pad-kee-mao.jpg' },
            { id: 'pad-mama', name: 'ผัดมาม่า', description: 'ผัดที่ใช้บะหมี่กึ่งสำเร็จรูปเป็นส่วนประกอบ', image: '/images/pad-mama.jpg' },
            { id: 'pad-sen-lek', name: 'ผัดเส้นเล็ก', description: 'ผัดที่ใช้เส้นเล็กเป็นส่วนประกอบ', image: '/images/pad-sen-lek.jpg' },
            { id: 'pad-sen-yai', name: 'ผัดเส้นใหญ่', description: 'ผัดที่ใช้เส้นใหญ่เป็นส่วนประกอบ', image: '/images/pad-sen-yai.jpg' }
        ],
        spicy: [
            { id: 'tom-yum', name: 'ต้มยำ', description: 'ซุปรสจัดจ้านที่ขึ้นชื่อของไทย มีรสเปรี้ยว เผ็ด เค็ม กลมกล่อม', image: '/images/tom-yum.jpg' },
            { id: 'som-tum', name: 'ส้มตำ', description: 'สลัดไทยที่มีรสชาติเปรี้ยว เผ็ด เค็ม หวาน กลมกล่อม', image: '/images/som-tum.jpg' },
            { id: 'larb', name: 'ลาบ', description: 'สลัดเนื้อสับแบบไทยอีสาน มีรสชาติเปรี้ยว เผ็ด เค็ม', image: '/images/larb.jpg' },
            { id: 'pad-kra-pao', name: 'ผัดกะเพรา', description: 'เมนูยอดนิยมของคนไทย ใช้ใบกะเพราเป็นส่วนประกอบหลัก รสชาติเผ็ดร้อน', image: '/images/pad-kra-pao.jpg' },
            { id: 'green-curry', name: 'แกงเขียวหวาน', description: 'แกงไทยที่มีรสชาติเข้มข้นจากพริกแกงเขียวหวานและกะทิ', image: '/images/green-curry.jpg' },
            { id: 'massaman-curry', name: 'แกงมัสมั่น', description: 'แกงไทยที่มีอิทธิพลจากอาหารมุสลิม มีรสชาติเข้มข้นและกลมกล่อม', image: '/images/massaman-curry.jpg' },
            { id: 'pad-prik-king', name: 'ผัดพริกแกง', description: 'ผัดที่ใช้พริกแกงเป็นเครื่องปรุงหลัก มีรสชาติเผ็ดร้อน', image: '/images/pad-prik-king.jpg' },
            { id: 'tom-kha', name: 'ต้มข่าไก่', description: 'ซุปที่มีรสชาติกลมกล่อมจากกะทิและข่า', image: '/images/tom-kha.jpg' },
            { id: 'pad-prik-pao', name: 'ผัดพริกเผา', description: 'ผัดที่ใช้พริกเผาเป็นเครื่องปรุงหลัก', image: '/images/pad-prik-pao.jpg' },
            { id: 'pad-ma-kheua-yao', name: 'ผัดมะเขือยาว', description: 'ผัดมะเขือยาวที่มีรสชาติกลมกล่อม', image: '/images/pad-ma-kheua-yao.jpg' }
        ],
        mild: [
            { id: 'pad-pak-bung', name: 'ผัดผักบุ้ง', description: 'ผัดผักที่ทำง่ายและมีรสชาติอร่อย', image: '/images/pad-pak-bung.jpg' },
            { id: 'pad-pak-ruam', name: 'ผัดผักรวม', description: 'ผัดผักรวมที่มีผักหลากหลายชนิด', image: '/images/pad-pak-ruam.jpg' },
            { id: 'khao-tom', name: 'ข้าวต้ม', description: 'อาหารอ่อนย่อยง่าย เหมาะสำหรับคนป่วย', image: '/images/khao-tom.jpg' },
            { id: 'khao-man-gai', name: 'ข้าวมันไก่', description: 'อาหารจานเดียวที่มีข้าวหุงกับน้ำมันไก่และไก่ต้ม', image: '/images/khao-man-gai.jpg' },
            { id: 'khao-mun-gai', name: 'ข้าวมันไก่', description: 'อาหารจานเดียวที่มีข้าวหุงกับน้ำมันไก่และไก่ต้ม', image: '/images/khao-mun-gai.jpg' },
            { id: 'khao-pad-kai', name: 'ข้าวผัดไก่', description: 'ข้าวผัดที่ใช้เนื้อไก่เป็นส่วนประกอบ', image: '/images/khao-pad-kai.jpg' },
            { id: 'khao-pad-moo', name: 'ข้าวผัดหมู', description: 'ข้าวผัดที่ใช้เนื้อหมูเป็นส่วนประกอบ', image: '/images/khao-pad-moo.jpg' },
            { id: 'khao-pad-goong', name: 'ข้าวผัดกุ้ง', description: 'ข้าวผัดที่ใช้กุ้งเป็นส่วนประกอบ', image: '/images/khao-pad-goong.jpg' },
            { id: 'khao-pad-poo', name: 'ข้าวผัดปู', description: 'ข้าวผัดที่ใช้เนื้อปูเป็นส่วนประกอบ', image: '/images/khao-pad-poo.jpg' },
            { id: 'khao-pad-ka-prao', name: 'ข้าวผัดกะเพรา', description: 'ข้าวผัดที่ใช้ใบกะเพราเป็นส่วนประกอบ', image: '/images/khao-pad-ka-prao.jpg' }
        ]
    };

    const tabIcons = [
        { 
            icon: <RiceBowlIcon />, 
            label: 'เมนูข้าว', 
            gradient: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
            color: '#FF9800'
        },
        { 
            icon: <RamenDiningIcon />, 
            label: 'เมนูเส้น', 
            gradient: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
            color: '#4CAF50'
        },
        { 
            icon: <LocalFireDepartmentIcon />, 
            label: 'เมนูเผ็ด', 
            gradient: 'linear-gradient(135deg, #F44336 0%, #E57373 100%)',
            color: '#F44336'
        },
        { 
            icon: <CoolIcon />, 
            label: 'เมนูไม่เผ็ด', 
            gradient: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
            color: '#2196F3'
        }
    ];

    const getCurrentRecipes = (): Recipe[] => {
        switch (value) {
            case 0:
                return popularRecipes.rice;
            case 1:
                return popularRecipes.noodle;
            case 2:
                return popularRecipes.spicy;
            case 3:
                return popularRecipes.mild;
            default:
                return [];
        }
    };

    const currentRecipes = getCurrentRecipes();

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
                        <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 2,
                                    border: '1px solid #FFE8E8',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 8px 16px rgba(224,52,52,0.1)',
                                    }
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={recipe.image}
                                    alt={recipe.name}
                                    sx={{
                                        objectFit: 'cover'
                                    }}
                                />
                                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 'bold',
                                            color: '#e03434',
                                            mb: 1
                                        }}
                                    >
                                        {recipe.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#666',
                                            mb: 2
                                        }}
                                    >
                                        {recipe.description}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ p: 2, pt: 0 }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#e03434',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#FF407A'
                                            }
                                        }}
                                    >
                                        ดูสูตรอาหาร
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default PopularRecipes; 