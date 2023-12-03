"use client";

import Image from "next/image";
import { iconsFilterApartment } from "@/utils/data";
import { updateSearchParams } from "@/utils/helpers/common";
import { ITagRead, ITypeApartment } from "@/utils/interface";
import { useRouter } from "next/navigation";

interface IProps {
  tag: ITagRead;
  chooseTag: string;
}

export default function FilterItem({ tag, chooseTag }: IProps) {
  const router = useRouter();

  return (
    <div
      className={`my-3 py-1 flex-[0_1_auto] cursor-pointer flex_center flex-col transition-all border-b-[3px] border-transparent ${
        chooseTag === tag.id
          ? "opacity-100 animate-shirk-grow border-b-primary font-medium"
          : "opacity-80"
      }`}
      onClick={() =>
        router.replace(updateSearchParams("tagId", tag.id), { scroll: false })
      }
    >
      <Image
        src={iconsFilterApartment[tag.name]}
        alt={tag.name}
        height={30}
        width={30}
      />
      <p className="text_filter_apartment line-clamp-1 mt-1">{tag.desc}</p>
    </div>
  );
}
