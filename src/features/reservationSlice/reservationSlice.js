// src/features/reservationsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authorizedRequest from '../../api';

export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async (_, { getState }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const { token } = getState().user;
      const reservations = await authorizedRequest('http://127.0.0.1:4000/api/v1/reservations', 'GET', { Authorization: `Bearer ${token}` });
      return reservations;
    } catch (error) {
      throw error;
    }
  },
);

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectReservations = (state) => state.reservations.list;

export default reservationsSlice.reducer;
