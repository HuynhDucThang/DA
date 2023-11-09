import { getCookie, removeCookie } from "@/utils/helpers/common";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    access_token: getCookie("access_token") || null,
    isLoading: false,
    error: null,
  },
  reducers: {
    userLoginPending: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    userLoginFulfill: (state, action) => {
      state.isLoading = false;
      state.access_token = action.payload;
    },
    userLoginReject: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    userLogout: (state) => {
      removeCookie("access_token");
      removeCookie("refresh_token");

      state.access_token = null;
      state.isLoading = false;
      state.error = null;
    },
    removeError: (state) => {
      state.error = null;
    },
    setToken: (state, action) => {
      state.access_token = action.payload;
    },
  },
});

export const {
  userLoginPending,
  userLoginFulfill,
  userLoginReject,
  userLogout,
  removeError,
  setToken,
} = authSlice.actions;
export default authSlice.reducer;
