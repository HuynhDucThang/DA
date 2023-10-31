import Image from "next/image";

export default function NumbRoom() {
  return (
    <div className="spacing_between_cpn_detail">
      <div className="flex justify-between items-center">
        <h4 className="heading__detail_apartment">Bố trí bên trong</h4>
        <div className="flex_center gap-3">
          <div className="p-2 rounded-full border transition-all hover:scale-[1.01] cursor-pointer shadow-md">
            <Image
              src="/arrow/arrow_bottom.svg"
              alt="arrow"
              width={20}
              height={20}
              className="rotate-90"
            />
          </div>
          <h4 className="text-primary text-lg">4/4</h4>
          <div className="p-2 rounded-full border transition-all hover:scale-[1.01] cursor-pointer shadow-md">
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
      <div className="mt-2">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          <div className="">
            {/* img */}
            <div className="w-full aspect-[1.5] relative">
              <Image src="/images/room.png" alt="img room" fill />
            </div>
            <h2 className="text-primary text-xl mt-2">Phòng ngủ 1</h2>
            <h4 className="text-second text-base mt-2">1 Giường đơn</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
