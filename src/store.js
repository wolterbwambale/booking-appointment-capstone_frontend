import { configureStore } from '@reduxjs/toolkit';
import doctorsReducer from './featureSlice/featureSlice';

const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
  },
});
export default store;
