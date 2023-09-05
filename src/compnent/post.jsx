import React, { useState } from 'react';

import { styled } from '@mui/material/styles';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Link, useNavigate } from 'react-router-dom';

const useStyles = styled((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    

  },
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(2),
  },
}));

const categories = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
];

function Post() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: categories[0], 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
       
        navigate('/home'); 
      })
      .catch((error) => {
        console.error('Erreur lors de la création du produit :', error);
      
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container} sx={{ width: '600px' }}>
      <Paper elevation={3} className={classes.paper}>
        <AddShoppingCartOutlinedIcon sx={{ m: 1, color: '#f4c85d', width: '60px', height: '60px' }} />
        <h2>ADD NEW PRODUCT</h2>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Titre"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="price"
            label="Prix"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            id="description"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="image"
            label="URL de l'image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
          <Select
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="category"
            label="Catégorie"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          <Grid container spacing={2}>
  <Grid item xs={6}>
          <Button
  type="submit"
  fullWidth
  variant="contained"
  color="primary"
  className={classes.submit}
  style={{ backgroundColor: 'black', color: 'white' }}
>
  Save
</Button></Grid>
<Grid item xs={6}>
<Button
  fullWidth
  variant="outlined"
  color="secondary"
  className={classes.submit}
  component={Link}
  to="/home"
  style={{ color: 'black' }}
>
  Cancel
</Button></Grid></Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Post;
