import React from 'react';
import './NavBar.css';
import logo from './EZTechMovie.png';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import MovieIcon from '@mui/icons-material/Movie';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // for navigation around logout button



function NavBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };


  return (
    
    <nav className="navbar">
      <img src={logo} alt="EZTechMovie Logo" className="logo-img" />
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
        
      </div>
      {/* User name block in the navbar */}
      {user && (
        <div className="user-info">
          <p className="username-label">Logged in as:</p>
          <p className="username-value">{user.name}</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
)}

    </nav>
  );
}

export default NavBar;


