"use client";

import { loginAdmin } from "@/utils/actions";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import styles from "./loginForm.module.css";

const LoginForm = () => {
  const [state, formAction] = useFormState(loginAdmin, undefined);
  const router = useRouter();

  if (state === "Success") router.push("/admin/dashboard");

  return (
    <form action={formAction} className={styles.form}>
      <h1>Login</h1>
      <input type="email" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      <div className="text-lg text-red-700 font-medium"> {state && state}</div>
    </form>
  );
};

export default LoginForm;
