// src/components/Navbar.js
import React, { useState } from 'react';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/img/learnxalogo.png'; // Adjust the path as necessary
import '../assets/css/Navbar.css'; // Move styles here from the inline styles

const MainNavbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual authentication status

  const toggleNavbar = (event) => {
    event.stopPropagation();
    setIsNavOpen(!isNavOpen);
  };

  const closeNavbar = (event) => {
    if (isNavOpen) setIsNavOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg px-3" onClick={closeNavbar}>
      <Link className="navbar-brand" to="/">
        <span className="d-flex align-items-center gap-1">
          <img src={logo} alt="LearnXa Logo" width="32" />
          Face<span style={{ color: '#007bff' }}>App</span>
        </span>
      </Link>
      <button className="navbar-toggler" onClick={toggleNavbar}>
        <i className={`fas ${isNavOpen ? 'fa-times' : 'fa-bars'}`} style={{ fontSize: '24px' }}></i>
      </button>
      <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <Link className="navbar-brand d-lg-none text-center" to="/">
            <span className="d-flex align-items-center gap-1">
              <img src={logo} alt="LearnXa Logo" width="32" />
              Face<span style={{ color: '#007bff' }}>App</span>
            </span>
          </Link>
          <form className="form-inline my-2 my-lg-0 d-lg-none">
            <div className="input-group w-100">
              <input className="form-control" type="search" placeholder="Search Anything" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-outline-blue" type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </form>
          
          <form className="form-inline my-2 my-lg-0 d-none d-lg-flex ml-auto">
            <div className="input-group">
              <input className="form-control" type="search" placeholder="Search Anything" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-outline-blue" type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/courses">Download</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/become-teacher">Pricing</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/virtual-courses">About</Link>
          </li>
          {isLoggedIn ? (
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-user"></i> Profile
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="profileDropdown">
                <Link className="dropdown-item" to="/profile">Dashboard</Link>
                <Link className="dropdown-item" to="/settings">Settings</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/logout">Logout</Link>
              </div>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login"><button className="btn mr-2 btn-outline-blue"><i className="fas fa-user"></i> Login</button></Link>
              </li>
              <li className="nav-item">
                <Link to="/enroll"><button className="btn btn-outline-blue join">Enroll Now</button></Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default MainNavbar;
