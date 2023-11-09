import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import bookingReducer from "./slices/booking";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  booking: bookingReducer,
});

export default rootReducer;
