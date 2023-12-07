import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import './Navbar.css';
import Footer from '../Footer/Footer';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to the home page after logout
  };

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div className="vertical-line">
      {windowWidth <= 375 ? (
        <div className="nav-container">
          <span className="logo-text">HealthClinic</span>
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
                  <Link to="/reservation">
                    <button type="button" className="btn btn-success">
                      Reservation
                    </button>
                  </Link>
                </li>
                {user ? (
                  <li>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
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
          )}
        </div>
      ) : (
        <div className="nav-container">
          <span className="logo-text">HealthClinic</span>
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
                <Link to="/reservation">
                  <button type="button" className="btn btn-success">
                    Reservation
                  </button>
                </Link>
              </li>
              {user ? (
                <li>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
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
      )}
      <Footer />
    </div>
  );
};

export default Navbar;
