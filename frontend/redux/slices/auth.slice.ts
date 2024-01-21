import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { Auth } from "~/interface/auth.interface";

const initialState: Auth = {
  isAuthenticated: false,
  jwt: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Auth>) => {
      state.isAuthenticated = true;
      state.jwt = action.payload.jwt;
      state.user = action.payload.user;
      Cookies.set("access", action.payload.jwt);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      delete state.user;
      Cookies.remove("access");
    },
    setAuth: (state, action: PayloadAction<Auth>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    setAuthentication: (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    },
  },
});

export const { login, logout, setAuth, setAuthentication } = authSlice.actions;
export default authSlice.reducer;
