"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { BtnCommon, InputField } from "..";
import { userLoginPending } from "@/redux/slices/authSlice";
import { removeModalType } from "@/redux/slices/modalSlice";

export default function Login() {
  const { access_token, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  if (access_token) {
    dispatch(removeModalType());
  }

  const handleSubmit = async () => {
    dispatch(userLoginPending(user));
  };

  const handleOnChange = (value: string, name: string) => {
    setUser((pre) => ({ ...pre, [name]: value }));
  };

  return (
    <div>
      <form>
        <InputField
          name="email"
          title="Địa chỉ email"
          error=""
          placeholder="Nhập email của bạn"
          handleOnChange={handleOnChange}
        />
        <InputField
          name="password"
          title="Mật khẩu của bạn"
          error=""
          placeholder="Nhập mật khẩu của bạn"
          handleOnChange={handleOnChange}
        />
        <div className="mt-5">
          <BtnCommon title="Đăng nhập" handleClick={handleSubmit} />
        </div>
        <div className="text-center py-2 text-lg font-bold text-black">
          -- OR --
        </div>
      </form>
      {/* <SocialAuth /> */}
    </div>
  );
}
