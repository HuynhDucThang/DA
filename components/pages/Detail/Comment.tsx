import { getApartmentComments } from "@/utils/proxyServer";
import CommentLeft from "./CommentLeft";
import CommentRight from "./CommentRight";
import { IApartmentComment } from "@/utils/interface";

interface IProps {
  commentApartment: IApartmentComment;
  apartmentId: string;
}

export default async function Comment({
  commentApartment,
  apartmentId,
}: IProps) {
  const { comments, ...statisticalComments } = commentApartment;

  return (
    <div className="spacing_between_cpn_detail">
      <div className="flex gap-16 pb-8">
        <CommentLeft comments={comments} apartmentId={apartmentId} />
        <CommentRight
          statisticalComments={statisticalComments}
          totalCommens={comments.length}
        />
      </div>
    </div>
  );
}
