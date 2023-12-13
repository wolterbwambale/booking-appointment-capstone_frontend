import { configureStore } from '@reduxjs/toolkit';
import doctorsReducer from './featureSlice/featureSlice';
import imageReducer from './featureSlice/imageSlice';
import addDoctorReducer from './containers/doctorSlice';
import userReducer from './features/user/userSlice';
import reservationReducer from './features/reservation/reservationSlice';

const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    addDoctor: addDoctorReducer,
    image: imageReducer,
    user: userReducer,
    reservations: reservationReducer,
  },
});
export default store;
