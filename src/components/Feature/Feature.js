import React from "react";
import { useState } from 'react';
import "./Feature.css";
import dr1 from "../../assets/dr1.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const Feature = () => {
  const [isReserved, setIsReserved] = useState(false);

  const handleClick = () => {
    setIsReserved(!isReserved);
  };
  return (
    <section className="section" id="feature-container">
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <img
              src={dr1}
              alt="image1"
              className="img-fluid"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-2 d-flex flex-column">
            <div className="align-self-start">
            <span className="p-4 fs-4" id='left'>LOGO</span>
              <h6 className="bg-white p-2">Hello World</h6>
              <p className="bg-light p-2">p.o.box 232 kampale</p>
              <p className="bg-white p-2">tel:07777777777777</p>
            </div>
            <div className="align-self-start">
              <h6 className="bg-white p-2">Hello World</h6>
              <p className="bg-light p-2">p.o.box 232 kampale</p>
              <p className="bg-white p-2">tel:07777777777777</p>
            </div>
            <div className="text-white mt-5">
              <Link
                to="Reservation"
                className="link-btn"
                onClick={handleClick}
              >
                <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                {isReserved ? "Reserved" : "Reserve"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
