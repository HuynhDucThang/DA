"use client";

import Image from "next/image";
import CardComment from "./CardComment";
import Modal from "@/components/common/modal/Modal";
import useModal from "@/utils/hook/useModal";
import { IComment } from "@/utils/interface";
import { useState } from "react";
import { ratings as ratingsDefined } from "@/utils/constant";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createApartmentCommentServer } from "@/utils/actions";
import { setModalType } from "@/redux/slices/modalSlice";
import { Loading } from "@/components/common";
import Stars from "./comment/stars";
import { showToast } from "@/utils/helpers/common";
import { useRouter } from "next/navigation";
import {
  IResponseApartmentComment,
  IResponseRatingApartment,
} from "@/utils/interface.v2";
import { createApartmentComment } from "@/utils/proxy";
import { toast } from "react-toastify";

interface IProps {
  comments: IResponseApartmentComment[];
  apartmentId: string;
}

export default function CommentLeft({ comments, apartmentId }: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, closePopup, openPopup } = useModal();
  const [ratings, setRatings] = useState<IResponseRatingApartment>({
    accuracy: 0,
    check_in: 0,
    cleanliness: 0,
    communication: 0,
    location: 0,
    totalScope: 0,
    value: 0,
  });

  const [commentContent, setCommentContent] = useState("");

  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);

  const handleUpdateRatings = (key: keyof typeof ratings, point: number) => {
    setRatings((pre) => ({ ...pre, [key]: point }));
  };

  const handleOnRating = async () => {
    if (!ratings) return;
    setIsLoading(true);

    try {
      await createApartmentComment({
        apartmentId,
        content: commentContent,
        rating: {
          ...ratings,
          totalScope: Object.values(ratings).reduce(
            (preValue, value) => preValue + value
          ),
        },
      });
      toast.success("Tạo bình luận thành công");
    } catch (error) {
      toast.error("Tạo bình luận thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="w-[65%] shadow-[rgba(0,0,0,0.12)_0px_6px_16px] rounded-2xl">
        <div className="p-4">
          <div className="flex items-center justify-between py-4">
            <h2 className="heading__detail_apartment text-2xl">
              Đánh giá từ cộng đồng <span>({comments.length})</span>
            </h2>
            <button
              onClick={() => {
                if (!currentUser._id) {
                  showToast("Hãy đăng nhập để sử dụng tính năng này", "error");
                  dispatch(setModalType("LOGIN"));
                  return;
                }
                openPopup();
              }}
              className="text-white bg-c-logo py-2 px-3 rounded-lg text-lg font-semibold"
            >
              Viết đánh giá
            </button>
          </div>

          <div className="bg-gradient-to-r from-[#ffb8b8] to-[#ffddd8] rounded-2xl">
            <div className="flex justify-between items-center gap-12 p-8">
              <div className="w-[250px] aspect-[1/1] relative">
                <Image src="/human_comment.svg" alt="" fill />
              </div>
              <div>
                <h4 className="heading__detail_apartment">
                  Bạn đã từng đến đây?
                </h4>
                <p className="mt-4">
                  Chia sẻ trải nghiệm và cảm nhận của bản thân cho mọi người
                  cùng biết nhé. Những review chất lượng sẽ được xuất hiện ở
                  bảng tin đấy!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* comments */}
        <div className="p-4">
          <div className="border-t border-c-grey grid grid-cols-1 gap-4 pt-4">
            {comments.length ? (
              comments.map((comment) => (
                <CardComment key={comment._id} comment={comment} />
              ))
            ) : (
              <div className="text-primary text-2xl font-medium text-center p-8">
                Hãy là người viết bài review đầu tiên.
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        handleCloseModal={closePopup}
        commonStyles="max-w-[700px]"
        title="Đánh giá Treeland - Coffee, Tea and More."
      >
        <div>
          <h2 className="sub_heading__detail_apartment">Xếp hạng của bạn</h2>
          <div>
            <div className="flex items-center justify-between px-6 mt-4">
              <span className="block min-w-[100px] text-left text-lg text-primary">
                Vị trí
              </span>
              <Stars
                isEdit={true}
                rating={ratings.accuracy}
                handleOnChangeRating={(point: number) => {
                  handleUpdateRatings("accuracy", point);
                }}
              />
              <div className="max-w-[150px] w-full text-center px-3 py-2 bg-c-logo">
                <span className="text-white font-medium text-lg">
                  {ratingsDefined[Math.floor(ratings.accuracy)]}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between px-6 mt-4">
              <span className="block min-w-[100px] text-left text-lg text-primary">
                Nội Thất
              </span>
              <Stars
                isEdit={true}
                rating={ratings.check_in}
                handleOnChangeRating={(point: number) => {
                  handleUpdateRatings("check_in", point);
                }}
              />
              <div className="max-w-[150px] w-full text-center px-3 py-2 bg-c-logo">
                <span className="text-white font-medium text-lg">
                  {ratingsDefined[Math.floor(ratings.check_in)]}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between px-6 mt-4">
              <span className="block min-w-[100px] text-left text-lg text-primary">
                Tiện nghi
              </span>
              <Stars
                isEdit={true}
                rating={ratings.cleanliness}
                handleOnChangeRating={(point: number) => {
                  handleUpdateRatings("cleanliness", point);
                }}
              />
              <div className="max-w-[150px] w-full text-center px-3 py-2 bg-c-logo">
                <span className="text-white font-medium text-lg">
                  {ratingsDefined[Math.floor(ratings.cleanliness)]}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between px-6 mt-4">
              <span className="block min-w-[100px] text-left text-lg text-primary">
                Giao tiếp
              </span>
              <Stars
                isEdit={true}
                rating={ratings.communication}
                handleOnChangeRating={(point: number) => {
                  handleUpdateRatings("communication", point);
                }}
              />
              <div className="max-w-[150px] w-full text-center px-3 py-2 bg-c-logo">
                <span className="text-white font-medium text-lg">
                  {ratingsDefined[Math.floor(ratings.communication)]}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between px-6 mt-4">
              <span className="block min-w-[100px] text-left text-lg text-primary">
                Địa điểm
              </span>
              <Stars
                isEdit={true}
                rating={ratings.location}
                handleOnChangeRating={(point: number) => {
                  handleUpdateRatings("location", point);
                }}
              />
              <div className="max-w-[150px] w-full text-center px-3 py-2 bg-c-logo">
                <span className="text-white font-medium text-lg">
                  {ratingsDefined[Math.floor(ratings.location)]}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between px-6 mt-4">
              <span className="block min-w-[100px] text-left text-lg text-primary">
                Giá trị
              </span>
              <Stars
                isEdit={true}
                rating={ratings.value}
                handleOnChangeRating={(point: number) => {
                  handleUpdateRatings("value", point);
                }}
              />
              <div className="max-w-[150px] w-full text-center px-3 py-2 bg-c-logo">
                <span className="text-white font-medium text-lg">
                  {ratingsDefined[Math.floor(ratings.value)]}
                </span>
              </div>
            </div>
          </div>
        </div>

        <form className="mt-6">
          <div className="flex flex-col gap-2 pb-4">
            <h2 className="sub_heading__detail_apartment">Đánh giá của bạn</h2>
            <textarea
              name=""
              id=""
              rows={5}
              className="border border-c-grey hover:border-c-logo transition shadow-md p-3 rounded-lg mt-2 outline-none resize-none min-h-[120px] max-h[220px] overflow-y-hidden"
              placeholder="Nội dung đánh giá"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            ></textarea>
          </div>

          <div className="border-t border-c-grey pt-4 text-right">
            <button
              className="text-white bg-c-logo py-2 px-3 rounded-lg text-lg font-semibold"
              onClick={handleOnRating}
            >
              {isLoading ? "Đang xử lý" : "Đánh giá"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
