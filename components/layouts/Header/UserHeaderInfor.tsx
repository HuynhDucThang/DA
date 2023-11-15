"use client";

import { DropdownNoUser } from "@/components/common";
import DropdownUser from "@/components/common/dropdown/DropdownUser";
import ModalAbs from "@/components/common/modal/ModalAbs";
import { useAppSelector } from "@/redux/hooks";
import { URL } from "@/utils/api";
import useModal from "@/utils/hook/useModal";
import Image from "next/image";

export default function HeaderUserInfor() {
  const { isOpen, closePopup, openPopup } = useModal();
  const { access_token } = useAppSelector((state) => state.auth);
  const { currentUser } = useAppSelector((state) => state.user);

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
            src={
              currentUser.avatar
                ? `${URL}/${currentUser.avatar}`
                : "/avatar_none_user.svg"
            }
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
        {access_token ? <DropdownUser /> : <DropdownNoUser />}
      </ModalAbs>
    </div>
  );
}
