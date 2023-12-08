// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Home, Feature, Addform, ReservationList, ReservationForm, Login, Navbar,
} from './components';

function App() {
  const doctorId = 1;
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feature" element={<Feature doctorId={doctorId} />} />
        <Route path="/addform" element={<Addform />} />
        <Route path="/reservationform" element={<ReservationForm />} />
        <Route path="/reservationlist" element={<ReservationList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
