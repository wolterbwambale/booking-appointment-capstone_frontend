// // src/containers/ReservationList/ReservationList.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import PropTypes from 'prop-types';

// function ReservationList() {
//   // In the line below I removed admin prop since we don't have a session for tracking user yet!

//   // function ReservationList({ isAdmin }) {
//   const [reservations, setReservations] = useState([]);

//   useEffect(() => {
//     const fetchReservations = async () => {
//       // code below is for differentiating between admin and normal user
//       // const url = isAdmin ? '/api/v1/admin/reservations' : '/api/v1/reservations';
//       const url = 'http://127.0.0.1:4000/api/v1/reservations';

//       const response = await axios.get(url);
//       setReservations(response.data.reservations);
//     };

//     fetchReservations();
//   // }, [isAdmin]);
//   }, []);

//   return (
//     <div>
//       {/* Removed reservation for admin previlege */}
//       {/* <h2>{isAdmin ? 'Admin Reservations List' : 'Your Reservations List'}</h2> */}
//       <h2>Your Reservations List</h2>

//       <ul>
//         {reservations.map((reservation) => (
//           <li key={reservation.id}>
//             {/* Display reservation details */}
//             {reservation.date}
//             {' '}
//             -
//             {reservation.time}
//             -
//             {' '}
//             {reservation.description}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// // Add PropTypes to specify the expected type for isAdmin
// // ReservationList.propTypes = {
// //   isAdmin: PropTypes.bool.isRequired,
// // };

// export default ReservationList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reservationList.css';

function ReservationList() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const url = 'http://127.0.0.1:4000/api/v1/reservations';
      const response = await axios.get(url);
      setReservations(response.data.reservations);
    };

    fetchReservations();
  }, []);

  return (
    <div className="reservation-list">
      <h2>Your Reservations List</h2>

      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            {reservation.date}
            {' '}
            -
            {' '}
            {reservation.time}
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
