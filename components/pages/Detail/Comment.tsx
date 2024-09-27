import { IResponseApartmentComment } from "@/utils/interface.v2";
import CommentLeft from "./CommentLeft";
import CommentRight from "./CommentRight";

interface IProps {
  commentApartment: IResponseApartmentComment[];
  apartmentId: string;
}

export default function Comment({
  commentApartment,
  apartmentId,
}: IProps) {
  return (
    <div className="spacing_between_cpn_detail">
      <div className="flex gap-16 pb-8">
        <CommentLeft comments={commentApartment} apartmentId={apartmentId} />
        <CommentRight
          statisticalComments={{
            total_rate_amenities: 2,
            total_rate_interior: 3,
            total_rate_location: 4,
            total_rate_price: 65,
          }}
          totalCommens={20}
        />
      </div>
    </div>
  );
}
