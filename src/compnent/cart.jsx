import React, { useEffect, useState } from 'react';
import './admin.css';
import Navbar from './Navbar/Navbar';

function Cart() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);


    useEffect(() => {
      fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products:', error));
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
    

      return (
        <div className="App">
          <h1>Fake Store Products</h1>
          {editingProduct ? (
            <div className="edit-form">
              <h2>Edit Product</h2>
              <form onSubmit={handleFormSubmit}>
                <label>Name:</label>
                <input
                  type="text"
                  name="title"
                  value={editingProduct.title}
                  onChange={handleInputChange}
                />
                <label>Category:</label>
                <input
                  type="text"
                  name="category"
                  value={editingProduct.category}
                  onChange={handleInputChange}
                />
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={editingProduct.price}
                  onChange={handleInputChange}
                />
                <div>
                  <button type="submit">Save</button>
                  <button type="button" onClick={handleCancel}>Cancel</button>
                </div>
              </form>
            </div>
          ) : (
            <table className="product-table">
              {/* Table body */}
              <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img src={product.image} alt={product.title} className="product-image" />
              </td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(product.id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          )}
        </div>
      );
    }
export default Cart;
