"use client";

import { IApartmentRead } from "@/utils/interface";
import Image from "next/image";
import { useState } from "react";
import { Img } from "../user/img";

interface IProps {
  apartment: IApartmentRead;
}

export default function NumbRoom({ apartment }: IProps) {
  const imagesSlice = apartment?.images.slice(5);
  const [nextLayout, setNextLayout] = useState<number>(1);
  const totalLayout = Math.ceil(imagesSlice.length / 2);

  const handleNext = () => {
    if (nextLayout + 1 <= totalLayout) {
      setNextLayout((pre) => pre + 1);
    } else {
      setNextLayout(1);
    }
  };

  const handlePre = () => {
    // alert((nextLayout - 1) * 100);

    if (nextLayout - 1 <= 0) {
      setNextLayout(totalLayout);
    } else {
      setNextLayout((pre) => pre - 1);
    }
  };
  return (
    <>
      {imagesSlice.length ? (
        <div className="spacing_between_cpn_detail">
          <div className="flex justify-between items-center">
            <h4 className="heading__detail_apartment">Bố trí bên trong</h4>
            <div className="flex_center gap-3">
              <div
                className="p-2 rounded-full border transition-all hover:scale-[1.01] cursor-pointer shadow-md"
                onClick={handlePre}
              >
                <Image
                  src="/arrow/arrow_bottom.svg"
                  alt="arrow"
                  width={20}
                  height={20}
                  className="rotate-90"
                />
              </div>
              <h4 className="text-primary text-lg">
                {nextLayout}/{totalLayout}
              </h4>
              <div
                className="p-2 rounded-full border transition-all hover:scale-[1.01] cursor-pointer shadow-md"
                onClick={handleNext}
              >
                <Image
                  src="/arrow/arrow_bottom.svg"
                  alt="arrow"
                  width={20}
                  height={20}
                  className="-rotate-90"
                />
              </div>
            </div>
          </div>

          {/* laylout list */}
          <div className="mt-2 overflow-x-auto">
            <div
              className="flex flex-row gap-4"
              style={{
                width: `${imagesSlice.length * 50}%`, // Đặt chiều rộng tổng cộng là số lượng ảnh nhân 50%
                transform: `translateX(-${(nextLayout - 1) * 50}%)`, // Dịch chuyển theo nextLayout
              }}
            >
              {imagesSlice.map((img, ind) => (
                <div className="w-1/4" key={ind}>
                  <div className="w-full aspect-[1/1] relative">
                    <Img
                      blob_url={`http://127.0.0.1:8000/api/${img.image_url}`}
                      handleClick={() => {}}
                      name="zxc"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
