import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './DoctorInfo.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDoctorById, selectDoctors } from '../../../features/featureSlice/featureSlice';

function DoctorInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const doctors = useSelector(selectDoctors);

  useEffect(() => {
    dispatch(fetchDoctorById(id));
  }, [dispatch, id]);

  const doctor = doctors.find((doc) => doc.id === parseInt(id, 10));

  if (doctors.length === 0) {
    return <div id="feature-container">Loading...</div>;
  }

  if (!doctor) {
    return <div id="feature-container">Doctor not found</div>;
  }

  if (doctors.error) {
    return (
      <div>
        Error:
        {doctors.error}
      </div>
    );
  }

  const handleMakeAppointment = () => {
    // Navigate to ReservationForm and pass the doctor's name as a parameter
    navigate(`/reservation-form/${doctor.name}`, { state: { doctorId: doctor.id } });
  };

  return (
    <div className="individual-doc-layout">
      <div className="main">
        <div className="doc-info">
          <div className="picture">
            <img
              src={doctor.image_urls}
              key={doctor.id}
              className="doc-img"
              alt={`Dr. ${doctor.name}`}
            />
          </div>
          <div className="details">
            <div className="name">
              {doctor.name}
              {' '}
              <br />
              {/* Star icons */}
            </div>
            <div className="speci">{doctor.specialization}</div>
            <div className="exp">{`Experience: ${doctor.years_of_experience} years`}</div>
            <p className="doc-descrip">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className="price">{`Price per appointment: $${doctor.price_per_appointment}`}</div>
            <button
              type="button"
              className="make-booking"
              onClick={handleMakeAppointment}
            >
              Make an Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

DoctorInfo.propTypes = {
  doctorId: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default DoctorInfo;
