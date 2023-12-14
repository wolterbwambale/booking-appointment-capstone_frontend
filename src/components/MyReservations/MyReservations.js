// MyReservations.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMyReservations,
  deleteReservation,
} from '../../features/reservation/reservationSlice';
import './MyReservations.css';

function MyReservations() {
  const dispatch = useDispatch();
  const myReservations = useSelector((state) => state.reservations.myReservations);
  const isLoading = useSelector((state) => state.reservations.isLoading);

  useEffect(() => {
    dispatch(fetchMyReservations());
  }, [dispatch]);

  const handleDelete = (reservationId) => {
    dispatch(deleteReservation(reservationId));
  };

  if (isLoading) {
    return <h4>Loading...</h4>;
  }

  return (
    <div className="component-container">
      <div className="my_reservation">
        <h2>My Reservations</h2>
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Doctor Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myReservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.date}</td>
                <td>
                  {reservation.doctor
                    ? reservation.doctor.name
                    : 'Unknown Doctor'}
                </td>
                <td>{reservation.description}</td>
                <td>
                  <button
                    className="delete-btn"
                    type="button"
                    onClick={() => handleDelete(reservation.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyReservations;
