import React from 'react';
import './DoctorInfo.css';

const doctorsData = [
  {
    id: 5,
    name: 'Michael D. Valentine',
    specialization: 'Orthopedics',
    years_of_experience: 9,
    price_per_appointment: 300,
    img: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

const DoctorInfo = () => {
  const doctor = doctorsData[0];

  return (
    <div className="main">
      <div className="doc-info">
        <div className="picture">
          <img
            className="doc-img"
            src={doctor.img}
            alt={`Dr. ${doctor.name}`}
          />
        </div>
        <div className="details">
          <div className="name">{doctor.name}</div>
          <div className="speci">{doctor.specialization}</div>
          <div className="exp">{`Experience: ${doctor.years_of_experience} years`}</div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <div className="price">{`Price per appointment: $${doctor.price_per_appointment}`}</div>
          <button type="button" className="make-booking">
            Make an Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfo;
