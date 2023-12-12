import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../features/user/userSlice';
import './form.css'; // Importing the shared CSS file for styling

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);
  const user = useSelector((state) => state.user.user);
  const errorMessage = useSelector((state) => state.user.error);

  useEffect(() => {
    // If the user is defined, signup was successful
    if (user) {
      const userInfo = {
        id: user.data.id,
        name: user.data.name,
      };
      sessionStorage.setItem('status', 'true');
      sessionStorage.setItem('logged_user', JSON.stringify(userInfo));
      navigate('/'); // Redirects to the home page
    }
  }, [user, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signup({
        name,
        email,
        password,
        passwordConfirmation,
      }),
    );
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          className="form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          className="form-input"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Confirm Password"
        />
        <button
          className="form-button"
          type="submit"
          disabled={userStatus === 'loading'}
        >
          Sign Up
        </button>
      </form>
      {userStatus === 'failed' && (
        <p className="form-error">
          Error:
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default SignupForm;
