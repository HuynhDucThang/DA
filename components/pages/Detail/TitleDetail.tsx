import { IApartmentRead } from "@/utils/interface";
import Image from "next/image";

interface IProps {
  apartmentDetail: IApartmentRead;
}

export default function TitleDetail({ apartmentDetail }: IProps) {
  return (
    <div className="spacing_between_cpn_detail">
      <h3 className="text-3xl font-semibold text-primary">
        Toàn bộ căn hộ cho thuê {apartmentDetail.name}
      </h3>
      <div className="flex gap-2">
        <p className="text_apartment_detail font-normal">4 khách</p>
        <Image src="/dot.svg" alt="dot icon" width={10} height={10} />
        <p className="text_apartment_detail font-normal">
          {apartmentDetail.num_bedrooms} phòng ngủ
        </p>
        <Image src="/dot.svg" alt="dot icon" width={10} height={10} />
        <p className="text_apartment_detail font-normal">
          {apartmentDetail.num_living_rooms} phòng khách
        </p>
        <Image src="/dot.svg" alt="dot icon" width={10} height={10} />
        <p className="text_apartment_detail font-normal">
          {apartmentDetail.num_bathrooms} phòng tắm
        </p>
      </div>
    </div>
  );
}
