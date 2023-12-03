"use client";

import { useAppSelector } from "@/redux/hooks";
import { Portal } from "./Portar";
import { TYPE_MODAL } from "@/redux/slices/modalSlice";
import ModalLogin from "./modalLogin";
import ModalSignUp from "./modalSignUp";
import ModalHouseRole from "./modalHouseRole";
import ModalUpdateAvatar from "./modalUpdateAvatar";
import ModalSearch from "./modalSearch";
import ModalConfirm from "./modalConfirm";

export default function ModalProvider() {
  const { typeModal } = useAppSelector((state) => state.modal);

  const modalComponents: Record<TYPE_MODAL, React.ReactNode> = {
    LOGIN: <ModalLogin />,
    SIGN_UP: <ModalSignUp />,
    CANCEL_POLICY: <ModalHouseRole />,
    HOUSE_ROLE: <ModalHouseRole />,
    SAFETY_AND_ACCOMMONDATION: <ModalHouseRole />,
    UPDATE_AVATAR: <ModalUpdateAvatar />,
    SEARCH: <ModalSearch />,
    CONFIRM: <ModalConfirm />,
  };

  return typeModal ? <Portal>{modalComponents[typeModal]}</Portal> : null;
}
