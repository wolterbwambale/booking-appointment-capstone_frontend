import { configureStore } from '@reduxjs/toolkit';
import doctorsReducer from './featureSlice/featureSlice';
import reservationsReducer from './reservationSlice/reservationsSlice';

const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    reservations: reservationsReducer,
  },
});
export default store;
