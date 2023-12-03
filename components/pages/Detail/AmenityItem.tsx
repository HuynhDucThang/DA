import { iconAmenities } from "@/utils/data";
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
          src={iconAmenities[amenity.name]}
          alt={amenity.name}
          height={24}
          width={24}
        />
        <p className="text-primary font-normal text-xl">{amenity.desc}</p>
      </div>
    </div>
  );
}
