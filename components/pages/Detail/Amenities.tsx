import { IAmenityRead } from "@/utils/interface";
import AmenityItem from "./AmenityItem";
import { IResponseApartmentAmenity } from "@/utils/interface.v2";

interface IProps {
  amenities: IResponseApartmentAmenity[];
}

export default function Amenities({ amenities }: IProps) {
  return (
    <div className="spacing_between_cpn_detail">
      <h4 className="heading__detail_apartment">Nơi này có những gì cho bạn</h4>

      <div className="my-6">
        <div className="grid grid-cols-2 gap-4">
          {amenities.map((amenity, index) => (
            <AmenityItem key={index} amenity={amenity} />
          ))}
        </div>
      </div>
    </div>
  );
}
