// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const fetchImages = createAsyncThunk('images/fetchImages', async () => {
//   const response = await fetch('http://127.0.0.1:4000/api/v1/active_storage_blobs/');
//   const data = await response.json();
//   console.log('data', data);
//   return data;
// });

// const imageSlice = createSlice({
//   name: 'images',
//   initialState: {
//     images: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchImages.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchImages.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.images = action.payload;
//       })
//       .addCase(fetchImages.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export { fetchImages };

// export default imageSlice.reducer;
