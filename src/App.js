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
  ReservationList,
  ReservationForm,
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
          <Route path="/reservation" element={<ReservationList />} />
          <Route path="/reservation/form" element={<ReservationForm />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
