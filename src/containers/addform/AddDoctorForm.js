import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { createDoctor } from '../doctorSlice';
import { fetchDoctorById } from '../../features/featureSlice/featureSlice';
import './Addform.css';

function AddDoctorForm() {
  const imagesRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [doctorData, setDoctorData] = useState({
    name: '',
    specialization: '',
    years_of_experience: '',
    price_per_appointment: undefined,
    images: null,
  });

  const handleInputChange = (name, value) => {
    setDoctorData({ ...doctorData, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFiles = e.target.files;
    setDoctorData({ ...doctorData, images: Array.from(imageFiles) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createDoctor(doctorData))
      .then(() => {
        // After successful submission, fetch the updated doctor list
        dispatch(fetchDoctorById());
        // Navigate to the dashboard
        navigate('/dashboard');
      })
      .catch((error) => {
        throw new Error('Error adding doctor:', error.message);
      });
  };

  return (
    <div className="container">
      <h2 className="header">Doctor&apos;s Details</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-25">
            Name:
          </div>
          <div className="col-75">
            <input
              id="name"
              type="text"
              name="name"
              className="form-input"
              value={doctorData.name}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            Specialization:
          </div>
          <div className="col-75">
            <input
              id="specialization"
              type="text"
              name="specialization"
              className="form-input"
              value={doctorData.specialization}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            Years of experience:
          </div>
          <div className="col-75">
            <input
              id="years_of_experience"
              type="text"
              name="years_of_experience"
              className="form-input"
              value={doctorData.years_of_experience}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            Price per appointment:
          </div>
          <div className="col-75">
            <input
              id="price_per_appointment"
              type="number"
              name="price_per_appointment"
              className="form-input"
              value={doctorData.price_per_appointment}
              onChange={(e) => {
                const { name, value } = e.target;
                return handleInputChange(
                  name,
                  Number(value) === 0 ? undefined : Number(value),
                );
              }}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            Image:
          </div>
          <div className="col-75">
            <input id="image" type="file" name="doctor[images][]" multiple accept="image/*" className="form-input" ref={imagesRef} onChange={handleImageChange} />
          </div>
        </div>
        <div className="row">
          <button className="btnDoctor" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddDoctorForm;
