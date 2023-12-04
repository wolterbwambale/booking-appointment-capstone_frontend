import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Footer from '../Footer/Footer';

const Navbar = () => (
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

export default Navbar;
