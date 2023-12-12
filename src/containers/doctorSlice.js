import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createDoctorFormData from './addform/formUtils';

const initialState = {
  error: null,
  status: 'idle',
  loading: false,
};

export const createDoctor = createAsyncThunk('doctorForm/create', async (doctorData, callback) => {
  const userId = JSON.parse(sessionStorage.getItem('logged_user')).id;

  if (!userId) {
    throw new Error('User is not logged in.');
  }

  const formData = createDoctorFormData(doctorData, userId);
  const response = await axios.post('http://localhost:4000/api/v1/doctors', formData);

  if (response.status !== 200) {
    throw new Error('Error adding doctor');
  }

  
  },
});

export default addDoctorSlice.reducer;
