import { createSlice } from "@reduxjs/toolkit";

export type TYPE_MODAL =
  | "LOGIN"
  | "SIGN_UP"
  | "HOUSE_ROLE"
  | "SAFETY_AND_ACCOMMONDATION"
  | "CANCEL_POLICY"
  | "UPDATE_AVATAR";

interface IInitstates {
  typeModal: TYPE_MODAL | null;
  isOpen: boolean;
}

const initialState: IInitstates = {
  typeModal: null,
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    setModalType: (
      state,
      action: {
        type: string;
        payload: TYPE_MODAL | null;
      }
    ) => {
      //
      state.typeModal = action.payload;
      state.isOpen = true;
    },
    removeModalType: (state) => {
      state.isOpen = initialState.isOpen;
      state.typeModal = initialState.typeModal;
    },
  },
});

export const { removeModalType, setModalType } = modalSlice.actions;
export default modalSlice.reducer;
