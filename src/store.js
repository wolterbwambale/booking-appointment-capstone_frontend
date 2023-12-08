import { configureStore } from '@reduxjs/toolkit';
import doctorsReducer from './featureSlice/featureSlice';
import userReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    user: userReducer,
  },
});
export default store;
