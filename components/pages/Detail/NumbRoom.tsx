"use client";

import { IApartmentRead } from "@/utils/interface";
import Image from "next/image";
import { useState } from "react";

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
          <div className="mt-2 overflow-x-hidden">
            <div
              className="flex gap-4"
              style={{
                transform: `translateX(-${(nextLayout - 1) * 100}%)`,
              }}
            >
              {imagesSlice.map((img, ind) => (
                <div className="flex-[0_1_50%] " key={ind}>
                  <div className="w-full aspect-[1.5] relative">
                    <Image
                      src={`http://127.0.0.1:8000/api/${img.image_url}`}
                      alt="img room"
                      fill
                      className="object-cover rounded-lg shadow-lg"
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
