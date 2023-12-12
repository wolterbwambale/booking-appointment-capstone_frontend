import { configureStore } from '@reduxjs/toolkit';
import doctorsReducer from './featureSlice/featureSlice';
import userReducer from './features/user/userSlice';
import reservationReducer from './features/reservation/reservationSlice';

const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    user: userReducer,
    reservations: reservationReducer,
  },
});
export default store;
