import { BtnCommon, InputField } from "..";

export default function Login() {
  return (
    <div>
      <form>
        <InputField
          name="email"
          title="Địa chỉ email"
          error=""
          placeholder="Nhập email của bạn"
        />
        <InputField
          name="password"
          title="Mật khẩu của bạn"
          error=""
          placeholder="Nhập mật khẩu của bạn"
        />
        <div className="mt-5">
          <BtnCommon title="Đăng nhập" />
        </div>
        <div className="text-center py-2 text-lg font-bold text-black">
          -- OR --
        </div>
      </form>
      "SocialAuth"
      {/* <SocialAuth /> */}
    </div>
  );
}
