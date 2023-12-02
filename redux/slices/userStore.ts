import { IApartmentRead, IUser } from "@/utils/interface";
import { createSlice } from "@reduxjs/toolkit";
import { list } from "postcss";

interface IInitstates {
  whiteList: IApartmentRead[];
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
        payload: IApartmentRead;
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
        (list) => list.id !== whiteListItemId
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
