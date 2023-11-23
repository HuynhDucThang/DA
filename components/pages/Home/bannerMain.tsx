"use client";

import { useAppDispatch } from "@/redux/hooks";
import { setModalType } from "@/redux/slices/modalSlice";
import Image from "next/image";

export default function BannerMain() {
  const dispatch = useAppDispatch();

  return (
    <div className="h-[600px] relative">
      <Image src="/images/banner_main.png" alt="banner_main" fill />
      <div className="absolute z-10 bg-gradient-to-r from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0.6)] w-full h-full top-0 left-0"></div>
      <div className="absolute z-20 w-full h-full flex_center">
        <div className="flex_center flex-col gap-3 w-full">
          {/*  */}

          {/*  */}
          <h2 className="text-white text-4xl font-semibold">
            Tìm Căn Hộ - Chúng Tôi Sẽ Hỗ Trợ Bạn Bất Cứ Đâu |
          </h2>
          <p className="text-[#ccc] text-xl font-medium">
            Mang đến cho bạn những sự lựa chọn tốt nhất cho điểm đến của bạn !!!{" "}
          </p>
          <div className="flex_center gap-3 w-[80%] h-[80px] mt-6">
            <div
              className="py-4 px-8 bg-[var(--color-red)] cursor-pointer text-white h-full rounded-xl flex_center text-2xl font-semibold"
              onClick={() => dispatch(setModalType("SEARCH"))}
            >
              Nhấn vào đây để tìm kiếm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
