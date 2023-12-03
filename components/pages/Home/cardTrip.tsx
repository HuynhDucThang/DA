"use client";

import { BtnCommon } from "@/components/common";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToWhiteList, deleteWhiteListItem } from "@/redux/slices/userStore";
import { handleConvertDate } from "@/utils/helpers/common";
import { IApartmentRead, IContractsTrip } from "@/utils/interface";
import { deleteContract } from "@/utils/proxy";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

interface IProps {
  contract: IContractsTrip;
  deteteTrip: (contractId: string) => void;
}

export default function CardTrip({ contract, deteteTrip }: IProps) {
  const { whiteList } = useAppSelector((state) => state.userStore);
  const dispatch = useAppDispatch();

  const checkApartmentInWhiteList = whiteList.findIndex(
    (list) => list.id === contract.apartment.id
  );

  const handleAddOrRemoveWhiteListItem = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (checkApartmentInWhiteList === -1) {
      dispatch(addToWhiteList(contract.apartment));
    } else {
      dispatch(deleteWhiteListItem(contract.apartment.id));
    }
  };

  const isTripCompleted = new Date() > new Date(contract.start_date);

  return (
    <Link
      href={`/apartment/${contract.apartment.id}`}
      className="flex-[1_1_300px] group"
    >
      <div className="shadow-sm rounded-xl">
        <div className="w-full aspect-[1/1] relative rounded-2xl overflow-hidden mb-3">
          <Image
            src={`http://127.0.0.1:8000/api/${contract.apartment.images?.[0]?.image_url}`}
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
            <h4 className="text_card_heading line-clamp-1">
              {contract.apartment.name}
            </h4>
            <div className="flex_center gap-1">
              <Image src="/star.svg" alt="star icon" width={20} height={20} />
              <span>{contract.apartment.apartment_type}</span>
            </div>
          </div>

          {/*  */}
          <p className="text_card_sub_heading">
            {handleConvertDate(new Date(contract.start_date), "dd/MM/yyyy")}
            {` - `}
            {handleConvertDate(new Date(contract.end_date), "dd/MM/yyyy")}
          </p>
          {/* price */}
          <div className="flex items-center gap-1">
            <Image src="/dolar.svg" alt="star icon" width={20} height={20} />
            <span className="text_card_heading">
              {contract.apartment.price_per_day}
            </span>
            /<span>đêm</span>
          </div>
        </div>

        <div>
          {isTripCompleted ? (
            <BtnCommon title="Chuyến đi đã hoàn thành" handleClick={() => {}} />
          ) : (
            <BtnCommon
              title="Huỷ chuyến đi"
              typeBtn="outline"
              handleClick={() => deteteTrip(contract.id)}
            />
          )}
        </div>
      </div>
    </Link>
  );
}
