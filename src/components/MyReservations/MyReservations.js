// MyReservations.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyReservations, deleteReservation } from '../../features/reservation/reservationSlice';
import './MyReservations.css'; // Import your CSS file

function MyReservations() {
  const dispatch = useDispatch();
  const myReservations = useSelector((state) => state.reservations.myReservations);
  const isLoading = useSelector((state) => state.reservations.isLoading);

  useEffect(() => {
    dispatch(fetchMyReservations());
  }, [dispatch]);

  const handleDelete = async (reservationId) => {
    await dispatch(deleteReservation(reservationId));
    // console.log(reservationId);
  };

  if (isLoading) {
    return <h4>Loading...</h4>;
  }

  return (
    <div className="component-container">
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
              <td>{reservation.doctor ? reservation.doctor.name : 'Unknown Doctor'}</td>
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
  );
}

export default MyReservations;
