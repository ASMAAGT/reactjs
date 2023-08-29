import './App.css';
import Home from './compnent/Home';
import Products from './compnent/Products';
import Login from './compnent/login';
import Product from './compnent/Product';
import Cart from './compnent/cart';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
<Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/products' element={<Products />}/>
      <Route path='/cart' element={<Cart />}/>
      <Route path='/products/:id' element={<Product />}/>
      </Routes>
    </>
  );
}

export default App;
