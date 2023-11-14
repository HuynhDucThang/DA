import { getApartmentComments } from "@/utils/proxyServer";
import CommentLeft from "./CommentLeft";
import CommentRight from "./CommentRight";
import { IApartmentComment } from "@/utils/interface";

interface IProps {
  apartmentId: string;
}

export default async function Comment({ apartmentId }: IProps) {
  const { data } = await getApartmentComments(apartmentId);
  const { comments, ...statisticalComments } = data.data as IApartmentComment;

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
