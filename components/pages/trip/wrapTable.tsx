"use client";

import useClickOutSide from "@/utils/hook/useClickOutSide";
import Image from "next/image";
import { ReactNode, useState, useRef, KeyboardEvent } from "react";

interface IProps {
  title: string;
  children: ReactNode;
  stylesCommon?: string;
  changePage: number;
  totalPage: number;
  setChangePage: (changePage: number) => void;
}

export default function WrapProjectsTable({
  title,
  stylesCommon,
  children,
  totalPage,
  changePage,
  setChangePage,
}: IProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const numRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutSide(() => setIsEdit(false), numRef, [isEdit]);

  const handleNextPage = () => {
    setChangePage(changePage + 1 > totalPage ? changePage : changePage + 1);
  };

  const handlePreviousPage = () => {
    setChangePage(changePage - 1 < 1 ? changePage : changePage - 1);
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputRef.current) {
      setIsEdit(false);
      setChangePage(
        +inputRef.current.value > totalPage
          ? totalPage
          : +inputRef.current.value
      );
    }
  };

  return (
    <div className="max-h-[450px] h-full flex flex-col bg-white rounded-[15px]">
      <div className={`py-6 px-[30px] ${stylesCommon}`}>
        <div className="flex justify-between items-center ">
          <p className="font-bold text-[18px] text-white">{title}</p>
          <div className="flex gap-2">
            <Image
              src="/arrow/arrow_table.svg"
              alt="icon pre"
              width={24}
              height={24}
              onClick={handlePreviousPage}
              className={`rotate-180 ${
                changePage - 1 < 1
                  ? "cursor-not-allowed"
                  : "hover:-translate-y-1 cursor-pointer"
              } transition-transform`}
            />
            <div
              className="min-w-[32px] h-8 rounded-md flex_center shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] bg-white text-[#67349d]"
              ref={numRef}
            >
              {!isEdit ? (
                <span
                  className="font-medium text-sm text-center px-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEdit(true);
                  }}
                >
                  {changePage}
                </span>
              ) : (
                <input
                  ref={inputRef}
                  type="number"
                  onKeyDown={handleEnter}
                  className="w-12 pl-2 h-full"
                />
              )}
            </div>
            <Image
              src="/arrow/arrow_table.svg"
              alt="icon next"
              width={24}
              height={24}
              className={`${
                changePage + 1 > totalPage
                  ? "cursor-not-allowed"
                  : "hover:-translate-y-1 cursor-pointer"
              } transition-transform`}
              onClick={handleNextPage}
            />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
