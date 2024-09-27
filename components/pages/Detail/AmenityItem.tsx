import { iconAmenities } from "@/utils/data";
import { IResponseApartmentAmenity } from "@/utils/interface.v2";
import Image from "next/image";

interface IProps {
  amenity: IResponseApartmentAmenity;
}

export default function AmenityItem({ amenity }: IProps) {
  return (
    <div className="flex-[1_1_50%]">
      <div className="flex items-center gap-4">
        <Image src={amenity.icon} alt={amenity.name} height={24} width={24} />
        <p className="text-primary font-normal text-xl">
          {amenity.description}
        </p>
      </div>
    </div>
  );
}
