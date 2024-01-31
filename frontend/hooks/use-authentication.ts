import { useEffect } from "react";
import Cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setAuthentication } from "~/redux/slices/auth.slice";
import { RootState } from "~/redux/store";
import { User } from "~/interface/user.interface";
import { Builder } from "builder-pattern";
import { Auth } from "~/interface/auth.interface";
import { useGet } from "./use-api";
import { setUser } from "~/redux/slices/user.slice";

export const useAuthentication = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const getAuth = useGet("auth", { alert: { isUsed: false } });

  useEffect(() => {
    const token = Cookie.get("access");
    if (token) dispatch(setAuthentication(token));
    if (auth.jwt) {
      const getCurrentUser = async () => {
        try {
          const user = (await getAuth("current-user")) as User;
          dispatch(setAuth(Builder<Auth>().user(user).build()));
          dispatch(setUser(user));
        } catch (error) {}
      };
      getCurrentUser();
    }
  }, [auth.jwt]);
};
