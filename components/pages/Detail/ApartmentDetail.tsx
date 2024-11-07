"use client";

import TitleDetail from "./TitleDetail";
import Desc from "./Desc";
import PayDetail from "./PayDetail";
import NumbRoom from "./NumbRoom";
import TimeBooking from "./TimeBooking";
import Amenities from "./Amenities";
import {
  IResponseApartment,
  IResponseApartmentAmenity,
} from "@/utils/interface.v2";

interface IProps {
  apartment: IResponseApartment;
  totalComments: number;
}

export default function Details({ apartment, totalComments }: IProps) {
  return (
    <div className="flex gap-16 pb-8">
      <div className="w-[65%]">
        <TitleDetail apartmentDetail={apartment} />
        <Desc text={apartment.description} />
        <NumbRoom apartment={apartment} />
        <Amenities
          amenities={apartment.amentities as IResponseApartmentAmenity[]}
        />
        <TimeBooking />
      </div>

      <PayDetail apartmentDetail={apartment} totalComments={totalComments} />
    </div>
  );
}
