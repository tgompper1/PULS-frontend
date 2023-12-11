import React, { useState, useEffect} from 'react'
// We import bootstrap to make our application look better.
import '../styles/navbar.css'
import './twelve_column_grid.css'
import { FaBars, FaTimes } from 'react-icons/fa'
import '../styles/about.css'


import { useLogout } from "../hooks/useLogout";

import { NavLink } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext'; 
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const navigate = useNavigate();
    const handleLogout = () => {
        if(user != null)
        {
        logout();
        navigate("/");
        }
      };


    const [click, setClick] =  useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
        window.addEventListener('resize', showButton);
    }, []);

    const getNavLinks = () =>
    {
        if(user != null)
        {
            return [
            <ul className = {click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
                    <NavLink className="nav-links hover" to="/blog-admin" onClick={closeMobileMenu} style={{ visibility: user ? 'visible' : 'hidden'}}>
                        BLOG
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-links hover" to="/admin_calendar" onClick={closeMobileMenu} style={{ visibility: user ? 'visible' : 'hidden' }}>
                        CALENDAR
                    </NavLink>
                </li>
                <li className="nav-item my-nav-item nav-link nav-links" style={{ visibility: user ? 'visible' : 'hidden' }}>
                <button className='puls-button active nav-link nav-links' onClick={handleLogout} style={{ visibility: user ? 'visible' : 'hidden', minHeight: '20px',  height: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>LOGOUT</button>
                </li>
              
            </ul>];
        }else{
            return [
            <ul className = {click ? 'nav-menu active' : 'nav-menu'}>
                
                
                <li className="nav-item">
                    <NavLink className="nav-links hover" to="/blog" onClick={closeMobileMenu}>
                        BLOG
                    </NavLink>
                </li>
                
                <li className="nav-item hover">
                    <NavLink className="nav-links" to="/calendar" onClick={closeMobileMenu}>
                        CALENDAR
                    </NavLink>
                </li>
                
            </ul>];

        }
    }
 return (
   <div className="col-12 col-s-12">
     <nav className="navbar">
       <NavLink className="navbar-logo" to="/">
            <img src="images\logo\logo_color.png" width={120} height={80}></img>
       </NavLink>
        <div className="navbar-container container" id="navbarSupportedContent">
            <div className = 'menu-icon' onClick={handleClick}>
                {click ? <FaTimes/> : <FaBars />}
            </div>
            
                {/* <li className="nav-item my-nav-item">
                    <NavLink className="nav-link nav-links" to="/about" onClick={closeMobileMenu}>
                        ABOUT
                    </NavLink>
                </li> */}

                {getNavLinks()}
            
       </div>
     </nav>
   </div>
 );
}