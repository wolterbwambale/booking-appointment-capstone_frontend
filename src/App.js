import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import store from './store';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Feature from './components/Feature/Feature';
import LoginForm from './components/Login/LoginForm';
import SignupForm from './components/Signup/Signup';
import Reservation from './components/Reservation/Reservation';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer/Footer';
import DoctorInfo from './components/Feature/DoctorInfo/DoctorInfo';
import './app.css';

function App() {
  const doctorId = 1;
  return (
    <Provider store={store}>
      <Router>
        <div className="main-layout">
          <div className="vertical-line">
            <Navbar />
          </div>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/feature"
                element={<Feature doctorId={doctorId} />}
              />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/reservation" element={<Reservation />} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/doctor_info/:id" element={<DoctorInfo />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
