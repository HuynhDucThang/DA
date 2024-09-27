import { URL } from "@/utils/api";
import { handleConvertDate } from "@/utils/helpers/common";
import { IComment } from "@/utils/interface";
import Image from "next/image";
import Stars from "./comment/stars";
import Link from "next/link";
import Desc from "./Desc";
import { IResponseApartmentComment } from "@/utils/interface.v2";

interface IProps {
  comment: IResponseApartmentComment;
}

export default function CardComment({ comment }: IProps) {
  return (
    <div className="card flex gap-6">
      {/* avatar */}
      <div className="">
        <Link
          href={`/users/${123}`}
          className="block w-20 h-20 relative"
        >
          <Image
            src={"/avatar.png"}
            alt="avatar"
            fill
            className="rounded-full shadow-md"
          />
        </Link>
        <div className="mt-2 flex_center gap-2 p-1 border border-c-grey rounded-lg cursor-pointer">
          <Image
            src="/edit_second.svg"
            alt="edit icon"
            width={16}
            height={16}
          />
          <span className="block text-second">1</span>
        </div>
      </div>
      {/* comment */}
      <div className="bg-[#f5f5f7] p-4 flex-1 rounded-xl">
        {/* heading */}
        <div className="flex items-center justify-between border-b border-c-grey">
          <div className="pb-2">
            <h3 className="flex items-center text-primary text-xl gap-2">
              {"comment.user.username"}
              <Image
                src="/tick_blue.svg"
                alt="tick icon"
                width={16}
                height={16}
              />
            </h3>
            <p className="text-second text-base">
              Đánh giá vào khoảng{" "}
              {handleConvertDate(new Date(comment.created_at))}
            </p>
          </div>
          <div className="flex_center relative group text-white font-medium text-base w-10 h-10 rounded-full bg-c-logo">
            {comment.raing.totalScope}
            <div className="shadow_common z-10 absolute w-[300px] -top-[400%] left-0 p-6 transition-all hidden group-hover:block text-black bg-white rounded-md">
              <div className="flex items-center gap-4">
                <span className="flex-[0_1_100px]">Vị trí</span>
                <Stars
                  rating={comment.raing.location}
                  commonStyles="gap-1"
                  stylesStar="w-6 h-6"
                />
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex-[0_1_100px]">Tiện nghi</span>
                <Stars
                  rating={comment.raing.check_in}
                  commonStyles="gap-1"
                  stylesStar="w-6 h-6"
                />
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex-[0_1_100px]">Nội thất</span>
                <Stars
                  rating={comment.raing.accuracy}
                  commonStyles="gap-1"
                  stylesStar="w-6 h-6"
                />
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex-[0_1_100px]">Giá cả</span>
                <Stars
                  rating={comment.raing.communication}
                  commonStyles="gap-1"
                  stylesStar="w-6 h-6"
                />
              </div>
            </div>
          </div>
        </div>

        {/* body */}
        <div className="">
          <Desc text={comment.content} />
          <span className="pt-4 block">🌸☕️🌵</span>
        </div>
      </div>
    </div>
  );
}
