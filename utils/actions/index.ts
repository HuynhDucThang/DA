"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { userLogin } from "../proxy";
import { revalidatePath } from "next/cache";

export const loginAdmin = async (prevState: any, formData: FormData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    const { data } = await userLogin(email, password);
    const hartTime = 30 * 60 * 1000;
    const twoDay = 2 * 24 * 60 * 60 * 1000;

    cookies().set("access_token_admin", data?.data?.access_token, {
      expires: Date.now() + hartTime,
    });
    cookies().set("refresh_token_admin", data?.data?.refresh_token, {
      expires: Date.now() + twoDay,
    });

    return "Success";
  } catch (err: any) {
    return err?.response?.data?.detail ?? "Đăng nhập thất bại!";
  }
};
