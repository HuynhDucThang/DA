import Image from "next/image";
import TitleDetail from "./TitleDetail";
import Desc from "./Desc";
import PayDetail from "./PayDetail";
import NumbRoom from "./NumbRoom";
import RangeCalendar from "@/components/common/calendar/rangeCalendar";

export default function Details() {
  return (
    <div className="flex gap-16 pb-8">
      <div className="w-[65%]">
        <TitleDetail />
        <Desc />
        <NumbRoom />
        <RangeCalendar />
      </div>

      <PayDetail />
    </div>
  );
}
