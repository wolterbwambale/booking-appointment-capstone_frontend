import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { fetchDoctorById, selectDoctor } from '../../featureSlice/featureSlice';
import './Feature.css';
import dr1 from '../../assets/dr1.jpg';

function Feature({ doctorId }) {
  const handleClick = () => {
    window.location.href = '/reservation';
  };
  const dispatch = useDispatch();
  const doctor = useSelector(selectDoctor);

  useEffect(() => {
    dispatch(fetchDoctorById(doctorId));
  }, [dispatch, doctorId]);

  if (!doctor) {
    return <div id="feature-container">Loading...</div>;
  }

  if (doctor.error) {
    return (
      <div>
        Error:
        {doctor.error}
      </div>
    );
  }

  return (
    <section className="section" id="feature-container">
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <img
              src={dr1}
              alt="image1"
              className="img-fluid"
              style={{ width: '100%' }}
            />
          </div>
          <div className="col-md-2 d-flex flex-column">
            <div className="align-self-start">
              {doctor && (
                <>
                  <h6 className="bg-light p-2">
                    Name:
                    {doctor.name}
                  </h6>
                  <p className="bg-white p-2">
                    Specialization:
                    {' '}
                    {doctor.specialization}
                  </p>
                  <p className="bg-light p-2">
                    Years of Experience:
                    {' '}
                    {doctor.years_of_experience}
                  </p>
                  <p className="bg-white p-2">
                    Cost for appointment:
                    {' '}
                    {doctor.price_per_appointment}
                  </p>
                </>
              )}
            </div>
            <div className="text-white mt-5">
              <button type="submit" className="link-btn" onClick={handleClick}>
                <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Feature.propTypes = {
  doctorId: PropTypes.number.isRequired,
};

export default Feature;
