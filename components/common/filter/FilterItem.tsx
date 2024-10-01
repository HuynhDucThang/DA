"use client";

import Image from "next/image";
import { iconsFilterApartment } from "@/utils/data";
import { updateSearchParams } from "@/utils/helpers/common";
import { useRouter } from "next/navigation";
import { IResponseApartmentTag } from "@/utils/interface.v2";

interface IProps {
  tag: IResponseApartmentTag;
  chooseTagId: string;
}

export default function FilterItem({ tag, chooseTagId }: IProps) {
  const router = useRouter();

  return (
    <div
      className={`my-3 py-1 flex-[0_1_auto] cursor-pointer flex_center flex-col transition-all border-b-[3px] border-transparent ${
        chooseTagId === tag._id
          ? "opacity-100 animate-shirk-grow border-b-primary font-medium"
          : "opacity-80"
      }`}
      onClick={() =>
        router.replace(updateSearchParams("tag", tag._id), { scroll: false })
      }
    >
      <Image
        src={tag.icon}
        alt={tag.name}
        height={30}
        width={30}
        className="rounded-full"
      />
      <p className="text_filter_apartment line-clamp-1 mt-1">{tag.name}</p>
    </div>
  );
}
