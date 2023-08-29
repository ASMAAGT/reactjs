import React, { useState } from 'react';
import './Navbar.css';
import { useSelector } from 'react-redux';

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
        <a href="/" className='logo'>
            store
        </a>
        <input type='checkbox' className='menu-btn' id="menu-btn" />
        <label className='menu-icon' for='menu-btn'>
            <span className='nav-icon'></span>
            </label>
            <ul className='menu'>
                <li><a href='/'> Home</a></li>
                <li><a href='/login'>login</a></li>
                <li><a href='/products'> products</a></li>
                <li><a href='/cart'> Cart ({state.length})</a></li>
                <li><a href='/post'> Post</a></li>

                
                </ul>
        </nav>
    )
}
export default Navbar