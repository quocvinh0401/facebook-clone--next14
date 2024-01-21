import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {},
    deletePost: (state, action) => {},
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;
