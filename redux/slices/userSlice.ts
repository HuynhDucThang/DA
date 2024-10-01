import { IUser } from "@/utils/interface";
import { createSlice } from "@reduxjs/toolkit";

const initUser: Partial<IUser> | null = {
  _id: "",
  email: "",
  role: "",
  name: "",
  avatar: "",
  password: "",
  phoneNumber: "",
  address: "",
};

const initialState = {
  currentUser: initUser,
  isLoading: false,
  error: null,
  adminUser: initUser,
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
    setUserAdmin: (state, action) => {
      state.adminUser = action.payload;
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
