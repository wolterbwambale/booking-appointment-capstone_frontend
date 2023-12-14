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

export const deleteDoctorById = createAsyncThunk(
  'doctors/deleteDoctorById',
  async (doctorId) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/api/v1/doctors/${doctorId}`);
      return doctorId; // Return the deleted doctor's ID
    } catch (error) {
      throw new Error('Failed to delete doctor');
    }
  },
);

export const updateDoctor = createAsyncThunk(
  'doctors/updateDoctor',
  async (doctor) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:4000/api/v1/doctors/${doctor.id}`,
        doctor,
      );
      return response.data; // Return updated doctor data
    } catch (error) {
      throw new Error('Failed to update doctor');
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
      })
      .addCase(deleteDoctorById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteDoctorById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = state.doctors.filter(
          (doctor) => doctor.id !== action.payload,
        );
      })
      .addCase(deleteDoctorById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(updateDoctor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = state.doctors.map((doctor) => (
          doctor.id === action.payload.id ? action.payload : doctor));
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// export const selectDoctors = (state) => state.doctors.doctors || [];

// export default doctorsSlice.reducer;
export const selectDoctors = (state) => state.doctors.doctors || [];

export default doctorsSlice.reducer;
