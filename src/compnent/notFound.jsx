import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';



export default function PageNotFound (){
    const theme = createTheme({
        typography:
         {
            h2: {
              fontWeight: 800,
              fontSize: '4rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            },
            h5: {
              fontWeight: 600,
              fontSize: '1.5rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            },
          },
        palette:
         {
            
          primary: {
            main: '#E53F71',  },
          secondary: {
            main: '#003366',  },
          background: {
            default: '#f5f5f5', },
        },
      });
    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ bgcolor: 'background.default', py: 36.5}}>
           <Container maxWidth="sm">
           <Typography variant="h2" align="center" color="primary.main" gutterBottom>404</Typography>
           <Typography variant="h5" align="center" color="secondary.main" paragraph> Oops, page not found.</Typography>
           </Container>
        </Box>
        </ThemeProvider>
  );
};