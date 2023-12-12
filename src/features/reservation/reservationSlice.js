// reservationSlice.js
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  reservations: [],
  myReservations: [],
  isLoading: false,
  error: null,
};

export const fetchAllReservations = createAsyncThunk(
  'reservations/fetchAllReservations',
  async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:4000/api/v1/reservations/getAll',
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch reservations');
    }
  },
);

export const fetchMyReservations = createAsyncThunk(
  'reservations/fetchMyReservations',
  async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('user')).id;

      const response = await axios.get(
        `http://127.0.0.1:4000/api/v1/reservations/?user_id=${userId}`,
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user reservations');
    }
  },
);

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {}, // Add your reducers here if needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllReservations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllReservations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reservations = action.payload.reservations;
      })
      .addCase(fetchAllReservations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMyReservations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyReservations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myReservations = action.payload.reservations;
      })
      .addCase(fetchMyReservations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// export const selectReservations = (state) => state.reservations.reservations;

export default reservationSlice.reducer;
