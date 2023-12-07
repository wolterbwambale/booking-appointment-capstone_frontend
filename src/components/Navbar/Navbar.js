import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import './Navbar.css';
import Footer from '../Footer/Footer';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to the home page after logout
  };

  return (
    <div className="vertical-line">
      <div className="nav-container">
        <div className="logo">
          <span className="logo-text">Health Center</span>
        </div>

        <div>
          <ul>
            {user ? (
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
                  <Link to="/feature">
                    <button type="button" className="btn btn-success">
                      Feature
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

export default Navbar;
