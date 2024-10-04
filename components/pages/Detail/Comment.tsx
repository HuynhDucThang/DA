import {
  IResponseApartmentComment,
  IResponseRatingApartment,
} from "@/utils/interface.v2";
import CommentLeft from "./CommentLeft";
import CommentRight from "./CommentRight";

interface IProps {
  commentApartment: IResponseApartmentComment[];
  apartmentId: string;
  ratings: IResponseRatingApartment | undefined;
}

export default function Comment({
  commentApartment,
  apartmentId,
  ratings,
}: IProps) {
  return (
    <div className="spacing_between_cpn_detail">
      <div className="flex gap-16 pb-8">
        <CommentLeft comments={commentApartment} apartmentId={apartmentId} />
        <CommentRight
          statisticalComments={ratings}
          totalCommens={commentApartment.length}
        />
      </div>
    </div>
  );
}
