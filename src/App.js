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
import MyReservations from './components/MyReservations/MyReservations';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import DoctorInfo from './components/Feature/DoctorInfo/DoctorInfo';
import './app.css';

function App() {
  const doctorId = 1;
  return (
    <div className="main-layout">
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feature" element={<Feature doctorId={doctorId} />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/my-reservation" element={<MyReservations />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/doctor_info/:id" element={<DoctorInfo />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
