import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Footer from '../Footer/Footer';

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderNavigation = () => {
    if (windowWidth <= 375) {
      return (
        <>
          <div className="nav-container">
            <span className="left">Logo</span>
            <img
              className="burger"
              src="https://img.icons8.com/ios/50/000000/menu--v1.png"
              alt="menu--v1"
            />
          </div>
        </>
      );
    }
    return (
      <div className="vertical-line">
        <div className="nav-container">
          <span className="left">Logo</span>
          <div>
            <ul>
              <li>
                <Link to="/">
                  <button type="button" className="btn btn-success">
                    Home
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/feature">
                  <button type="button" className="btn btn-success">
                    Feature
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/Addform">
                  <button type="button" className="btn btn-success">
                    AddItem
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/Reservation">
                  <button type="button" className="btn btn-role btn-success">
                    Reservation
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  return renderNavigation();
};

export default Navbar;
