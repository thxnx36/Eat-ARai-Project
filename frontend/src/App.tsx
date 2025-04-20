import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes';
import { Box } from '@mui/material';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    margin: 0,
                    padding: 0
                }}
            >
                <Navbar />
                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        margin: 0,
                        padding: 0
                    }}
                >
                    <AppRoutes />
                </Box>
                <Footer />
            </Box>
        </BrowserRouter>
    );
};

export default App;
