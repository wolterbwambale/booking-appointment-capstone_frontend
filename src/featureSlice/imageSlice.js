/* eslint-disable no-param-reassign */
// doctorsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  images: [],
  isLoading: false,
  error: null,
};

export const fetchImage = createAsyncThunk(
  'images/fetchImage',
  async () => {
    try {
      const response = await axios.get('http://127.0.0.1:4000/api/v1/active_storage_blobs/');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch image');
    }
  },
);

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {}, // Add your reducers here if needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.images = action.payload;
      })
      .addCase(fetchImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const selectImage = (state) => state.images.images;

export default imageSlice.reducer;
