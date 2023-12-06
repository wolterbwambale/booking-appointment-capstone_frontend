import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDoctors = createAsyncThunk('doctors/fetch', async () => {
  const doctors = await fetch('http://localhost:3000/api/v1/doctors');
  const data = await doctors.json();
  return data;
});

const initialState = {
  doctors: '',
  error: '',
  loading: false,
};

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        const newState = { ...state, loading: true };
        return newState;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        const newState = { ...state, doctors: action.payload, loading: false };
        return newState;
      })
      .addCase(fetchDoctors.rejected, (state) => {
        const newState = {
          ...state,
          error: 'Error 404. Failed to fetch',
          loading: false,
        };
        return newState;
      });
  },
});

export default doctorSlice.reducer;
