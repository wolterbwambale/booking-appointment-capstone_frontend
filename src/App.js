import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './store';
import {
  Feature,
  Footer,
  Home,
  Navbar,
  Login,
  Addform,
  Reservation,
} from './components/index';

function App() {
  const doctorId = 1;
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/feature" element={<Feature doctorId={doctorId} />} />
          <Route path="/addform" element={<Addform />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
