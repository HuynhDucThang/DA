"use client";

import { dataFilterApartment } from "@/utils/data";
import FilterItem from "./FilterItem";
import { useState } from "react";
import Image from "next/image";
import CheckBox from "../checkbox/CheckBox";

export default function FilterApartment() {
  const [chooseTypeApartment, setChooseTypeApartment] =
    useState<string>("Biệt thự");

  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked((pre) => !pre);
  };

  return (
    <div className="flex">
      <div className="flex-1 overflow-x-hidden">
        <div className="flex flex-nowrap gap-10">
          {dataFilterApartment.map((typeApartment, index) => (
            <FilterItem
              key={index}
              chooseTypeApartment={chooseTypeApartment}
              setChooseTypeApartment={setChooseTypeApartment}
              typeApartment={typeApartment}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="border border-c-border py-4 rounded-2xl cursor-pointer">
          <div className="flex_center gap-3 px-5">
            <Image
              src="/filter/filter_black.svg"
              alt="icon filter"
              width={20}
              height={20}
            />
            <p className="text_filter_apartment">Bộ lọc</p>
          </div>
        </div>

        <div
          className="flex items-center gap-2 border border-c-border py-2 px-5 rounded-2xl cursor-pointer"
          onClick={toggleSwitch}
        >
          <p className="text_filter_apartment select-none">
            Hiển thị căn hộ có người thuê
          </p>
          <CheckBox isChecked={isChecked} toggleSwitch={toggleSwitch} />
        </div>
      </div>
    </div>
  );
}
