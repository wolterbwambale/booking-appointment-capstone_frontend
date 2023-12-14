/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('user');
const storedIsAuthenticated = storedUser
  ? JSON.parse(storedUser).isAuthenticated
  : false;
const storedIsAdmin = storedUser ? JSON.parse(storedUser).admin : false;

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  status: 'idle',
  error: null,
  isAuthenticated: storedIsAuthenticated,
  isAdmin: storedIsAdmin,
};

export const login = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://127.0.0.1:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userData }),
      });

      const data = await response.json();
      if (response.ok) {
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
        return data;
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
  async (_, { rejectWithValue }) => {
    try {
      // Perform any backend operations if necessary, like invalidating a token
      // For simplicity, we're just clearing the local state
      return {}; // Return an empty object as the payload indicating a successful logout
      // eslint-disable-next-line no-unreachable
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
        state.status = 'idle';
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.isAdmin = action.payload.data.admin;
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...action.payload.data,
            isAuthenticated: true,
          }),
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
        state.isAdmin = false;
      });

    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.status = 'signed up';
        state.isAuthenticated = true;
        state.isAdmin = action.payload.data.admin;
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...action.payload.data,
            isAuthenticated: true,
          }),
        );
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
        state.isAdmin = false;
      });

    builder.addCase(logout.fulfilled, (state) => {
      // Clear the user state on logout
      state.user = null;
      state.status = 'idle';
      state.isAuthenticated = false;
      state.isAdmin = false;
      // Clear data from localStorage
      localStorage.removeItem('user');
    });
  },
});

export const selectUserId = (state) => state.user.user?.id || null;
export default userSlice.reducer;
