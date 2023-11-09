"use client";

import { BtnCommon } from "@/components/common";
import RangeCalendar from "@/components/common/calendar/rangeCalendar";
import ModalAbs from "@/components/common/modal/ModalAbs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeDate } from "@/redux/slices/booking";
import { handleConvertDate } from "@/utils/helpers/common";
import useModal from "@/utils/hook/useModal";
import { createContract } from "@/utils/proxy";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

const dataNumberEnteredHouse = [
  {
    title: "Người lớn",
    desc: "Từ 13 tuổi trở lên",
    key: "adult",
  },
  {
    title: "Trẻ em",
    desc: "Độ tuổi 2 - 12",
    key: "young",
  },
  {
    title: "Em bé",
    desc: "Dưới 2 tuổi",
    key: "baby",
  },
  {
    title: "Thú cưng",
    desc: "Cho phép mang theo",
    key: "pet",
  },
];

type TYPE_ENTERD_HOUSE = "adult" | "young" | "baby" | "pet";

export default function PayDetail() {
  const [numberEnteredHouse, setNumberEnteredHouse] = useState({
    adult: 2,
    young: 0,
    baby: 1,
    pet: 0,
  });

  const { isOpen, typePopup, closePopup, openPopup } = useModal<
    "start-day" | "end-day" | "number-people"
  >();

  const { start_date, end_date } = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();
  const params = useParams();

  const handleBooking = async () => {
    await createContract({
      apartment_id: params.apartmentId as string,
      user_id: "12d49e77-e8fc-4fce-814c-ccb130933cd0",
      content: `12d49e77-e8fc-4fce-814c-ccb130933cd0 đặt phòng lúc ${handleConvertDate(
        start_date
      )} - ${handleConvertDate(end_date)}`,
      end_date: end_date,
      start_date: start_date,
    });

    alert("Thành công")
  };

  return (
    <div className="w-[35%]">
      <div className="w-full border rounded-lg shadow-[rgba(0,0,0,0.12)_0px_6px_16px] sticky top-12">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h4 className="text-3xl font-semibold text-primary">$147</h4>
              <span className="text-second text-xl">/đêm</span>
            </div>

            <div className="flex items-center gap-1">
              <Image
                src="/star.svg"
                alt="arrow_bottom"
                width={20}
                height={20}
              />
              <span>5,0</span>
              <Image src="/dot.svg" alt="arrow_bottom" width={10} height={10} />
              <span className="text-second text-base">6 đánh giá</span>
            </div>
          </div>

          {/* choose */}
          <div className="border border-c-border my-4 rounded-lg">
            {/* top */}
            <div className="grid grid-cols-2 relative">
              <div
                className={`p-3 ${
                  typePopup === "start-day" &&
                  "border-[3px] border-primary rounded-lg"
                }`}
                onClick={() => openPopup("start-day")}
              >
                <p className="text_filter_apartment">Nhận phòng</p>
                <div className="text-second text-lg font-medium">
                  {new Date() !== new Date(start_date)
                    ? handleConvertDate(start_date)
                    : "Chọn Ngày"}
                </div>
              </div>
              <div
                className={`p-3 ${
                  typePopup === "end-day"
                    ? "border-[3px] border-primary rounded-lg"
                    : "border-l border-c-border"
                }`}
                onClick={() => openPopup("end-day")}
              >
                <p className="text_filter_apartment">Trả phòng</p>
                <div className="text-second text-lg font-medium">
                  {new Date() !== new Date(end_date)
                    ? handleConvertDate(end_date)
                    : "Chọn Ngày"}
                </div>
              </div>

              <ModalAbs
                isOpen={isOpen && typePopup !== "number-people"}
                parentStyles="top-[50%] right-0"
                subParentStyles="w-auto p-4"
              >
                <RangeCalendar />
                <div className="mt-4 flex gap-5 justify-end items-center">
                  <div
                    className="text-primary underline cursor-pointer"
                    onClick={() => dispatch(removeDate())}
                  >
                    Xoá ngày
                  </div>
                  <div
                    className="text-white bg-black p-3 cursor-pointer rounded-md"
                    onClick={closePopup}
                  >
                    Đóng
                  </div>
                </div>
              </ModalAbs>
            </div>
            {/* bottom number people */}
            <div
              className={`relative p-3 flex items-center justify-between  ${
                typePopup === "number-people"
                  ? "border-[3px] border-primary rounded-lg"
                  : "border-t border-c-border"
              }`}
              onClick={() =>
                isOpen && typePopup === "number-people"
                  ? closePopup()
                  : openPopup("number-people")
              }
            >
              <div className="">
                <p className="text_filter_apartment">Số khách</p>
                <div className="text-second text-lg font-medium">2 Khách</div>
              </div>
              <Image
                src="/arrow/arrow_bottom.svg"
                alt="arrow_bottom"
                width={24}
                height={24}
              />

              <ModalAbs
                isOpen={isOpen && typePopup === "number-people"}
                parentStyles="w-full top-[105%] right-0 rounded-sm"
                subParentStyles="w-full p-4"
              >
                {dataNumberEnteredHouse.map((data) => (
                  <div
                    key={data.key}
                    className="flex items-center justify-between p-2"
                  >
                    <div>
                      <h2 className="text-xl font-semibold text-primary">
                        {data.title}
                      </h2>
                      <p className="text_card_heading">{data.desc}</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="text-center p-3 rounded-full border border-c-border">
                        -
                      </div>
                      <div className="text-center p-3 rounded-full border border-c-border">
                        {numberEnteredHouse[data.key as TYPE_ENTERD_HOUSE]}
                      </div>
                      <div className="text-center p-3 rounded-full border border-c-border">
                        +
                      </div>
                    </div>
                  </div>
                ))}

                <p className="text-second text-base font-medium leading-5 mt-5">
                  Chỗ ở này cho phép tối đa 5 khách, không tính em bé. Nếu bạn
                  mang theo nhiều hơn 2 thú cưng, vui lòng báo cho Chủ nhà biết.
                </p>
              </ModalAbs>
            </div>
          </div>

          {/* buttun */}
          <BtnCommon title="Đặt phòng" handleClick={handleBooking} />
          {/* fee */}
          <div className="py-6">
            <div className="flex justify-between mt-2">
              <p className="text-primary text-xl">Phí</p>
              <p className="text-primary text-xl">Tổng</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-primary text-lg underline">$178 x 2 đêm</p>
              <p className="text-primary text-lg">$365</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-primary text-lg underline">Phí vệ sinh</p>
              <p className="text-primary text-lg">$45</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-primary text-lg underline">
                Phí dịch vụ Airbnb
              </p>
              <p className="text-primary text-lg">$30</p>
            </div>
          </div>

          <div className="flex justify-between mt-2 pt-3 border-t-2 border-c-border">
            <p className="text-primary text-xl">Tổng trước thuế</p>
            <p className="text-primary text-xl">$424</p>
          </div>

          {/*  */}
        </div>
      </div>
    </div>
  );
}
