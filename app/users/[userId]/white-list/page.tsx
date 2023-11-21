"use client";

import CardApartment from "@/components/pages/Home/CardApartment";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

export default function WhiteList() {
  const { whiteList } = useAppSelector((state) => state.userStore);
  return (
    <div className="px-pd-main py-8">
      <h2 className="text-center text-3xl font-semibold">
        Danh sách căn hộ yêu thích
      </h2>

      <div className="py-10">
        {whiteList.length ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
            {whiteList.map((apartment, index) => (
              <CardApartment key={index} apartment={apartment} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="flex flex-col gap-4 w-fit mt-6">
              <h4 className="text-2xl text-primary font-medium">
                Bạn chưa lưu nội dung nào
              </h4>
              <p className="text-lg">
                Trong quá trình tìm kiếm, hãy nhấp vào biểu tượng hình trái tim
                để lưu các chỗ ở và Trải nghiệm bạn thích vào Danh sách yêu
                thích.
              </p>

              <Link
                href={"/"}
                className="text-white py-4 px-6 bg-[#222222] hover:bg-black hover:shadow-lg transition-all duration-500 rounded-xl w-fit text-xl font-medium cursor-pointer"
              >
                Bắt đầu khám phá
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
