import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import postReducer from "./slices/post.slice";
import modalReducer from "./slices/modal.slice";
import userReducer from "./slices/user.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    modal: modalReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
