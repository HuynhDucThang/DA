"use client";

import { useAppSelector } from "@/redux/hooks";
import useModal from "@/utils/hook/useModal";
import Image from "next/image";
import { useState } from "react";

export default function ProfileUser() {
  const { isOpen, openPopup, closePopup } = useModal();
  const [indexSilder, setIndexSilder] = useState<number>(0);
  const length = 6

  const { currentUser } = useAppSelector(state => state.user)


  return (
    <>
      <div className="container_px max-w-[1500px]">
        <div className="flex gap-16">
          {/* left */}
          <div className="w-[30%] ">
            <div className="flex items-center gap-12 p-12 border shadow-xl rounded-3xl">
              <div className="flex flex-col items-center ">
                <div className="w-[120px] h-[120px] relative">
                  <Image
                    src="/avatar.png"
                    alt="avater"
                    fill
                    className="rounded-full"
                  />
                </div>
                <h2 className="text-primary text-4xl mt-4 font-semibold">
                  {currentUser.username}
                </h2>
                <span className="text-lg font-medium">Khách</span>
              </div>

              <div>
                <div className="py-4">
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-sm font-semibold text-primary">
                    Đánh giá
                  </div>
                </div>
                <div className="border-t py-4">
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-sm font-semibold text-primary">
                    Năm hoạt động trên Airbnb
                  </div>
                </div>
              </div>
            </div>

            {/* bottom */}
            <div className="mt-10 p-8 border shadow-md rounded-3xl">
              <h2 className="heading__detail_apartment">
                Thông tin đã được xác nhận của Michelle{" "}
              </h2>
              <div className="mt-4">
                <div className="flex gap-4">
                  <Image
                    src="/tick_icon.svg"
                    alt="tick icon"
                    width={24}
                    height={24}
                  />
                  <span className="text_card_heading">Danh tính</span>
                </div>
                <div className="flex gap-4 mt-3">
                  <Image
                    src="/tick_icon.svg"
                    alt="tick icon"
                    width={24}
                    height={24}
                  />
                  <span className="text_card_heading">Số điện thoại</span>
                </div>
                <p className="mt-4 text_card_heading underline cursor-pointer">
                  Tìm hiểu về quy trình xác minh danh tính
                </p>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="w-[70%]">
            <div>
              <h2 className="text-primary text-4xl mt-4 font-bold">
                Thông tin về Michelle
              </h2>
            </div>

            {/* rate */}
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-primary text-2xl mt-4 font-semibold py-pd-spacing-cpn">
                  Nhận xét của các Chủ nhà/Người tổ chức về Michelle
                </h4>
                <div className="flex gap-4">
                  <div className="flex_center rounded-full border border-c-border cursor-pointer h-10 w-10"
                    onClick={() =>
                      setIndexSilder((pre) => (pre - 2  < 0 ? 0 : pre + 1))
                    }>
                    <Image
                      src="/arrow/arrow_bottom.svg"
                      alt="arrow"
                      width={20}
                      height={20}
                      className="rotate-90"

                    />
                  </div>

                  <div
                    className="flex_center rounded-full border border-c-border cursor-pointer h-10 w-10"
                    onClick={() =>
                      setIndexSilder((pre) => (pre + 2 > length / 2 ? 0 : pre + 1))
                    }
                  >
                    <Image
                      src="/arrow/arrow_bottom.svg"
                      alt="arrow"
                      width={20}
                      height={20}
                      className="-rotate-90"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full overflow-x-hidden">
                <div
                  className="flex gap-2 transition-transform duration-500"
                  style={{
                    transform: `translateX(calc(-${indexSilder * 100}% - ${
                      indexSilder * 5
                    }px))`,
                  }}
                >
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex-[1_0_49.5%] flex flex-col h-full min-h-[224px] rounded-xl border border-c-border p-5"
                    >
                      <p className="line-clamp-5 text-lg">
                        {index}-- “Nick và con gái Michelle là những vị khách
                        xinh đẹp, rất vui được trò chuyện với một niềm vui để
                        đón tiếp khách và tôi chào đón họ trở lại bất cứ lúc
                        nào.
                      </p>

                      <div className="mt-auto">
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 relative">
                            <Image
                              src="/avatar.png"
                              alt=""
                              fill
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <h5 className="text-primary text-xl font-semibold">
                              Mandy
                            </h5>
                            <h6 className="text-primary text-lg font-light">
                              tháng 1 năm 2023
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
