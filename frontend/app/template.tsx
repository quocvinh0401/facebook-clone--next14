"use client";

import { useEffect, useState } from "react";
import HeaderDefault from "~/components/layouts/Header";
import LoginPage from "~/components/layouts/login/LoginPage";
import { RootState } from "~/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";
import { useGet } from "~/hooks/use-api";
import { setAuthentication, setAuth } from "~/redux/slices/auth.slice";
import { Builder } from "builder-pattern";
import { Auth } from "~/interface/auth.interface";
import { User } from "~/interface/user.interface";
import { setUser } from "~/redux/slices/user.slice";

const Template = ({ children }: { children: React.ReactNode }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const getAuth = useGet("auth", { alert: { isUsed: false } });

  useEffect(() => {
    const token = Cookie.get("access");
    if (token) {
      const getCurrentUser = async () => {
        dispatch(setAuthentication(token));
        try {
          const user = (await getAuth("current-user")) as User;
          dispatch(setAuth(Builder<Auth>().user(user).jwt(token).build()));
          dispatch(setUser(user));
        } catch (error) {}
      };
      getCurrentUser();
    }
  }, [dispatch, auth.jwt]);

  return auth.isAuthenticated ? (
    <>
      <HeaderDefault />
      <div className="flex-1">{children}</div>
    </>
  ) : (
    <div className="flex min-h-screen w-full items-center justify-center">
      <LoginPage />
    </div>
  );
};
export default Template;
