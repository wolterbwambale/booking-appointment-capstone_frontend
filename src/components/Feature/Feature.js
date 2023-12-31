import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {
  fetchDoctorById,
  selectDoctors,
} from '../../features/featureSlice/featureSlice';
import './Feature.css';

function Feature({ doctorId }) {
  const dispatch = useDispatch();
  const doctors = useSelector(selectDoctors);

  useEffect(() => {
    dispatch(fetchDoctorById(doctorId));
  }, [dispatch, doctorId]);

  if (!doctors.length) {
    return <div id="feature-container">Loading...</div>;
  }

  if (doctors.error) {
    return (
      <div>
        Error:
        {doctors.error}
      </div>
    );
  }

  return (
    <div className="doc-overlay">
      <section className="section" id="feature-container">
        <h1>Our Doctors</h1>
        <div className="main-div">
          <div className="doctors-component-div">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="individual-doc">
                <div className="doctor-info">
                  <img src={doctor.image_urls} alt={`Dr. ${doctor.name}`} />
                  <div className="name">{doctor.name}</div>
                  <div className="speci">{doctor.specialization}</div>
                  <div className="exp">{`Experience: ${doctor.years_of_experience}`}</div>
                  <Link to={`/doctor_info/${doctor.id}`}>
                    <button type="button" className="link-btn">
                      <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

Feature.propTypes = {
  doctorId: PropTypes.string.isRequired,
};

export default Feature;
