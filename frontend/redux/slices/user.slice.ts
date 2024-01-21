import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Builder } from "builder-pattern";
import { User } from "~/interface/user.interface";

const initialState = {
  user: Builder<User>().build(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updatePostAudienceType: (
      state,
      action: PayloadAction<Pick<User, "post_audience_type">>,
    ) => {
      state.user.post_audience_type = action.payload.post_audience_type;
    },
  },
});

export const { setUser, updatePostAudienceType } = userSlice.actions;
export default userSlice.reducer;
