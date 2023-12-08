/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  status: 'idle', // 'idle', 'loading', 'failed'
  error: null,
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
        body: JSON.stringify(userData),
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
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'signed up';
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    builder.addCase(logout.fulfilled, (state) => {
      // Clear the user state on logout
      state.user = null;
      state.status = 'idle';
    });
  },
});

export default userSlice.reducer;