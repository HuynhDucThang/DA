import { BtnCommon, InputField } from "..";

export default function Register() {
  return (
    <div>
      <form>
        <InputField
          name="name"
          title="Tên của bạn"
          error=""
          placeholder="Nhập tên của bạn"
        />
        <InputField
          name="email"
          title="Địa chỉ Email"
          error=""
          type="email"
          placeholder="Nhập email của bạn"
        />
        <InputField
          name="password"
          title="Mật khẩu"
          error=""
          type="password"
          placeholder="Nhập mật khẩu của bạn"
        />
        <InputField
          name="confirm-password"
          title="Xác nhận lại mật khẩu"
          error=""
          type="password"
          placeholder="Nhập lại mật khẩu của bạn"
        />

        <div className="mt-5">
          <BtnCommon title="Đăng ký" />
        </div>
        <div className="text-center py-2 text-lg font-bold text-black">
          -- OR --
        </div>
      </form>
      {/* <SocialAuth /> */}
    </div>
  );
}
