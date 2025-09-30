import React from 'react';
import './NavBar.css';
import logo from './EZTechMovie.png';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import MovieIcon from '@mui/icons-material/Movie';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">
            <HomeIcon className="icon-white" /> Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">
            <InfoIcon className="icon-white" /> About
          </Link>
        </li>
        <li>
          <Link to="/movies" className="nav-link">
            <MovieIcon className="icon-white" /> Movies
          </Link>
        </li>
        <li>
          <Link to="/cart" className="nav-link">
            <ShoppingCartIcon className="icon-white" /> Cart
          </Link>
        </li>
      </ul>
      <div className="nav-logo">
        <img src={logo} alt="EZTechMovie Logo" className="logo-img" />
      </div>


    </nav>
  );
}

export default Navbar;


