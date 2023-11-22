"use client";
import { useState, ChangeEvent } from "react";

interface IProps {
  title: string;
  name: string;
  value: string;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputProfile({
  name,
  title,
  value,
  handleOnChange,
}: IProps) {
  const [active, setActive] = useState<boolean>(false);

  return (
    <label
      htmlFor={name}
      className={`py-2 mt-4 px-4 h-17 cursor-text block rounded-xl border ${
        active ? "border-[3px] border-primary" : "border-second"
      }`}
      onClick={() => setActive(true)}
    >
      <div
        className={`relative transition-transform duration-500 text-lg text-second ${
          active || value ? "top-0" : "top-[12px]"
        }`}
      >
        {title}
      </div>
      <input
        id={name}
        type="text"
        name={name}
        className="w-full outline-none"
        value={value}
        onChange={handleOnChange}
        onBlur={() => setActive(false)}
      />
    </label>
  );
}
