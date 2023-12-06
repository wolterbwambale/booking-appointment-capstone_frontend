// doctorsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  doctor: null,
  isLoading: false,
  error: null,
};

export const fetchDoctorById = createAsyncThunk(
  'doctors/fetchDoctorById',
  async (doctorId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:4000/api/v1/doctors/${doctorId}`);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to fetch doctor');
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
        state.doctor = action.payload;
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const selectDoctor = (state) => state.doctors.doctor;

export default doctorsSlice.reducer;
