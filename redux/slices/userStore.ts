import {  IUser } from "@/utils/interface";
import { IResponseApartment } from "@/utils/interface.v2";
import { createSlice } from "@reduxjs/toolkit";

interface IInitstates {
  whiteList: IResponseApartment[];
  receiverUser: IUser | null;
}

const initialState: IInitstates = {
  whiteList: [],
  receiverUser: null,
};

const userStoreSlice = createSlice({
  name: "userStore",
  initialState: initialState,
  reducers: {
    addReceiverUser: (
      state,
      action: { type: string; payload: IUser | null }
    ) => {
      state.receiverUser = action.payload;
    },
    removeReceiverUser: (state) => {
      state.receiverUser = null;
    },
    addToWhiteList: (
      state,
      action: {
        type: string;
        payload: IResponseApartment;
      }
    ) => {
      //
      state.whiteList = [action.payload, ...state.whiteList];
    },
    deleteWhiteListItem: (
      state,
      action: {
        type: string;
        payload: string;
      }
    ) => {
      const whiteListItemId = action.payload;
      state.whiteList = state.whiteList.filter(
        (list) => list._id !== whiteListItemId
      );
    },
  },
});

export const {
  deleteWhiteListItem,
  addToWhiteList,
  addReceiverUser,
  removeReceiverUser,
} = userStoreSlice.actions;
export default userStoreSlice.reducer;
