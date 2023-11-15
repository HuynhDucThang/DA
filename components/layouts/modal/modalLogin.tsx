import { Login } from "@/components/common";
import Modal from "@/components/common/modal/Modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeModalType } from "@/redux/slices/modalSlice";

export default function ModalLogin() {
  const { typeModal } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  return (
    <Modal
      isOpen={typeModal === "LOGIN" ? true : false}
      handleCloseModal={() => dispatch(removeModalType())}
      commonStyles="max-w-[700px]"
      title="Đăng nhập hoặc đăng ký."
    >
      <h2 className="text-2xl text-primary font-semibold">
        Chào mừng bạn đến với Airbnb
      </h2>
      <Login />
    </Modal>
  );
}
