import CommentLeft from "./CommentLeft";
import CommentRight from "./CommentRight";

export default function Comment() {
  return (
    <div className="spacing_between_cpn_detail">
      <div className="flex gap-16 pb-8">
        <CommentLeft />
        <CommentRight />
      </div>
    </div>
  );
}
