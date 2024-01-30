import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AlarmUser } from "~/interface/interface";

const initialState: AlarmUser = {
  unseen_message_count: 0,
  unseen_notification_count: 0,
};

export const alarmSlice = createSlice({
  name: "alarm",
  initialState,
  reducers: {
    setAlarm: (state, action: PayloadAction<AlarmUser>) => {
      state.unseen_notification_count =
        action.payload.unseen_notification_count ?? 0;
      state.unseen_message_count = action.payload.unseen_message_count ?? 0;
    },
  },
});

export const { setAlarm } = alarmSlice.actions;
export default alarmSlice.reducer;
