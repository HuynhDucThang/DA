import { BtnCommon } from "@/components/common";
import PopupMessage from "./popupMessage";

interface Props {
  isOpen: boolean;
  message: string;
  onOk: () => void;
  onCancel: () => void;
  onClickOutSide: () => void;
  titleOK?: string;
  titleCancel?: string;
}

export default function Confirm({
  isOpen,
  message,
  onOk,
  onCancel,
  onClickOutSide,
  titleOK = "Yes",
  titleCancel = "No",
}: Props) {
  return (
    <PopupMessage
      isOpen={isOpen}
      onCLickOutSide={onClickOutSide}
      maxWidth="max-w-[401px]"
      className="w-full"
    >
      <div className="w-full">
        <p className="font-semibold text-blue-dark text-xl text-center">{message}</p>
        <div className="flex w-full gap-[10%] mt-4">
          <div className="flex w-full gap-6 justify-between items-center">
            <div
              className="text-txt-primary flex-1 text-xl text-center font-semibold underline p-3 rounded-xl transition-all hover:bg-slate-100 cursor-pointer"
              onClick={onCancel}
            >
              {titleCancel}
            </div>

            <div
              className="text-white py-4 flex-1 px-6 text-center bg-[#222222] hover:bg-black hover:shadow-lg transition-all duration-500 rounded-xl w-fit text-xl font-medium cursor-pointer"
              onClick={onOk}
            >
              {titleOK}
            </div>
          </div>
        </div>
      </div>
    </PopupMessage>
  );
}
