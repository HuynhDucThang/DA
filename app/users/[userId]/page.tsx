"use client";

import { Loading } from "@/components/common";
import InputProfile from "@/components/pages/user/inputProfile";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setModalType } from "@/redux/slices/modalSlice";
import { setUserMe } from "@/redux/slices/userSlice";
import { URL } from "@/utils/api";
import { showToast } from "@/utils/helpers/common";
import { IUser } from "@/utils/interface";
import {
  createRoomChat,
  getRoomUsers,
  getUserById,
  updatePassword,
  updateUser,
} from "@/utils/proxy";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent } from "react";

const initUserUpdate = {
  phonenumber: "",
  username: "",
  address: "",
  password: "",
  re_password: "",
};

export default function ProfileUser() {
  const [user, setUser] = useState<IUser>();
  const [fieldEdit, setFieldEdit] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [userUpdate, setUserUpdate] = useState(initUserUpdate);

  const dispatch = useAppDispatch();
  const { typeModal } = useAppSelector((state) => state.modal);
  const { currentUser } = useAppSelector((state) => state.user);

  const [indexSilder, setIndexSilder] = useState<number>(0);
  const length = 6;
  const params = useParams();
  const userId = params.userId as string;
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await getUserById(userId);
        setUser(data.data);
        console.log("data.data : ", data.data);
      } catch (error) {
        console.log("errror ");
        router.push("/");
      }
    };
    getUser();
  }, []);

  const handleSetFieldEdit = (fieldName: string | null) => {
    setFieldEdit(fieldName);
  };

  const handleSubmit = async () => {
    if (!currentUser?._id) {
      showToast("Bạn chưa đăng nhập", "error");
      dispatch(setModalType("LOGIN"));
      return;
    }

    setIsLoading(true);

    try {
      Object.keys(userUpdate).forEach((key) => {
        if (
          !userUpdate[key as keyof typeof userUpdate] ||
          key === "re_password"
        ) {
          delete userUpdate[key as keyof typeof userUpdate];
        }
      });
      const { data } = await updateUser(userId, userUpdate);
      setUser(data.data);
      data?.data?.id === currentUser?._id && dispatch(setUserMe(data.data));
      setFieldEdit(null);
      setUserUpdate(initUserUpdate);
      showToast("Thành công");
    } catch (error) {
      showToast("Lỗi");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentUser?._id) {
      showToast("Bạn chưa đăng nhập", "error");
      dispatch(setModalType("LOGIN"));
      return;
    }

    if (!currentUser.email) {
      return;
    }

    setIsLoading(true);

    try {
      await updatePassword(currentUser.email, userUpdate.password);
      setFieldEdit(null);
      setUserUpdate(initUserUpdate);
      showToast("Thành công");
    } catch (error) {
      showToast("Lỗi");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateAvatar = () => {
    dispatch(setModalType("UPDATE_AVATAR"));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserUpdate({
      ...userUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const allowEdit = currentUser._id === userId;

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="container_px max-w-[1500px]">
        <div className="flex gap-16">
          {/* left */}
          <div className="w-[30%] ">
            <div className="flex items-center gap-8 p-12 border shadow-xl rounded-3xl">
              <div className="flex flex-col items-center ">
                <div
                  className="w-[120px] h-[120px] relative hover:shadow-xl transition-shadow rounded-full cursor-pointer"
                  onClick={handleUpdateAvatar}
                >
                  <Image
                    src={
                      user?.avatar
                        ? `${URL}/${user?.avatar}`
                        : "/avatar_none_user.svg"
                    }
                    alt="avater"
                    fill
                    className="rounded-full"
                  />
                </div>
                <h2 className="text-primary text-4xl mt-4 font-semibold">
                  {user?.name}
                </h2>
                {/* <span className="text-lg font-medium">Khách</span> */}
              </div>

              <div>
                <div className="py-4">
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-sm font-semibold text-primary">
                    Đánh giá
                  </div>
                </div>
                <div className="border-t py-4">
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-sm font-semibold text-primary">
                    Năm hoạt động trên Airbnb
                  </div>
                </div>
              </div>
            </div>

            {/* bottom */}
            <div className="mt-10 p-8 border shadow-md rounded-3xl">
              <h2 className="heading__detail_apartment">
                Thông tin đã được xác nhận của {user?.name}
              </h2>
              <div className="mt-4">
                <div className="flex gap-4">
                  <Image
                    src="/tick_icon.svg"
                    alt="tick icon"
                    width={24}
                    height={24}
                  />
                  <span className="text_card_heading">Danh tính</span>
                </div>
                <div className="flex gap-4 mt-3">
                  <Image
                    src="/tick_icon.svg"
                    alt="tick icon"
                    width={24}
                    height={24}
                  />
                  <span className="text_card_heading">Số điện thoại</span>
                </div>
                <p className="mt-4 text_card_heading underline cursor-pointer">
                  Tìm hiểu về quy trình xác minh danh tính
                </p>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="w-[70%]">
            <div className="flex justify-between items-center">
              <h2 className="text-primary text-4xl mt-4 font-bold">
                Thông tin về {user?.name}
              </h2>

              {currentUser._id !== user?._id ? (
                <div className="text-white py-4 px-6 bg-[#222222] hover:bg-black hover:shadow-lg transition-all duration-500 rounded-xl w-fit text-xl font-medium cursor-pointer">
                  Nhắn tin
                </div>
              ) : null}
            </div>

            {/* userName */}
            <div className="my-3 py-4">
              <HeadingField
                title="Tên pháp lý"
                desc={
                  fieldEdit === "username"
                    ? "Đây là tên trên giấy tờ thông hành của bạn, có thể là giấy phép hoặc hộ chiếu."
                    : user?.name ?? "Tên người dùng"
                }
                btnName={fieldEdit === "username" ? "Xoá" : "Chỉnh sửa"}
                fieldName="username"
                handleClick={(fieldName) => {
                  if (fieldEdit === "username") {
                    handleSetFieldEdit(null);
                  } else {
                    handleSetFieldEdit(fieldName);
                  }
                }}
                isEdit={allowEdit}
              />
              {fieldEdit === "username" ? (
                <InputProfile
                  handleOnChange={handleInputChange}
                  name="username"
                  title="Họ và tên"
                  value={userUpdate.username}
                />
              ) : null}{" "}
              {fieldEdit === "username" ? (
                <BtnUpdate onClick={handleSubmit} />
              ) : null}
            </div>

            {/* phone */}
            <div className="my-3 py-4 border-t">
              <HeadingField
                title="Số điện thoại"
                desc={
                  fieldEdit === "phonenumber"
                    ? "Thêm số điện thoại để khách đã xác nhận và Airbnb có thể liên hệ với bạn. Bạn có thể thêm các số điện thoại khác và chọn mục đích sử dụng tương ứng."
                    : user?.phoneNumber ?? "Số điện thoại người dùng"
                }
                btnName={fieldEdit === "phonenumber" ? "Huỷ" : "Chỉnh sửa"}
                fieldName="phonenumber"
                handleClick={(fieldName) => {
                  if (fieldEdit === "phonenumber") {
                    handleSetFieldEdit(null);
                  } else {
                    handleSetFieldEdit(fieldName);
                  }
                }}
                isEdit={allowEdit}
              />
              {fieldEdit === "phonenumber" ? (
                <InputProfile
                  handleOnChange={handleInputChange}
                  name="phonenumber"
                  title="Số điện thoại"
                  value={userUpdate.phonenumber}
                />
              ) : null}
              {fieldEdit === "phonenumber" ? (
                <BtnUpdate onClick={handleSubmit} />
              ) : null}
            </div>

            {/* address */}
            <div className="my-3 py-4 border-t">
              <HeadingField
                title="Địa chỉ người dùng"
                desc={
                  fieldEdit === "address"
                    ? "Đây là tên trên giấy tờ thông hành của bạn, có thể là giấy phép hoặc hộ chiếu."
                    : user?.address ?? "Địa chỉ người dùng"
                }
                btnName={fieldEdit === "address" ? "Xoá" : "Chỉnh sửa"}
                fieldName="address"
                handleClick={(fieldName) => {
                  if (fieldEdit === "address") {
                    handleSetFieldEdit(null);
                  } else {
                    handleSetFieldEdit(fieldName);
                  }
                }}
                isEdit={allowEdit}
              />
              {fieldEdit === "address" ? (
                <InputProfile
                  handleOnChange={handleInputChange}
                  name="address"
                  title="Địa chỉ"
                  value={userUpdate.address}
                />
              ) : null}
              {fieldEdit === "address" ? (
                <BtnUpdate onClick={handleSubmit} />
              ) : null}
            </div>

            {/* password */}
            <div className="my-3 py-4 border-t">
              <HeadingField
                title="Mật khẩu"
                desc={
                  "Đây là mật khẩu để đăng nhập của bạn, không nên chia sẻ với bất kỳ ai."
                }
                btnName={fieldEdit === "password" ? "Xoá" : "Chỉnh sửa"}
                fieldName="password"
                handleClick={(fieldName) => {
                  if (fieldEdit === "password") {
                    handleSetFieldEdit(null);
                  } else {
                    handleSetFieldEdit(fieldName);
                  }
                }}
                isEdit={allowEdit}
              />
              {fieldEdit === "password" ? (
                <div className="flex gap-6">
                  <InputProfile
                    handleOnChange={handleInputChange}
                    name="password"
                    title="Mật khẩu"
                    value={userUpdate?.password}
                  />
                  <InputProfile
                    handleOnChange={handleInputChange}
                    name="re_password"
                    title="Nhập lại mật khẩu"
                    value={userUpdate?.re_password}
                  />
                </div>
              ) : null}
              {fieldEdit === "password" ? (
                <BtnUpdate onClick={handleUpdatePassword} />
              ) : null}
            </div>

            {/* rate */}
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-primary text-2xl mt-4 font-semibold py-pd-spacing-cpn">
                  Nhận xét của các Chủ nhà/Người tổ chức về Michelle
                </h4>
                <div className="flex gap-4">
                  <div
                    className="flex_center rounded-full border border-c-border cursor-pointer h-10 w-10"
                    onClick={() =>
                      setIndexSilder((pre) => (pre - 2 < 0 ? 0 : pre + 1))
                    }
                  >
                    <Image
                      src="/arrow/arrow_bottom.svg"
                      alt="arrow"
                      width={20}
                      height={20}
                      className="rotate-90"
                    />
                  </div>

                  <div
                    className="flex_center rounded-full border border-c-border cursor-pointer h-10 w-10"
                    onClick={() =>
                      setIndexSilder((pre) =>
                        pre + 2 > length / 2 ? 0 : pre + 1
                      )
                    }
                  >
                    <Image
                      src="/arrow/arrow_bottom.svg"
                      alt="arrow"
                      width={20}
                      height={20}
                      className="-rotate-90"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full overflow-x-hidden">
                <div
                  className="flex gap-2 transition-transform duration-500"
                  style={{
                    transform: `translateX(calc(-${indexSilder * 100}% - ${
                      indexSilder * 5
                    }px))`,
                  }}
                >
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex-[1_0_49.5%] flex flex-col h-full min-h-[224px] rounded-xl border border-c-border p-5"
                    >
                      <p className="line-clamp-5 text-lg">
                        {index}-- “Nick và con gái Michelle là những vị khách
                        xinh đẹp, rất vui được trò chuyện với một niềm vui để
                        đón tiếp khách và tôi chào đón họ trở lại bất cứ lúc
                        nào.
                      </p>

                      <div className="mt-auto">
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 relative">
                            <Image
                              src="/avatar.png"
                              alt=""
                              fill
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <h5 className="text-primary text-xl font-semibold">
                              Mandy
                            </h5>
                            <h6 className="text-primary text-lg font-light">
                              tháng 1 năm 2023
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface IHeadingField {
  btnName: string;
  title: string;
  desc: string;
  fieldName: string;
  isEdit: boolean;
  handleClick: (fieldName: string) => void;
}

function HeadingField({
  btnName,
  title,
  desc,
  fieldName,
  isEdit = true,
  handleClick,
}: IHeadingField) {
  return (
    <div className="flex justify-between">
      <div>
        <h4 className="text-lg font-medium">{title}</h4>
        <p className="text-lg text-second">{desc}</p>
      </div>

      {isEdit ? (
        <div
          className="text-lg font-semibold underline"
          onClick={() => handleClick(fieldName)}
        >
          {btnName}
        </div>
      ) : null}
    </div>
  );
}

interface IBtnUpdate {
  onClick: () => void;
}

function BtnUpdate({ onClick }: IBtnUpdate) {
  return (
    <div
      className="text-white mt-6 py-4 px-6 bg-[#222222] hover:bg-black hover:shadow-lg transition-all duration-500 rounded-xl w-fit text-xl font-medium cursor-pointer"
      onClick={onClick}
    >
      Lưu
    </div>
  );
}
