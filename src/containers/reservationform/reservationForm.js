// src/containers/ReservationForm/ReservationForm.js
import React, { useState } from 'react';
import axios from 'axios';

function ReservationForm() {
  const [formData, setFormData] = useState({
    user_id: 1, // Set the user ID dynamically based on the logged-in user
    doctor_id: 1, // Set the doctor ID based on the selected doctor
    date: '',
    time: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/v1/reservations', formData);
      // Optionally, you can redirect or show a success message here
    } catch (error) {
      console.error('Error creating reservation:', error);
      // Handle error - show an error message or redirect to an error page
    }
  };
  return (
    <div>
      <h2>Reservation Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Wrapping input in label */}
        {/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */}
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Time:
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
        </label>

        <button type="submit">Submit Reservation</button>
      </form>
    </div>
  );
}

export default ReservationForm;
