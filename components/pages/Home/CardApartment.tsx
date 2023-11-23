"use client";

import { BtnCommon } from "@/components/common";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToWhiteList, deleteWhiteListItem } from "@/redux/slices/userStore";
import { handleConvertDate, showToast } from "@/utils/helpers/common";
import { IApartmentRead } from "@/utils/interface";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";

interface IProps {
  apartment: IApartmentRead;
}

export default function CardApartment({ apartment }: IProps) {
  const { whiteList } = useAppSelector((state) => state.userStore);
  const dispatch = useAppDispatch();

  const checkApartmentInWhiteList = whiteList.findIndex(
    (list) => list.id === apartment.id
  );

  const handleAddOrRemoveWhiteListItem = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (checkApartmentInWhiteList === -1) {
      dispatch(addToWhiteList(apartment));
      showToast("Đã vào danh sách yêu thích");
    } else {
      dispatch(deleteWhiteListItem(apartment.id));
      showToast("Đã xoá khỏi danh sách yêu thích");
    }
  };

  return (
    <Link
      href={`/apartment/${apartment.id}`}
      className="flex-[1_1_300px] group"
    >
      <div className="shadow-sm rounded-xl">
        <div className="w-full aspect-[1/1] relative rounded-2xl overflow-hidden mb-3">
          <Image
            src={`http://127.0.0.1:8000/api/${apartment.images?.[0]?.image_url}`}
            alt="banner apartment"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div
            className="w-8 h-8 absolute top-4 right-4 cursor-pointer hover:shadow-md transition-shadow rounded-full"
            onClick={handleAddOrRemoveWhiteListItem}
          >
            <Image
              src={
                checkApartmentInWhiteList !== -1
                  ? "/heart/heart_red.svg"
                  : "/heart/heart_grey.svg"
              }
              alt="heart icon"
              fill
            />
          </div>
        </div>
        <div className="py-4 px-1">
          {/* heading */}
          <div className="flex justify-between items-center gap-2">
            <h4 className="text_card_heading line-clamp-1">{apartment.name}</h4>
            <div className="flex_center gap-1">
              <Image src="/star.svg" alt="star icon" width={20} height={20} />
            </div>
          </div>

          <p className="text_card_sub_heading line-clamp-1">{apartment.desc}</p>

          {/*  */}
          <div className="flex items-center gap-2">
            <Image
              src="/amenities/clock.svg"
              width={16}
              height={16}
              alt="clock"
            />
            <p className="text_card_sub_heading">
              {handleConvertDate(new Date(apartment.created_at))}
            </p>
          </div>
          {/* price */}
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-1">
              <Image src="/dolar.svg" alt="star icon" width={20} height={20} />
              <span className="text_card_heading">
                {apartment.price_per_day}
              </span>
              /<span>đêm</span>
            </div>
            <div className="flex items-center gap-1">
              <Image src="/filter/house.svg" alt="star icon" width={20} height={20} />
              <span className="text_card_heading">
                {apartment.apartment_type}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
