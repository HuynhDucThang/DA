"use client";

import styles from "./singleUser.module.css";
import { useState, ChangeEvent, useRef } from "react";
import { updateAvatarUserAction } from "@/utils/actions";
import { URL as URL_API } from "@/utils/api";
import { IUser } from "@/utils/interface";
import Image from "next/image";
import Modal from "@/components/common/modal/Modal";
import useModal from "@/utils/hook/useModal";
import { BtnCommon } from "@/components/common";

interface IProps {
  user: IUser;
}

export default function UpdateAvatar({ user }: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, closePopup, openPopup } = useModal();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

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
    const formData = new FormData();
    selectedFile && formData.append("avatar", selectedFile);
    setIsLoading(true);
    const res = await updateAvatarUserAction(user.id, formData);
    setIsLoading(false);

    console.log("res : ", res);
  };

  return (
    <>
      <div className={styles.infoContainer}>
        <label htmlFor="upload_img" className={`${styles.imgContainer} block`}>
          <Image
            src={`${URL_API}/${user.avatar}` || "/avatar.png"}
            alt="avatar"
            fill
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
