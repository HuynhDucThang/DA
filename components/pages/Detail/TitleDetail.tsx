import Image from "next/image";

export default function TitleDetail() {
  return (
    <div className="spacing_between_cpn_detail">
      <h3 className="text-3xl font-semibold text-primary">
        Toàn bộ căn hộ cho thuê ABC
      </h3>
      <div className="flex gap-2">
        <p className="text_apartment_detail font-normal">2 khách</p>
        <Image src="/dot.svg" alt="dot icon" width={10} height={10} />
        <p className="text_apartment_detail font-normal">1 phòng ngủ</p>
        <Image src="/dot.svg" alt="dot icon" width={10} height={10} />
        <p className="text_apartment_detail font-normal">1 phòng giường</p>
        <Image src="/dot.svg" alt="dot icon" width={10} height={10} />
        <p className="text_apartment_detail font-normal">1 phòng tắm</p>
      </div>
    </div>
  );
}
