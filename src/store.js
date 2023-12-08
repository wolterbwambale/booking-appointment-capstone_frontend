import { configureStore } from '@reduxjs/toolkit';
import doctorsReducer from './features/featureSlice/featureSlice';
import userReducer from './features/user/userSlice';
import reservationsReducer from './features/reservationSlice/reservationSlice';

const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    user: userReducer,
    reservations: reservationsReducer,
  },
});
export default store;
