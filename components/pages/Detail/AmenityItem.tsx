import { IAmenityRead } from "@/utils/interface";
import Image from "next/image";

interface IProps {
  amenity: IAmenityRead;
}

export default function AmenityItem({ amenity }: IProps) {
  return (
    <div className="flex-[1_1_50%]">
      <div className="flex items-center gap-4">
        <Image
          src="/amenities/cammera.svg"
          alt="cammera"
          width={24}
          height={24}
        />
        <p className="text-primary font-normal text-xl">{amenity.desc}</p>
      </div>
    </div>
  );
}
