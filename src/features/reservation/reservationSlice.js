// reservationSlice.js
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  reservations: [],
  myReservations: [],
  isLoading: false,
  error: null,
};

export const createReservation = createAsyncThunk(
  'reservations/createReservation',
  async (reservationData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:4000/api/v1/reservations', {
        reservation: reservationData,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchAllReservations = createAsyncThunk(
  'reservations/fetchAllReservations',
  async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:4000/api/v1/reservations/all',
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

export const deleteReservation = createAsyncThunk(
  'reservations/deleteReservation',
  async (reservationId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:4000/api/v1/reservations/${reservationId}`,
      );
      return reservationId;
    } catch (error) {
      throw new Error('Failed to delete reservation');
    }
  },
);

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
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
      })

      .addCase(deleteReservation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedReservationId = action.payload;
        state.myReservations = state.myReservations.filter(
          (reservation) => reservation.id !== deletedReservationId,
        );
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createReservation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add the newly created reservation to the state
        state.myReservations = [...state.myReservations, action.payload];
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// ... (existing code)

export default reservationSlice.reducer;
