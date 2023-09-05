import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Utilisez la valeur de formData pour la requête fetch
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Utilisez formData
      });

      if (response.ok) {
        // Si la connexion réussit, redirigez l'utilisateur vers une page appropriée
        navigate('/home'); // Remplacez '/home' par la page appropriée
      } else {
        // Gérer les erreurs de connexion ici
        console.error('Failed to log in');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/assets/shop.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <ShoppingBagOutlinedIcon sx={{ m: 1, color: '#f4c85d', width: '60px', height: '60px' }} />
            <Typography component="h1" variant="h5">
              Happy to see you
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: 'black', color: 'white' }}
                sx={{ mt: 3, mb: 2, width: '200px' }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
