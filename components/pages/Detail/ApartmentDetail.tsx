import Image from "next/image";
import TitleDetail from "./TitleDetail";
import Desc from "./Desc";
import PayDetail from "./PayDetail";
import NumbRoom from "./NumbRoom";

export default function Details() {
  return (
    <div className="flex items-start gap-16">
      <div className="w-[70%]">
        <TitleDetail />
        <Desc />
        <NumbRoom />
      </div>

      <PayDetail />
    </div>
  );
}
