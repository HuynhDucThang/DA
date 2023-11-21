"use client";

import { useEffect } from "react";
import Image from "next/image";
import FilterHeader from "./Header/FilterHeader";
import HeaderUserInfor from "./Header/UserHeaderInfor";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCurrentUserPending } from "@/redux/slices/userSlice";
import Link from "next/link";

export default function Header() {
  const { access_token } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!access_token) return;
    dispatch(getCurrentUserPending());
  }, [access_token]);

  return (
    <div className="sticky top-0 z-[10000] bg-white shadow px-pd-main border-b-2 flex items-center justify-between">
      <div className="flex items-center h-[var(--header-height)] flex-1">
        {/* logo */}
        <Link
          href={"/"}
          prefetch={false}
          className="relative w-[130px] h-[40px]"
        >
          <Image src="/images/logo.png" alt="logo" fill />
        </Link>
      </div>

      {/* search */}
      <FilterHeader />

      {/* right  */}
      <div className="flex justify-end flex-[1_0_140px] ">
        <div className="flex">
          <div className="flex items-center">
            <p className="text-primary hover:bg-[#f7f7f7] rounded-2xl transition-colors p-3">
              Cho thuê chỗ ở qua Airbnb
            </p>
            <div className="w-12 h-12 rounded-full hover:bg-[#f7f7f7] transition-colors flex justify-center items-center">
              <Image
                src="/header/world.svg"
                alt="world icon"
                width={24}
                height={24}
              />
            </div>
          </div>

          <HeaderUserInfor />
        </div>
      </div>
    </div>
  );
}
