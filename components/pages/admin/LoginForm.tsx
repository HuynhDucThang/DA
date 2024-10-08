"use client";

import { useRouter } from "next/navigation";
import styles from "./loginForm.module.css";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { userLoginPending } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { access_token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFetching(true);
    try {
      dispatch(userLoginPending({ email, password }));
    } catch (error) {
      toast.error("Đăng nhập thất bại");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (access_token) router.push("/admin/dashboard");
  }, [access_token]);

  return (
    <form onSubmit={handleLogin} className={styles.form}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={isFetching}>
        {isFetching ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
