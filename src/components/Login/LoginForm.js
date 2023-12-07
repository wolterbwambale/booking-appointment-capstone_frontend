import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/user/userSlice';
import '../Signup/form.css'; // Importing the shared CSS file for styling

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);
  const errorMessage = useSelector((state) => state.user.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
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
};

export default LoginForm;
