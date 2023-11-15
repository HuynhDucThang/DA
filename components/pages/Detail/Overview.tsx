import { IApartmentRead } from "@/utils/interface";
import Image from "next/image";

interface IProps {
  apartmentDetail: IApartmentRead;
  totalComment:number;
}

export default function OverView({ apartmentDetail, totalComment }: IProps) {
  return (
    <div className="mb-10">
      <div className="mb-2 flex gap-3">
        <Image
          src="/translate.svg"
          alt="translate icon"
          width={24}
          height={24}
        />
        <h3 className="text-3xl font-semibold text-primary">
          {apartmentDetail?.name}
        </h3>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="text_apartment_detail flex items-center gap-1">
            <Image src="/star.svg" alt="star icon" width={24} height={24} />
            {apartmentDetail?.rate}
          </div>

          <Image src="/dot.svg" alt="dot icon" width={10} height={10} />
          <p className="text_apartment_detail underline cursor-pointer">
            {totalComment ?? 0} đánh giá
          </p>
          <Image src="/dot.svg" alt="dot icon" width={10} height={10} />
          <p className="text_apartment_detail underline cursor-pointer">
            {/* {apartmentDetail?.desc} */}
            Thành phố Hội An, Quảng Nam, Việt Nam
          </p>
        </div>

        <div className="flex gap-2">
          <div className="flex_center gap-2 p-2 transition-all rounded-lg cursor-pointer hover:bg-c-grey-blur hover:shadow-sm">
            <Image src="/share.svg" alt="dot icon" width={24} height={24} />
            <p className="text_apartment_detail underline ">Chia sẻ</p>
          </div>
          <div className="flex_center gap-2 p-2 transition-all rounded-lg cursor-pointer hover:bg-c-grey-blur hover:shadow-sm">
            <Image
              src="/heart/empty_heart.svg"
              alt="dot icon"
              width={22}
              height={22}
            />
            <p className="text_apartment_detail underline ">Chia sẻ</p>
          </div>
        </div>
      </div>

      {/* imges */}
      <div className="spacing_between_cpn_detail">
        <div className="grid grid-cols-4 w-full aspect-[3/1] gap-3">
          {apartmentDetail?.images.slice(0,5).map((imageApartment, index) => (
            <div
              className={`relative ${
                index === 0
                  ? "col-[1/3] row-[1/3] rounded-l-xl"
                  : "odd:rounded-r-xl"
              } object-cover cursor-pointer transition-all hover:opacity-90 overflow-hidden shadow-md`}
              key={index}
            >
              <Image
                src={`http://127.0.0.1:8000/api/${imageApartment?.image_url}`}
                alt={imageApartment.id}
                fill
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
