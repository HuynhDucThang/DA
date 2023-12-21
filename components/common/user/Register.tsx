"use client";

import { BtnCommon, InputField } from "..";
import { useState } from "react";
import { userSignUp } from "@/utils/proxy";
import { useAppDispatch } from "@/redux/hooks";
import { removeModalType, setModalType } from "@/redux/slices/modalSlice";
import { showToast } from "@/utils/helpers/common";

export default function Register() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    phonenumber: "",
    confirm_password: "",
  });

  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    try {
      const { confirm_password, email, password, username, phonenumber } = user;
      if (password !== confirm_password) {
        showToast("Xác nhận lại mật khẩu không chính xác", "error");
        return;
      }
      await userSignUp(email, password, username, phonenumber);
      showToast("Đăng ký thành công", "success");

      dispatch(removeModalType());
      dispatch(setModalType("LOGIN"));
    } catch (error: any) {
      showToast(`Đăng ký không thành công , ${error?.response?.data?.detail?.message}`, "error");
    }
  };

  const handleOnChange = (value: string, name: string) => {
    setUser((pre) => ({ ...pre, [name]: value }));
  };

  return (
    <div>
      <form>
        <InputField
          name="username"
          title="Tên của bạn"
          error=""
          placeholder="Nhập tên của bạn"
          handleOnChange={handleOnChange}
        />
        <InputField
          name="email"
          title="Địa chỉ Email"
          error=""
          type="email"
          placeholder="Nhập email của bạn"
          handleOnChange={handleOnChange}
        />
        <InputField
          name="phonenumber"
          title="Số điện thoại"
          error=""
          type="text"
          placeholder="Nhập số điện thoại của bạn"
          handleOnChange={handleOnChange}
        />
        <InputField
          name="password"
          title="Mật khẩu"
          error=""
          type="password"
          placeholder="Nhập mật khẩu của bạn"
          handleOnChange={handleOnChange}
        />
        <InputField
          name="confirm_password"
          title="Xác nhận lại mật khẩu"
          error=""
          type="password"
          placeholder="Nhập lại mật khẩu của bạn"
          handleOnChange={handleOnChange}
        />

        <div className="mt-5">
          <BtnCommon title="Đăng ký" handleClick={handleSubmit} />
        </div>
        <div className="text-center py-2 text-lg font-bold text-black">
          -- OR --
        </div>
      </form>
      {/* <SocialAuth /> */}
    </div>
  );
}
