// src/containers/ReservationList/ReservationList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations, selectReservations } from '../../reservationSlice/reservationsSlice';
import './reservationList.css';

function ReservationList() {
  const dispatch = useDispatch();
  const reservations = useSelector(selectReservations);

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  return (
    <div className="reservation-list">
      <h2>Your Doctor Appointmants</h2>

      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            {reservation.date}
            {' '}
            -
            {' '}
            {reservation.time}
            {' '}
            -
            {' '}
            {reservation.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReservationList;
