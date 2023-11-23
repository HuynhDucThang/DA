"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeModalType, setModalType } from "@/redux/slices/modalSlice";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadAvatar } from "@/utils/proxy";
import Modal from "@/components/common/modal/Modal";
import { BtnCommon } from "@/components/common";
import { setUserMe } from "@/redux/slices/userSlice";
import { showToast } from "@/utils/helpers/common";

export default function ModalUpdateAvatar() {
  const [avatar, setAvatar] = useState<any | null>(null);
  const [blob, setBlob] = useState<string | null>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { typeModal } = useAppSelector((state) => state.modal);
  const { currentUser } = useAppSelector((state) => state.user);
  const router = useRouter();

  const dispatch = useAppDispatch();

  // xử lý người dùng đăng nhập
  const handleUpdateAvatar = async () => {
    if (!currentUser) {
      showToast("Bạn hãy đăng nhập trước", "error");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("avatar", avatar);

      await uploadAvatar(currentUser.id, formData);
      showToast("Thành công", "success");

      //   router.refresh();
      dispatch(removeModalType());
    } catch (error) {
      console.log("error : ", error);
      showToast("Lỗi", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAvatar(e?.target?.files?.[0]);
    e?.target?.files?.[0] &&
      setBlob(URL.createObjectURL(e?.target?.files?.[0]));
  };

  const handleCancelModal = (action: "cancel" | "exit") => {
    if (action === "cancel") {
      blob && URL.revokeObjectURL(blob);
      setAvatar(null);
      setBlob(null);
    } else {
      dispatch(setModalType(null));
    }
  };

  return (
    <Modal
      isOpen={typeModal === "UPDATE_AVATAR" ? true : false}
      handleCloseModal={() => dispatch(removeModalType())}
      commonStyles="max-w-[500px]"
      title="Chỉnh sửa ảnh đại diện"
    >
      <div className="h-[40vh] flex flex-col items-center">
        {blob ? (
          <div className="w-[80%] h-[60%] relative shadow-lg">
            <Image
              src={blob}
              alt="avatar blob"
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <>
            <label
              htmlFor="avatar"
              className="bg-[#0000000d] shadow-lg cursor-pointer border border-dashed p-9 flex gap-4 items-center justify-center flex-col"
            >
              <Image
                src="/img-upload.png"
                width={60}
                height={60}
                alt="upload"
              />
              <p className="text-[#6c757d] font-medium text-lg">
                Chọn ảnh để cập nhật avatar
              </p>
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="hidden"
              onChange={handleImageChange}
            />
          </>
        )}

        <div className="w-full mt-auto text-right cursor-pointer flex gap-3 justify-end">
          <div
            className="p-3 w-[15%] text-center mt-4 font-semibold rounded-xl text-xl text-primary hover:text-white hover:bg-slate-400"
            onClick={() => handleCancelModal(avatar ? "cancel" : "exit")}
          >
            {avatar ? "Huỷ" : "Thoát"}
          </div>
          {avatar ? (
            <div className="w-[25%]">
              <BtnCommon
                title={isLoading ? "Đang xử lý" : "Cập nhật"}
                handleClick={handleUpdateAvatar}
                //   disabled={isLoading}
              />
            </div>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}
