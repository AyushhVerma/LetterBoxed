import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavbarDropdown from './NavbarDropdown';

const Navbar = () => {
    const [loggedin, setLoggedIn] = useState(undefined);

    useEffect(() => {
      setLoggedIn(localStorage.getItem('user')?.slice(1, -1));
    }, []);
  
    return (
        <nav className="navbar">
            <Link to="/"><h1>LETTERBOXED</h1></Link>
            <Link to='/signup'>Sign Up</Link>
            { loggedin ? <NavbarDropdown usertoken = {loggedin}/> : <></> }
        </nav>
    )
};

export default Navbar;
