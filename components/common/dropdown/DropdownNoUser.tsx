"use client";

import useModal from "@/utils/hook/useModal";
import { Login, Register } from "..";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeModalType,
  setModalType,
  TYPE_MODAL,
} from "@/redux/slices/modalSlice";
import Modal from "../modal/Modal";

interface IProps {}

export default function DropdownNoUser() {
  const { isOpen, typeModal } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const renderPopupUser: Record<TYPE_MODAL, React.ReactElement | undefined> = {
    LOGIN: <Login />,
    SIGN_UP: <Register />,
    HOUSE_ROLE: undefined,
    SAFETY_AND_ACCOMMONDATION: undefined,
    CANCEL_POLICY: undefined,
    UPDATE_AVATAR: undefined,
    SEARCH: undefined,
    CONFIRM: undefined,
  };

  return (
    <>
      <div>
        <div
          className="text-primary text-base p-3 font-medium hover:bg-slate-300"
          onClick={() => {
            dispatch(setModalType("LOGIN"));
          }}
        >
          Đăng nhập
        </div>
        <div
          className="text-primary text-base p-3 font-medium hover:bg-slate-300"
          onClick={() => {
            dispatch(setModalType("SIGN_UP"));
          }}
        >
          Đăng ký
        </div>
      </div>
      <div className="border-t">
        <div className="text-primary text-base p-3 font-medium hover:bg-slate-300">
          Tìm hiểu về Air
        </div>
        <div className="text-primary text-base p-3 font-medium hover:bg-slate-300">
          Trung tâm trợ giúp
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        handleCloseModal={() => dispatch(removeModalType())}
        commonStyles="max-w-[500px]"
        title="Đăng nhập hoặc đăng ký."
      >
        <h2 className="text-2xl text-primary font-semibold">
          Chào mừng bạn đến với Airbnb
        </h2>
        {typeModal && renderPopupUser[typeModal]
          ? renderPopupUser[typeModal]
          : null}
      </Modal>
    </>
  );
}
