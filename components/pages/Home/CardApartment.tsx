import Image from "next/image";
import Link from "next/link";

interface IProps {}

export default function CardApartment({}: IProps) {
  return (
    <Link href={"/apartment/123"} className="flex-[1_1_300px]">
      <div>
        <div className="w-full aspect-[1/1] relative rounded-2xl overflow-hidden mb-3">
          <Image
            src="/images/apartment.png"
            alt="banner apartment"
            fill
            className="object-cover"
          />
          <div className="w-8 h-8 absolute top-4 right-4 cursor-pointer">
            <Image src="/heart/heart_red.svg" alt="heart icon" fill />
          </div>
        </div>
        <div>
          {/* heading */}
          <div className="flex justify-between items-center gap-2">
            <h4 className="text_card_heading line-clamp-1">
              Dubai, Các Tiểu Vương quốc A-rập Thống nhất
            </h4>
            <div className="flex_center gap-1">
              <Image src="/star.svg" alt="star icon" width={20} height={20} />
              <span>5.0</span>
            </div>
          </div>

          {/*  */}
          <p className="text_card_sub_heading">Ngày 23 - Ngày 28 tháng 11</p>
          {/* price */}
          <div className="flex items-center gap-1">
            <Image src="/dolar.svg" alt="star icon" width={20} height={20} />
            <span className="text_card_heading">295</span>/<span>đêm</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
