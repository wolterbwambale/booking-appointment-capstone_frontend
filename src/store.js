import { configureStore } from '@reduxjs/toolkit';
import doctorsReducer from './features/featureSlice/featureSlice';
import addDoctorReducer from './containers/doctorSlice';
import userReducer from './features/user/userSlice';
import reservationReducer from './features/reservation/reservationSlice';

const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    addDoctor: addDoctorReducer,
    user: userReducer,
    reservations: reservationReducer,
  },
});
export default store;
