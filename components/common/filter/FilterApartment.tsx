"use client";

import { useState, useEffect } from "react";
import { ITagCreate, ITagRead } from "@/utils/interface";
import FilterItem from "./FilterItem";
import Image from "next/image";
import CheckBox from "../checkbox/CheckBox";
import { getTagsFilter } from "@/utils/proxy";
import { useSearchParams } from "next/navigation";

interface IProps {}

export default function FilterApartment({}: IProps) {
  const [tags, setTags] = useState<ITagRead[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  
  const searchParams = useSearchParams();
  const tagId = searchParams.get("tagId") ?? tags[0]?.id ?? "";

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getTagsFilter();
        setTags(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const toggleSwitch = () => {
    setIsChecked((pre) => !pre);
  };

  return (
    <div className="flex">
      <div className="flex-1 overflow-x-hidden">
        <div className="flex flex-nowrap gap-10">
          {tags.map((tag, index) => (
            <FilterItem key={index} chooseTag={tagId} tag={tag} />
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
