"use client";

import { Login, Register } from "@/components/common";
import Modal from "@/components/common/modal/Modal";
import ModalAbs from "@/components/common/modal/ModalAbs";
import useModal from "@/utils/hook/useModal";
import Image from "next/image";

type MODAL_USER = "login" | "signUp";

export default function HeaderUserInfor() {
  const { isOpen, closePopup, openPopup } = useModal();
  const {
    typePopup,
    isOpen: isOpenUserModal,
    closePopup: closeModalUser,
    openPopup: openModalUser,
  } = useModal<MODAL_USER>();

  const renderPopupUser: Record<MODAL_USER, React.ReactElement> = {
    login: <Login />,
    signUp: <Register />,
  };

  return (
    <div className="relative py-2 px-3 border border-solid rounded-3xl transition-shadow hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_6px] cursor-pointer">
      <div
        className="flex gap-4"
        onClick={() => (isOpen ? closePopup() : openPopup())}
      >
        <Image
          src="/header/menu.svg"
          className="text-red-800"
          alt="menu"
          height={24}
          width={24}
        />
        <div className="h-10 w-10 relative">
          <Image
            src="/images/avatar.png"
            alt="menu"
            className="rounded-full object-contai"
            fill
          />
        </div>
      </div>

      <ModalAbs
        isOpen={isOpen}
        parentStyles="top-[105%] right-0"
        subParentStyles="w-[250px]"
      >
        <div>
          <div
            className="text-primary text-base p-3 font-medium hover:bg-slate-300"
            onClick={() => {
              openModalUser("login");
              closePopup();
            }}
          >
            Đăng nhập
          </div>
          <div
            className="text-primary text-base p-3 font-medium hover:bg-slate-300"
            onClick={() => {
              openModalUser("signUp");
              closePopup();
            }}
          >
            Đăng ký
          </div>
        </div>
        <div className="border-t">
          <div className="text-primary text-base p-3 font-medium hover:bg-slate-300">
            Cho thuê chỗ ở qua Airbnb
          </div>
          <div className="text-primary text-base p-3 font-medium hover:bg-slate-300">
            Trung tâm trợ giúp
          </div>
        </div>
      </ModalAbs>

      <Modal
        isOpen={isOpenUserModal}
        handleCloseModal={closeModalUser}
        commonStyles="max-w-[700px]"
        title="Đăng nhập hoặc đăng ký."
      > 
        <h2 className="text-2xl text-primary font-semibold">Chào mừng bạn đến với Airbnb</h2>
        {typePopup && renderPopupUser[typePopup]}
      </Modal>
    </div>
  );
}
