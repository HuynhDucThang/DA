"use client";

import { ITypeApartment } from "@/utils/interface";
import Image from "next/image";

interface IProps {
  typeApartment: ITypeApartment;
  chooseTypeApartment: string;
  setChooseTypeApartment: (chooseTypeApartment: string) => void;
}

export default function FilterItem({
  typeApartment,
  chooseTypeApartment,
  setChooseTypeApartment,
}: IProps) {
  return (
    <div
      className={`my-3 py-1 flex-[0_1_auto] cursor-pointer flex_center flex-col transition-all border-b-[3px] border-transparent ${
        chooseTypeApartment === typeApartment.title
          ? "opacity-100 animate-shirk-grow border-b-primary"
          : "opacity-60"
      }`}
      onClick={() => setChooseTypeApartment(typeApartment.title)}
    >
      <Image
        src={typeApartment.icon}
        alt={typeApartment.title}
        height={30}
        width={30}
      />
      <p className="text_filter_apartment line-clamp-1 mt-1">{typeApartment.title}</p>
    </div>
  );
}
