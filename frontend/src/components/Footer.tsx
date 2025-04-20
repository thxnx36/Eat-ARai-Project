import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        backgroundColor: '#e03434',
        color: 'white',
        py: 2,
        mt: 'auto'
      }}
    >
      <Typography
        variant="body2"
        align="center"
        sx={{
          margin: 0
        }}
      >
        © 2025 Eat-Arai. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer; 