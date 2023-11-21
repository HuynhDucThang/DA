import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import bookingReducer from "./slices/booking";
import modalReducer from "./slices/modalSlice";
import userStoreReducer from "./slices/userStore";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  booking: bookingReducer,
  userStore: userStoreReducer,
  modal: modalReducer,
});

export default rootReducer;
