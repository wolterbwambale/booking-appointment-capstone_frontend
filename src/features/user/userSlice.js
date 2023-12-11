// userSlice.js
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  status: 'idle', // 'idle', 'loading', 'failed'
  error: null,
  token: null,
};

export const setToken = createAction('user/setToken', (token) => ({
  payload: {
    token,
  },
}));

export const login = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('http://127.0.0.1:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        // Assuming the server responds with a token in the 'token' property of the response
        const { token } = data;
        localStorage.setItem('token', token); // Corrected line
        dispatch(setToken(token)); // Add this line

        // Store the token in the Redux state
        return data;
      }

      // Here we're assuming that the server responds with the error messages in 'data.errors'
      return rejectWithValue(data.message || 'An unknown error occurred');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const signup = createAsyncThunk(
  'user/signup',
  async (
    {
      name, email, password, passwordConfirmation,
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch('http://127.0.0.1:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          user: {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', response.headers.get('Authorization')); // signup action
      }
      // Here we're assuming that the server responds with the error messages in 'data.errors'
      return rejectWithValue(data.message || 'An unknown error occurred');
    } catch (error) {
      return rejectWithValue(error.message || 'An unknown error occurred');
    }
  },
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      // Perform any backend operations if necessary, like invalidating a token
      // For simplicity, we're just clearing the local state
      dispatch(setToken(null)); // Clear the token
      return {}; // Return an empty object as the payload indicating a successful logout
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('Login successful. Response:', action.payload);
        const { token } = action.payload;
        console.log('Extracted token:', token);

        state.status = 'idle';
        state.user = action.payload;
        state.token = token;
      })
      .addCase(setToken, (state, action) => {
        console.log('Token is being set:', action.payload.token);
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'signed up';
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        // Clear the user state on logout
        state.status = 'idle';
        state.user = null; // Clear the user
        state.token = null; // Clear the token
      });
  },

});

export default userSlice.reducer;
