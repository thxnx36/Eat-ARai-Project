import React from 'react';
import { Container, Typography, Box, Card, CardActionArea, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CasinoIcon from '@mui/icons-material/Casino';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Home: React.FC = () => {
  const theme = useTheme();

  const menuItems = [
    {
      title: 'ทำอะไรกินดี?',
      description: 'ไหนมีวัตถุดิบอะไรบ้าง?',
      icon: <SearchIcon sx={{ fontSize: { xs: 28, md: 32 } }} />,
      link: '/search',
      color: '#e03434',
      hoverColor: '#e03434',
    },
    {
      title: 'สุ่มละกัน!',
      description: 'มีเมนูในใจ?? ลองสุ่มดู!',
      icon: <CasinoIcon sx={{ fontSize: { xs: 28, md: 32 } }} />,
      link: '/random',
      color: '#e03434',
      hoverColor: '#e03434',
    },
    {
      title: 'เมนูยอดฮิต',
      description: 'รวมเมนูที่ทุกคนชอบ!',
      icon: <RestaurantIcon sx={{ fontSize: { xs: 28, md: 32 } }} />,
      link: '/popular',
      color: '#e03434',
      hoverColor: '#e03434',
    },
  ];

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FFFFFF',
        padding: 0,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ 
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        backgroundColor: '#FFFFFF',
        gap: { xs: 0, md: 2 },
      }}>
        {/* Left Section: Image */}
        <Box sx={{ 
          flex: { xs: 0.5, md: 2 },
          display: 'flex',
          alignItems: { xs: 'flex-end', md: 'center' },
          justifyContent: 'center',
          padding: { xs: '10px 20px 0', md: '40px' },
          position: 'relative',
          marginBottom: { xs: '-20px', md: 0 },
        }}>
          <Box 
            component="img"
            src="/images/eat-arai-home.png"
            alt="Featured Food"
            sx={{
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: { xs: '28vh', md: '70vh' },
              objectFit: 'contain',
              borderRadius: '20px',
            }}
          />
        </Box>

        {/* Right Section: Menu Cards */}
        <Box sx={{ 
          flex: { xs: 1, md: 1 },
          padding: { xs: '0 20px 20px', md: '40px' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: { xs: 1.5, md: 2 },
          maxWidth: { xs: '100%', md: '400px' },
        }}>
          {menuItems.map((item, index) => (
            <Card 
              key={index}
              sx={{ 
                background: '#ffffff',
                border: '3px solid #e03434',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: { xs: 'scale(1.02)', md: 'translateX(-20px)' },
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  background: item.hoverColor,
                },
              }}
            >
              <CardActionArea 
                component={Link} 
                to={item.link} 
                sx={{ 
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  '&:hover': {
                    '& .menu-text': {
                      color: '#FFFFFF',
                    },
                    '& .menu-icon': {
                      border: '2px solid #FFFFFF',
                      backgroundColor: '#e03434',
                    },
                    backgroundColor: '#e03434',
                  }
                }}
              >
                <Box 
                  className="menu-icon"
                  sx={{ 
                    backgroundColor: item.color,
                    borderRadius: '10px',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    flexShrink: 0,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography 
                    className="menu-text"
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#2D3436',
                      fontSize: { xs: '1.1rem', md: '1.2rem' },
                      mb: 0.5,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    className="menu-text"
                    variant="body2" 
                    sx={{ 
                      color: '#636E72',
                      fontSize: { xs: '0.9rem', md: '0.95rem' },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Home; 