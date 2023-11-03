"use client"

import useModal from "@/utils/hook/useModal";
import Modal from "../modal/Modal";
import { Login, Register } from "..";

interface IProps {}

type MODAL_USER = "login" | "signUp";

export default function DropdownNoUser() {
  const { typePopup, isOpen, closePopup, openPopup } = useModal<MODAL_USER>();

  const renderPopupUser: Record<MODAL_USER, React.ReactElement> = {
    login: <Login />,
    signUp: <Register />,
  };

  return (
    <>
      <div>
        <div
          className="text-primary text-base p-3 font-medium hover:bg-slate-300"
          onClick={() => {
            openPopup("login");
          }}
        >
          Đăng nhập
        </div>
        <div
          className="text-primary text-base p-3 font-medium hover:bg-slate-300"
          onClick={() => {
            openPopup("signUp");
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

      <Modal
        isOpen={isOpen}
        handleCloseModal={closePopup}
        commonStyles="max-w-[700px]"
        title="Đăng nhập hoặc đăng ký."
      >
        <h2 className="text-2xl text-primary font-semibold">
          Chào mừng bạn đến với Airbnb
        </h2>
        {typePopup && renderPopupUser[typePopup]}
      </Modal>
    </>
  );
}
