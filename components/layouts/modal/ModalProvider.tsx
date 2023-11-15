"use client";

import { useAppSelector } from "@/redux/hooks";
import { Portal } from "./Portar";
import { TYPE_MODAL } from "@/redux/slices/modalSlice";
import ModalLogin from "./modalLogin";
import ModalSignUp from "./modalSignUp";

export default function ModalProvider() {
  const { typeModal } = useAppSelector((state) => state.modal);

  const modalComponents: Record<TYPE_MODAL, React.ReactNode> = {
    LOGIN: <ModalLogin />,
    SIGN_UP: <ModalSignUp />,
  };

  return typeModal ? <Portal>{modalComponents[typeModal]}</Portal> : null;
}
