import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/user/userSlice';
import '../Signup/form.css'; // Importing the shared CSS file for styling

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user.status);
  const errorMessage = useSelector((state) => state.user.error);

  useEffect(() => {
    // If the user is defined, signup was successful
    if (user) {
      navigate('/'); // Redirects to the home page
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ name: username, password }));
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="form-button"
          type="submit"
          disabled={userStatus === 'loading'}
        >
          Login
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

export default LoginForm;
