// src/containers/ReservationForm/ReservationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './reservation.css';

function ReservationForm() {
  const [formData, setFormData] = useState({
    // user_id: 1, // Set the user ID dynamically based on the logged-in user
    // doctor_id: 1, // Set the doctor ID based on the selected doctor
    user_id: 4,
    doctor_id: 3,
    date: '',
    time: '',
    description: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://127.0.0.1:4000/api/v1/reservations', formData);
    // Reset the form data to clear the fields
    setFormData({
      user_id: 4,
      doctor_id: 3,
      date: '',
      time: '',
      description: '',
    });
  };

  return (
    <div className="reservation-form">
      <h2 className="form-title">Reservation Form</h2>
      <form onSubmit={handleSubmit} className="form-bit">
        <div className="form-group">
          {/* Wrapping input in label */}
          {/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */}
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Submit Reservation
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;
