import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import './Navbar.css';
import Footer from '../Footer/Footer';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to the home page after logout
  };

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
                    <Link to="/feature">Doctors</Link>
                  </li>
                  <li>
                    <Link to="/Addform">AddItem</Link>
                  </li>
                  <li>
                    <Link to="/Reservation">Appointments</Link>
                  </li>
                  {isAuthenticated ? (
                    // If authenticated
                    <li>
                      <button type="button" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  ) : (
                    // If not authenticated
                    <>
                      <li>
                        <Link to="/login">
                          <button type="button">Login</button>
                        </Link>
                      </li>
                      <li>
                        <Link to="/signup">
                          <button type="button">Signup</button>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        );
      }
      return (
        <div className="vertical-line">
          <div className="nav-container">
            <div className="logo">
              <span className="logo-text">
                Health
                <span>Clinic</span>
              </span>
            </div>

            <div>
              <ul>
                {isAuthenticated ? (
                  // If authenticated
                  <>
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
                          Doctors
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/reservation">
                        <button type="button" className="btn btn-success">
                          Appointments
                        </button>
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  // If not authenticated
                  <>
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
                          Doctors
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/login">
                        <button type="button" className="btn btn-success">
                          Login
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/signup">
                        <button type="button" className="btn btn-success">
                          Signup
                        </button>
                      </Link>
                    </li>
                  </>
                )}
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
}

export default Navbar;
