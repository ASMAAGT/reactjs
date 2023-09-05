import React, { useState } from 'react';
import './Navbar.css';
import { useSelector } from 'react-redux';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

import { Button } from '@mui/material';


function Navbar(){
    const state = useSelector((state) => state.handleCart)
    const [nav, setnav] = useState(false);
    const changeBackground = () => {
        if (window.scrollY >= 50){
            setnav(true);
        }else{
            setnav(false);
        }
    }
    window.addEventListener('scroll', changeBackground);
    return(
        <nav className={nav ? 'nav active' : 'nav'}>
        <a href="/home" className='logo'>
            store
        </a>
        <input type='checkbox' className='menu-btn' id="menu-btn" />
        <label className='menu-icon' for='menu-btn'>
            <span className='nav-icon'></span>
            </label>
            <ul className='menu'>
                <li><a href='/home'> HOME</a></li>
                <li><a href='/products'> PRODUCTS</a></li>
                <li><a href='/admin'> Espace Admin</a></li>
                <li>
                <a href="/post">
          <Button
             className="outlined"
            style={{color: 'black'}}
            startIcon={<AddShoppingCartOutlinedIcon style={{ color: 'red'}} />}
            sx={{
                '&:hover': {
                  color: 'white !important', 
                },
              }}
          >
            je Vends !
          </Button>
          </a>
        </li>

                
                </ul>
        </nav>
    )
}
export default Navbar