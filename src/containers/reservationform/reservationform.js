/* eslint-disable jsx-a11y/label-has-associated-control */
// ReservationForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { createReservation } from '../../features/reservation/reservationSlice';
import { selectUserId } from '../../features/user/userSlice';

import './reservationform.css';

const ReservationForm = () => {
  const dispatch = useDispatch();
  const { doctorName } = useParams();
  const location = useLocation();
  const doctorId = location.state ? location.state.doctorId : '';

  const state = useSelector((state) => state);
  const userId = selectUserId(state);

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    doctorName,
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReservation({ ...formData, doctorId, userId }));
    setFormData({
      date: '',
      time: '',
      doctorName: '',
      description: '',
    });
  };

  return (
    <div className="Reservationform">
      <h2>Book An Appointment</h2>
      <form className="forma" onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>Time:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <label>Doctor Name:</label>
        <input
          type="text"
          name="doctorName"
          value={formData.doctorName}
          onChange={handleChange}
          readOnly
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Reservation</button>
      </form>
    </div>
  );
};

export default ReservationForm;
