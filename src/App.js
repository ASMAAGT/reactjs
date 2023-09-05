import './App.css';
import Home from './compnent/Home';
import Products from './compnent/Products';
import Login from './compnent/login';
import Product from './compnent/Product';
import Cart from './compnent/admin';
import { Route, Routes } from 'react-router-dom';
import Post from './compnent/post';

function App() {
  return (
    <>
<Routes>
      <Route path='/Home' element={<Home />}/>
      <Route path='/' element={<Login />}/>
      <Route path='/products' element={<Products />}/>
      <Route path='/admin' element={<Cart />}/>
      <Route path='/products/:id' element={<Product />}/>
      <Route path='/post' element={<Post />}/>
      </Routes>
    </>
  );
}

export default App;
