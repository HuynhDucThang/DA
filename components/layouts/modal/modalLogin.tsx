import { Login } from "@/components/common";
import Modal from "@/components/common/modal/Modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeModalType } from "@/redux/slices/modalSlice";
import Image from "next/image";

export default function ModalLogin() {
  const { typeModal } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  return (
    <Modal
      isOpen={typeModal === "LOGIN" ? true : false}
      handleCloseModal={() => dispatch(removeModalType())}
      commonStyles="max-w-[500px] relative"
      title="Đăng nhập"
      logo={
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 translate-y-[40%] w-[100px] h-[100px]">
          <div className="absolute w-[56px] h-[56px] rotate-45 bg-white left-0 top-[10%] translate-x-[22px]"></div>
          <Image
            src="/logo-KT.png"
            alt="logo KT"
            width={100}
            height={100}
            className="absolute top-0 left-0"
          />
        </div>
      }
    >
      <h2 className="text-2xl text-primary font-semibold">
        Chào mừng bạn đến với Airbnb
      </h2>
      <Login />
    </Modal>
  );
}
