import React from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: '#e03434',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo Section */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src="/images/logo.png"
            alt="Eat-Arai Logo"
            sx={{
              height: { xs: '40px', md: '45px' },
              width: 'auto',
              marginRight: 1,
            }}
          />
        </Link>

        {/* Navigation Links */}
        <Box sx={{ 
          display: 'flex', 
          gap: { xs: 1, md: 2 },
        }}>
          <Button
            component={Link}
            to="/search"
            sx={{
              color: '#FFFFFF',
              fontSize: { xs: '0.9rem', md: '1rem' },
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#a13333',
                transform: 'translateY(-2px)',
              },
            }}
          >
            ทำกินเอง
          </Button>
          <Button
            component={Link}
            to="/random"
            sx={{
              color: '#FFFFFF',
              fontSize: { xs: '0.9rem', md: '1rem' },
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#a13333',
                transform: 'translateY(-2px)',
              },
            }}
          >
            สุ่มเมนู
          </Button>
          <Button
            component={Link}
            to="/popular"
            sx={{
              color: '#FFFFFF',
              fontSize: { xs: '0.9rem', md: '1rem' },
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#a13333',
                transform: 'translateY(-2px)',
              },
            }}
          >
            เมนูยอดฮิต
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 