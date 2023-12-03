import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Footer from "../Footer/Footer";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
      <div className="vertical-line">
      <div className="nav-container">
        <span className="left">Logo</span>
        <div className={`navbar ${isMobileMenuOpen ? "active" : ""}`}>
          <ul className={isMobileMenuOpen ? "active" : ""}>
            <li>
              <Link to="/">
                <button className="btn btn-success">Home</button>
              </Link>
            </li>
            <li>
              <Link to="/feature">
                <button className="btn btn-success">Feature</button>
              </Link>
            </li>
            <li>
              <Link to="/Addform">
                <button className="btn btn-success">AddItem</button>
              </Link>
            </li>
            <li>
              <Link to="/Reservation">
                <button className="btn btn-role btn-success">Reservation</button>
              </Link>
            </li>

          </ul>
          <div className="hamburger" onClick={toggleMobileMenu}>
            <div className={`line ${isMobileMenuOpen ? "open" : ""}`}></div>
            <div className={`line ${isMobileMenuOpen ? "open" : ""}`}></div>
            <div className={`line ${isMobileMenuOpen ? "open" : ""}`}></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Navbar;
