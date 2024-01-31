"use client";

import { useSelector } from "react-redux";
import HeaderDefault from "~/components/layouts/header/Header";
import LoginPage from "~/components/layouts/login/LoginPage";
import { useAuthentication } from "~/hooks/use-authentication";
import { usePush } from "~/hooks/use-push";
import { RootState } from "~/redux/store";

const Template = ({ children }: { children: React.ReactNode }) => {
  const auth = useSelector((state: RootState) => state.auth);
  usePush();
  useAuthentication();

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
