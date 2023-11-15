import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import bookingReducer from "./slices/booking";
import modalReducer from "./slices/modalSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  booking: bookingReducer,
  modal: modalReducer,
});

export default rootReducer;
