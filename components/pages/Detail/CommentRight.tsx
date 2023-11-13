import { ratings } from "@/utils/constant";
import { IStatisticalComment } from "@/utils/interface";
import Image from "next/image";

interface IProps {
  statisticalComments: IStatisticalComment;
  totalCommens: number;
}

export default function CommentRight({
  statisticalComments,
  totalCommens,
}: IProps) {
  const {
    total_rate_amenities,
    total_rate_location,
    total_rate_price,
    total_rate_interior,
  } = statisticalComments;

  const totalRating = Math.floor(
    (total_rate_amenities +
      total_rate_location +
      total_rate_interior +
      total_rate_price) /
      4
  );

  return (
    <div className="w-[35%] bg-white">
      <div className="sticky top-12">
        <div className="w-full border shadow_common rounded-xl">
          <div className="p-4 ">
            {/* title */}
            <div className="flex_center gap-2">
              <div className="bg-c-logo p-2 rounded-xl text-4xl font-semibold text-white">
                4.8
              </div>
              <div>
                <h2 className="heading__detail_apartment">
                  {ratings[totalRating]}
                </h2>
                <div>
                  <span className="text-xl">/5</span>{" "}
                  <span>
                    ({totalCommens > 0 ? totalCommens : "Chưa có"} đánh giá)
                  </span>
                </div>
              </div>
            </div>

            {/* rate */}

            <div className="mt-6">
              <RateItem title="Vị trí" point={total_rate_location} />
              <RateItem title="Tiện Nghi" point={total_rate_amenities} />
              <RateItem title="Nội thất" point={total_rate_interior} />
              <RateItem title="Giá cả" point={total_rate_price} />
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 shadow_common">
          <div className="relative w-full aspect-[1/1]">
            <Image src="/vutru.png" alt="vu tru image" fill />
          </div>
        </div>
      </div>
    </div>
  );
}

interface IRateItem {
  title: string;
  point: number;
}

function RateItem({ title, point }: IRateItem) {
  const covertToPercent = (+point / 5) * 100;
  return (
    <div className="flex items-center mb-3">
      <div className="flex-[0_1_120px] text-primary text-lg">{title}</div>
      <div className="flex-1 h-3 rounded-lg relative bg-c-grey overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full rounded-lg bg-c-logo transition-colors"
          style={{ width: `${covertToPercent}%` }}
        ></div>
      </div>
      <p className="text-primary font-medium w-12 text-right text-lg">
        {point}
      </p>
    </div>
  );
}
