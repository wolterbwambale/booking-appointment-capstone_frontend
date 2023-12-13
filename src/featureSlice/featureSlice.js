// doctorsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  doctors: [],
  isLoading: false,
  error: null,
};

export const fetchDoctorById = createAsyncThunk(
  'doctors/fetchDoctorById',
  async () => {
    try {
      const response = await axios.get('http://127.0.0.1:4000/api/v1/doctors/');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch doctors');
    }
  },
);

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {}, // Add your reducers here if needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const selectDoctors = (state) => state.doctors.doctors || [];

export default doctorsSlice.reducer;
