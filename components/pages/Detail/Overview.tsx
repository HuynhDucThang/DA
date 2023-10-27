import Image from "next/image";

export default function OverView() {
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
          Silkhaus Gần Công viên South Ridge | Vibes độc đáo
        </h3>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="text_apartment_detail flex items-center gap-1">
            <Image src="/star.svg" alt="star icon" width={24} height={24} />
            5,0
          </div>

          <Image src="/dot.svg" alt="dot icon" width={10} height={10} />
          <p className="text_apartment_detail underline cursor-pointer">
            6 đánh giá
          </p>
          <Image src="/dot.svg" alt="dot icon" width={10} height={10} />
          <p className="text_apartment_detail underline cursor-pointer">
            Dubai, Các Tiểu Vương quốc Ả Rập Thống nhất
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
      <div>images</div> 
    </div>
  );
}
