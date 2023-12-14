// Dashboard.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import {
  fetchAllReservations,
  deleteReservation as deleteReservationAction,
} from '../../features/reservation/reservationSlice';
import {
  fetchDoctorById,
  selectDoctors, deleteDoctorById,
} from '../../features/featureSlice/featureSlice';
import './Dashboard.css';

function Dashboard() {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.reservations);
  const doctors = useSelector(selectDoctors);
  const isAdmin = useSelector((state) => state.user.isAdmin);

  useEffect(() => {
    // Fetch reservations and doctors data when the component mounts
    dispatch(fetchAllReservations());
    dispatch(fetchDoctorById());
  }, [dispatch]);

  const handleDelete = (reservationId) => {
    // Dispatch the deleteReservation action with the reservationId
    dispatch(deleteReservationAction(reservationId));
  };

  const handleDeletedoctor = (doctorId) => {
    // Dispatch the deleteDoctorById action with the doctorId
    dispatch(deleteDoctorById(doctorId));
  };

  if (!isAdmin) {
    // Redirect to login page for users who are not admins
    return <Navigate to="/" />;
  }

  return (
    <div className="dashboard-overlay">
      <div className="dashboard">
        <h1>Welcome to the Dashboard</h1>

        <section>
          <h2>Manage Reservations</h2>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Client Name</th>
                <th>Doctor Name</th>
                <th>Specialization</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.date}</td>
                  <td>{reservation.user.name}</td>
                  <td>{reservation.doctor.name}</td>
                  <td>{reservation.doctor.specialization}</td>
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
        </section>

        <section>
          <h2>Manage Doctors</h2>
          <ul>
            <li>
              <Link to="/AddDoctorForm">
                <button type="button" className="btn btn-primary">
                  Add Doctor
                </button>
              </Link>
            </li>
          </ul>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialization</th>
                <th>Year of Experience</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.years_of_experience}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDeletedoctor(doctor.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
