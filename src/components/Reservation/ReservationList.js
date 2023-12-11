import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchReservations, selectReservations } from '../../features/reservationSlice/reservationSlice';
import './reservationList.css';

function ReservationList() {
  const dispatch = useDispatch();
  const reservations = useSelector(selectReservations);
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch, token]);

  const handleDelete = async (reservationId) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/api/v1/reservations/${reservationId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      // After deleting, you may want to update the state or refetch reservations
      dispatch(fetchReservations());
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  return (
    <div className="reservation-list">
      <h2>Doctor Appointments</h2>

      {reservations.map((reservation) => (
        <div key={reservation.id} className="reservation-item">
          <div className="datetime">
            <p>
              Date:
              {' '}
              {reservation.date}
            </p>
            <p>
              Time:
              {' '}
              {reservation.time}
            </p>
          </div>
          <div className="description">
            <p>{reservation.description}</p>
          </div>
          <div className="actions">
            <button type="button" className="btn btn-primary cancel" onClick={() => handleDelete(reservation.id)}>Cancel Appointment</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReservationList;
