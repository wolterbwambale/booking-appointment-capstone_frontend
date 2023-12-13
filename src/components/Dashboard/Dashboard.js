// Dashboard.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchAllReservations } from '../../features/reservation/reservationSlice';
import {
  fetchDoctorById,
  deleteDoctorById,
  updateDoctor,
  selectDoctors,
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

  const handleDelete = (doctorId) => {
    dispatch(deleteDoctorById(doctorId));
  };

  const handleUpdate = (doctor) => {
    if (doctor && doctor.id) {
      dispatch(updateDoctor(doctor)); // Dispatch an update action for the selected doctor
    } else {
      console.error('Doctor ID is missing or invalid');
    }
  };

  if (!isAdmin) {
    // Redirect to login page for users who are not admins
    return <Navigate to="/" />;
  }

  return (
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
              {/* Add more reservation details as needed */}
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.date}</td>
                <td>{reservation.user.name}</td>
                <td>{reservation.doctor.name}</td>
                <td>{reservation.doctor.specialization}</td>
                <td>Delete</td>
                {/* Add more reservation details as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Manage Doctors</h2>
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
                    className="btn btn-secondary"
                    onClick={() => handleUpdate(doctor.id)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(doctor.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* Add other components or sections based on user roles */}
    </div>
  );
}

export default Dashboard;
