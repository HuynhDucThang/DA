import TitleDetail from "./TitleDetail";
import Desc from "./Desc";
import PayDetail from "./PayDetail";
import NumbRoom from "./NumbRoom";
import RangeCalendar from "@/components/common/calendar/rangeCalendar";
import { IApartmentDetail } from "@/utils/interface";

interface IProps {
  apartment: IApartmentDetail;
}

export default function Details({ apartment }: IProps) {
  const { amenities, apartment_contract, apartment_tags, ...apartmentDetail } =
    apartment;

  return (
    <div className="flex gap-16 pb-8">
      <div className="w-[65%]">
        <TitleDetail apartmentDetail={apartmentDetail} />
        <Desc />
        <NumbRoom />
        <RangeCalendar apartmentContract={apartment_contract} />
      </div>

      <PayDetail />
    </div>
  );
}
