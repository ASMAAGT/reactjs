import React, { useEffect, useState } from 'react';
import './admin.css';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Edit, Delete } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Navbar from './Navbar/Navbar';


function Cart() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false); 


    useEffect(() => {
      fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products:', error));
        fetch('https://fakestoreapi.com/products/categories')
    }, []);
  
    const handleDelete = async (id) => {
        try {
          const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
        
            setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
            console.log(`Product with id ${id} deleted successfully`);
          } else {
            console.error(`Failed to delete product with id ${id}`);
          }
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      };
  
      const handleEdit = (product) => {
        setEditingProduct(product);
        setIsEditing(true);
      };
    
  const handleCancel = () => {
    setEditingProduct(null);
  };
      const handleFormSubmit = (event) => {
        event.preventDefault();
        
        // Update the product in the products list
        const updatedProducts = products.map(product =>
          product.id === editingProduct.id ? editingProduct : product
        );
    
        setProducts(updatedProducts);
        setEditingProduct(null);
      };
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditingProduct(prevEditingProduct => ({
          ...prevEditingProduct,
          [name]: value,
        }));
      };

const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
};
const handleSearch = () => {
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredProducts(filteredProducts);
};

      return (
        <>
        <Navbar />
        <div className="admin">
        {!isEditing && (
        <div className="search-bar">
          <TextField
            fullWidth
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </div>
        )}
        {editingProduct ? (
          <div className="edit-form">
            <form onSubmit={handleFormSubmit}>
            <div className="image-preview">
      <img
        src={editingProduct.image}
        alt={editingProduct.title}
        className="product-image"
      />
    </div>
              <TextField
                fullWidth
                label="Name"
                name="title"
                value={editingProduct.title}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={editingProduct.category}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                label="Price"
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={handleInputChange}
              />
              <div className="button-group">
      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
      <Button
        type="button"
        onClick={handleCancel}
        variant="contained"
        startIcon={<CancelIcon />}
      >
        Cancel
      </Button>
    </div>
            </form>
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="product-image"
                      />
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleEdit(product)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(product.id)}
                        color="secondary"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      </>
    );
  }
  
export default Cart;
