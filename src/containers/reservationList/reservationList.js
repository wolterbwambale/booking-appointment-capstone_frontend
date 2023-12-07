// src/containers/ReservationList/ReservationList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReservationList({ isAdmin }) {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const url = isAdmin ? '/api/v1/admin/reservations' : '/api/v1/reservations';
      const response = await axios.get(url);
      setReservations(response.data.reservations);
    };

    fetchReservations();
  }, [isAdmin]);

  return (
    <div>
      <h2>{isAdmin ? 'Admin Reservations List' : 'Your Reservations List'}</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            {/* Display reservation details */}
            {reservation.date}
            {' '}
            -
            {reservation.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReservationList;
