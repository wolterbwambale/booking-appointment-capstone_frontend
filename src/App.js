import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Feature,
  Footer,
  Home,
  Navbar,
  Login,
  Addform,
  Reservation,
} from './components/index';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/feature" element={<Feature />} />
      <Route path="/addform" element={<Addform />} />
      <Route path="/reservation" element={<Reservation />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
