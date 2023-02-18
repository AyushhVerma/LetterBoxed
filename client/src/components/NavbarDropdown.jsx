import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavbarDropdown = (props) => {
  // const LOG = (...args) => console.log(...args);
  const [showDropdown, setShowDropdown] = useState(false);
  const goto = "/watchlist/" + props.usertoken;
  return (
    <div className="navbar-dropdown">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="dropdown-toggle"
      >
        drop
      </button>
      {showDropdown && (
        <ul className="dropdown-menu">
          <li><Link to={goto}>Watchlist</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      )}
    </div>
  );
};

export default NavbarDropdown;
