import { IApartmentRead } from "@/utils/interface";
import { createSlice } from "@reduxjs/toolkit";
import { list } from "postcss";

interface IInitstates {
  whiteList: IApartmentRead[];
}

const initialState: IInitstates = {
  whiteList: [],
};

const userStoreSlice = createSlice({
  name: "userStore",
  initialState: initialState,
  reducers: {
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

export const { deleteWhiteListItem, addToWhiteList } = userStoreSlice.actions;
export default userStoreSlice.reducer;
