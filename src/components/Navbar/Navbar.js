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

  const LinksComponent = () => {
    const [showLinks, setShowLinks] = useState(false);

    const toggleLinks = () => {
      setShowLinks(!showLinks);
    };

    const renderNavigation = () => {
      if (windowWidth <= 375) {
        return (
          <div className="nav-container">
            <span className="left">Logo</span>
            <button
              type="button"
              onClick={toggleLinks}
              className="burger"
              aria-label="Toggle Menu"
            >
              <img
                src="https://img.icons8.com/ios/50/000000/menu--v1.png"
                alt="menu--v1"
              />
            </button>
            {showLinks && (
              <div className="pop-up">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/feature">Feature</Link>
                  </li>
                  <li>
                    <Link to="/Addform">AddItem</Link>
                  </li>
                  <li>
                    <Link to="/Reservation">Reservation</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
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

  return <LinksComponent />;
};

export default Navbar;
