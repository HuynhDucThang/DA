"use client";

import { useState, useEffect } from "react";
import FilterItem from "./FilterItem";
import Image from "next/image";
import { getTagsFilter } from "@/utils/proxy";
import { useRouter, useSearchParams } from "next/navigation";
import {
  clearAllSearchParams,
  clearSearchParams,
  updateSearchParams,
} from "@/utils/helpers/common";
import { IResponseApartmentTag } from "@/utils/interface.v2";

interface IProps {}

export default function FilterApartment({}: IProps) {
  const [tags, setTags] = useState<IResponseApartmentTag[]>([]);

  const searchParams = useSearchParams();
  const tagId = searchParams.get("tag") ?? tags[0]?._id ?? "";
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getTagsFilter();
        const search = updateSearchParams("tag", data.data?.[0]?._id ?? "");
        router.replace(search);
        setTags(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleReset = () => {
    router.replace(clearSearchParams(Object.keys(searchParams)), {
      scroll: false,
    });
  };

  return (
    <div className="flex">
      <div className="flex-1 overflow-x-hidden">
        <div className="flex flex-nowrap gap-10">
          {tags.map((tag, index) => (
            <FilterItem key={index} tag={tag} chooseTagId={tagId} />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="border border-c-border py-4 rounded-2xl cursor-pointer">
          <div className="flex_center gap-3 px-5">
            <Image src="/reset.svg" alt="icon filter" width={24} height={24} />
            <p className="text_filter_apartment" onClick={handleReset}>
              Đặt lại bộ tìm kiếm
            </p>
          </div>
        </div>

        {/* <div
          className="flex items-center gap-2 border border-c-border py-2 px-5 rounded-2xl cursor-pointer"
          onClick={toggleSwitch}
        >
          <p className="text_filter_apartment select-none">
            Hiển thị căn hộ có người thuê
          </p>
          <CheckBox isChecked={isChecked} toggleSwitch={toggleSwitch} />
        </div> */}
      </div>
    </div>
  );
}
