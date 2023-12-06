import React from 'react';
import './Feature.css';
import { Link } from 'react-router-dom';

const doctorsData = [
  {
    id: 5,
    name: 'Michael D. Valentine',
    specialization: 'Orthopedics',
    years_of_experience: 9,
    price_per_appointment: 300,
    img: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 4,
    name: 'Aurora Bruit',
    specialization: 'Obstetrics and Gynecology (OB/GYN)',
    years_of_experience: 4,
    price_per_appointment: 300,
    img: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 3,
    name: 'Gabriel Lloyd',
    specialization: 'Pediatrics',
    years_of_experience: 5,
    price_per_appointment: 180,
    img: 'https://images.pexels.com/photos/6627931/pexels-photo-6627931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

const Feature = () => (
  <>
    <h1>Our Doctors</h1>
    <div className="main-div">
      <div className="doctors-component-div">
        {doctorsData.map((doctor) => (
          <div key={doctor.id} className="individual-doc">
            <div className="doctor-info">
              <img src={doctor.img} alt={`Dr. ${doctor.name}`} />
              <div className="name">{doctor.name}</div>
              <div className="speci">{doctor.specialization}</div>
              <div className="exp">{`Experience: ${doctor.years_of_experience}`}</div>
              <Link to="/doctor_info">
                <button type="button" className="read-more">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default Feature;
