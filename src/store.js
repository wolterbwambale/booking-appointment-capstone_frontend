import { configureStore } from '@reduxjs/toolkit';
import doctorsReducer from './featureSlice/featureSlice';
import addDoctorReducer from './containers/doctorSlice';
import userReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    addDoctor: addDoctorReducer,
    user: userReducer,
  },
});
export default store;
