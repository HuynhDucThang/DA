import { IUser } from "@/utils/interface";
import { createSlice } from "@reduxjs/toolkit";

const initUser: IUser | null = {
  id: "",
  email: "",
  system_role: "",
  username: "",
  avatar: "",
  password: "",
  phonenumber: "",
  created_at: "",
  isVerify: false,
  address: "",
  updated_at: "",
  verification_code: "",
};

const initialState = {
  currentUser: initUser,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getCurrentUserPending: (state) => {
      state.isLoading = true;
    },
    getCurrentUserFulfill: (state, action) => {
      state.isLoading = false;
      state.currentUser = {
        ...action.payload,
      };
    },
    getCurrentUserReject: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.currentUser = initUser;
    },
    currentUserLogout: (state) => {
      state.currentUser = initUser;
    },
    setUserMe: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;

export const {
  getCurrentUserPending,
  getCurrentUserFulfill,
  getCurrentUserReject,
  currentUserLogout,
  setUserMe,
} = actions;

export default reducer;
