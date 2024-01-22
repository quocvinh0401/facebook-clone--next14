import { Builder } from "builder-pattern";
import Image from "next/image";
import { KeyboardEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { usePost } from "~/hooks/use-api";
import { Auth } from "~/interface/auth.interface";
import { User } from "~/interface/user.interface";
import { login } from "~/redux/slices/auth.slice";
import { RootState } from "~/redux/store";
import RegisterForm from "./RegisterForm";

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({ login: "", password: "" });
  const [openRegisterForm, setOpenRegisterForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const postAuth = usePost("auth", {
    alert: { success: "Login success", isUsed: true },
  });

  const handleLogin = async () => {
    if (!loginForm.login || !loginForm.password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const [jwt, user] = (await postAuth("sign-in", loginForm)) as [
        string,
        User,
      ];
      dispatch(login(Builder<Auth>().jwt(jwt).user(user).build()));
    } catch (error) {}
  };

  const submitLogin = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code == "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 px-10 md:flex-row lg:justify-center">
      <div>
        <h1 className="mb-3 text-center text-6xl font-semibold text-secondary md:text-start">
          Social
        </h1>
        <h2 className="w-[25rem] text-2xl lg:w-[31.25rem] lg:text-[28px]">
          Social helps you connect and share with the people in your life.
        </h2>
      </div>

      <div className="container flex w-[25rem] flex-col space-y-4 p-4 shadow-xl">
        <input
          type="text"
          className="rounded-lg border p-2 px-4 focus:border-secondary"
          placeholder="Email address or phone number"
          autoFocus
          onKeyDown={(e) => submitLogin(e)}
          onChange={(e) =>
            setLoginForm({ ...loginForm, login: e.target.value })
          }
        />
        <div className="relative flex items-center">
          <input
            type={`${showPassword ? "text" : "password"}`}
            className="w-full rounded-lg border p-2 pl-4 pr-10 focus:border-secondary"
            placeholder="Password"
            onKeyDown={(e) => submitLogin(e)}
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
          />
          {loginForm.password && (
            <Image
              className="absolute right-3 cursor-pointer"
              src={`${showPassword ? "/svgs/eye.svg" : "/svgs/eye-slash.svg"}`}
              alt="show"
              width={20}
              height={20}
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        <button
          className="rounded-lg bg-secondary py-2 text-xl font-semibold text-white"
          onClick={handleLogin}
        >
          Log in
        </button>
        <p className="cursor-pointer text-center text-sm text-secondary hover:underline">
          Forgotten password?
        </p>
        <hr className="pb-2" />
        <button
          onClick={() => setOpenRegisterForm(true)}
          className="mx-auto w-fit rounded-lg bg-neutral p-2 text-white"
        >
          Create new account
        </button>
      </div>
      {openRegisterForm && (
        <RegisterForm setOpenRegisterForm={setOpenRegisterForm} />
      )}
    </div>
  );
};
export default LoginPage;
