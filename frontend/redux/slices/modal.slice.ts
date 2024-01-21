import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Modal } from "~/interface/support.interface";

const initialState: Modal = {
  isUsed: false,
  title: "",
  type: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isUsed = !state.isUsed;
    },
    setModal: (state, action: PayloadAction<Modal>) => {
      const { isUsed, title, type, data } = action.payload;

      state.isUsed = isUsed;
      state.title = title;
      state.type = type;
      state.data = data;
    },
    updateData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { toggle, setModal, updateData } = modalSlice.actions;
export default modalSlice.reducer;
