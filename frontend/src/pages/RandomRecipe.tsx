import React, { useState, useRef, useEffect } from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    Button, 
    TextField, 
    IconButton,
    Card,
    CardContent,
    CardMedia,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CasinoIcon from '@mui/icons-material/Casino';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { keyframes } from '@mui/system';

const float = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
`;

const gradient = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const RandomRecipe: React.FC = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState<string[]>([]);
    const [newItem, setNewItem] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleAddItem = () => {
        if (newItem.trim() && items.length < 8) {
            setItems([...items, newItem.trim()]);
            setNewItem('');
        }
    };

    const handleDeleteItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleSpin = () => {
        if (items.length > 0) {
            setIsSpinning(true);
            const spinDuration = 3000; // 3 seconds
            const startTime = Date.now();
            
            const animate = () => {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                
                if (elapsed < spinDuration) {
                    const randomIndex = Math.floor(Math.random() * items.length);
                    setSelectedItem(items[randomIndex]);
                    requestAnimationFrame(animate);
                } else {
                    setIsSpinning(false);
                    const finalIndex = Math.floor(Math.random() * items.length);
                    setSelectedItem(items[finalIndex]);
                }
            };
            
            animate();
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (items.length === 0) {
            // Draw empty wheel
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fillStyle = '#F5F5F5';
            ctx.fill();
            ctx.strokeStyle = '#E0E0E0';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw "Add items" text
            ctx.fillStyle = '#999';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('เพิ่มเมนู', centerX, centerY);
            return;
        }

        const segmentAngle = (Math.PI * 2) / items.length;
        const colors = [
            '#FFB3B3', // light red
            '#B3FFB3', // light green
            '#B3B3FF', // light blue
            '#FFE0B3', // light orange
            '#FFB3FF', // light pink
            '#B3FFE0', // mint green
            '#E0B3FF', // light purple
            '#B3E0FF'  // light cyan
        ];

        items.forEach((item, index) => {
            const startAngle = index * segmentAngle;
            const endAngle = startAngle + segmentAngle;

            // Draw segment
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = colors[index % colors.length];
            ctx.fill();
            ctx.strokeStyle = '#444';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw text
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + segmentAngle / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#000';
            ctx.font = 'bold 16px Arial';
            ctx.fillText(item, radius - 20, 5);
            ctx.restore();
        });

        // Draw center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
        ctx.fillStyle = '#FFF';
        ctx.fill();
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 2;
        ctx.stroke();
    }, [items]);

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
                        สุ่มเองเลย! 🎲
                    </Typography>
                </Box>

                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' }, 
                    gap: { xs: 3, md: 4 },
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Paper 
                        elevation={0}
                        sx={{ 
                            p: { xs: 2, sm: 3 },
                            borderRadius: 2,
                            border: '1px solid #FFE8E8',
                            width: { xs: '100%', md: '50%' }
                        }}
                    >
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="เพิ่มเมนูอาหาร..."
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        background: 'white',
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#e03434'
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#e03434'
                                        }
                                    }
                                }}
                            />
                            <IconButton
                                onClick={handleAddItem}
                                sx={{
                                    backgroundColor: '#e03434',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#FF407A'
                                    }
                                }}
                            >
                                <AddIcon />
                            </IconButton>
                        </Box>

                        <List sx={{ mb: 2 }}>
                            {items.map((item, index) => (
                                <ListItem
                                    key={index}
                                    secondaryAction={
                                        <IconButton 
                                            edge="end" 
                                            onClick={() => handleDeleteItem(index)}
                                            sx={{
                                                color: '#666',
                                                '&:hover': {
                                                    color: '#e03434'
                                                }
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                    sx={{
                                        borderRadius: 2,
                                        mb: 1,
                                        backgroundColor: 'white',
                                        border: '1px solid #FFE8E8',
                                        '&:hover': {
                                            backgroundColor: '#FFE8E8'
                                        }
                                    }}
                                >
                                    <ListItemIcon>
                                        <RestaurantIcon sx={{ color: '#e03434' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={item}
                                        sx={{
                                            '& .MuiListItemText-primary': {
                                                color: '#333',
                                                fontWeight: 500
                                            }
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </List>

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleSpin}
                            disabled={items.length === 0 || isSpinning}
                            startIcon={<CasinoIcon />}
                            sx={{
                                backgroundColor: '#e03434',
                                color: 'white',
                                py: 1.5,
                                borderRadius: 2,
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#FF407A',
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: '#FFE8E8',
                                    color: '#999'
                                }
                            }}
                        >
                            {isSpinning ? 'กำลังสุ่ม...' : 'สุ่มเลย!'}
                        </Button>
                    </Paper>

                    <Box sx={{ 
                        width: { xs: '100%', md: '50%' },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <canvas
                            ref={canvasRef}
                            width={300}
                            height={300}
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                marginBottom: '1rem'
                            }}
                        />
                        {selectedItem && (
                            <Card 
                                elevation={0}
                                sx={{ 
                                    width: '100%',
                                    borderRadius: 2,
                                    border: '1px solid #FFE8E8',
                                    overflow: 'hidden'
                                }}
                            >
                                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                                    <Typography 
                                        variant="h5" 
                                        component="h2"
                                        sx={{
                                            fontSize: { xs: '1.3rem', sm: '1.5rem' },
                                            fontWeight: 'bold',
                                            color: '#e03434',
                                            textAlign: 'center',
                                            mb: 1
                                        }}
                                    >
                                        {selectedItem}
                                    </Typography>
                                    <Typography 
                                        sx={{
                                            color: '#666',
                                            textAlign: 'center'
                                        }}
                                    >
                                    </Typography>
                                </CardContent>
                            </Card>
                        )}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default RandomRecipe; 