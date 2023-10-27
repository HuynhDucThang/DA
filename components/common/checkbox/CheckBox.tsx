import Image from "next/image";
import React, { useState } from "react";

interface IProps {
  isChecked: boolean;
  toggleSwitch: () => void;
}

export default function CheckBox({ isChecked, toggleSwitch }: IProps) {
  return (
    <div className="w-[60px] h-10 p-1 rounded-full">
      <label
        htmlFor="checkbox"
        className={`relative w-full h-full inline-flex items-center cursor-pointer transition-colors rounded-2xl px-[6px] py-2 duration-200 ${
          isChecked ? "bg-primary" : "bg-c-grey"
        }`}
      >
        <input
          type="checkbox"
          className="hidden"
          id="checkbox"
          checked={isChecked}
          onChange={(e) => {
            e.stopPropagation();
            toggleSwitch();
          }}
        />
        <span
          className={`relative w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
            isChecked ? "translate-x-[18px]" : "translate-x-0"
          }`}
        >
          {isChecked ? (
            <Image
              src="/tick.svg"
              alt="tick icon"
              width={16}
              height={16}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
            />
          ) : null}
        </span>
      </label>
    </div>
  );
}
