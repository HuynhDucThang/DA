"use client";

import styles from "./singleUser.module.css";
import { useState, ChangeEvent, useRef } from "react";
import { IUser } from "@/utils/interface";
import Image from "next/image";
import Modal from "@/components/common/modal/Modal";
import useModal from "@/utils/hook/useModal";
import { BtnCommon } from "@/components/common";
import { showToast } from "@/utils/helpers/common";
import { uploadAvatar } from "@/utils/proxy";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUserMe } from "@/redux/slices/userSlice";

export default function UpdateAvatar() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, closePopup, openPopup } = useModal();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
      openPopup();

      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
    }
  };

  const handleUploadAvatar = async () => {
    if (!currentUser._id) return;
    const formData = new FormData();
    selectedFile && formData.append("avatar", selectedFile);
    try {
      setIsLoading(true);
      const { data } = await uploadAvatar(currentUser._id, formData);
      dispatch(setUserMe({ ...currentUser, avatar: data.payload }));
      setIsLoading(false);
    } catch (error) {
      showToast("Cannot update", "error");
    }
  };

  return (
    <>
      <div className={styles.infoContainer}>
        <label htmlFor="upload_img" className={`${styles.imgContainer} block`}>
          <Image
            src={currentUser?.avatar ?? "/avatar_none_user.svg"}
            alt="avatar"
            fill
            className="object-cover"
          />
        </label>

        <input
          ref={inputFileRef}
          type="file"
          id="upload_img"
          accept="png, jpg"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <Modal
        isOpen={isOpen && (selectedFile ? true : false)}
        handleCloseModal={closePopup}
        commonStyles="max-w-[700px]"
        title="Tải và chọn ảnh đại diện"
      >
        <div className="flex_center">
          <div className="relative w-[70%] aspect-[1/1] ">
            {selectedFile ? (
              <Image
                src={window.URL.createObjectURL(selectedFile)}
                alt="file."
                fill
                className="object-contain"
              />
            ) : null}
          </div>
        </div>
        <div className="border border-c-grey p-3 text-right">
          <BtnCommon
            title={isLoading ? `Đang xử lý ....` : "Lưu"}
            handleClick={() => {
              handleUploadAvatar();
              setSelectedFile(null);
            }}
          />
          <BtnCommon title="Huỷ" typeBtn="outline" handleClick={closePopup} />
        </div>
      </Modal>
    </>
  );
}
