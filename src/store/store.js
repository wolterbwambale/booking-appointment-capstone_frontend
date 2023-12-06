import { configureStore } from '@reduxjs/toolkit';
import doctorReducer from './doctors/doctorSlice';

const store = configureStore({
  reducer: {
    doctors: doctorReducer,
  },
});

export default store;
