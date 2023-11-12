"use client";

import Image from "next/image";
import CardComment from "./CardComment";
import Modal from "@/components/common/modal/Modal";
import useModal from "@/utils/hook/useModal";

export default function CommentLeft() {
  const { isOpen, closePopup, openPopup } = useModal();

  return (
    <>
      <div className="w-[65%] shadow-[rgba(0,0,0,0.12)_0px_6px_16px] rounded-2xl">
        <div className="p-4">
          <div className="flex items-center justify-between py-4">
            <h2 className="heading__detail_apartment text-3xl">
              Đánh giá từ cộng đồng <span>(3)</span>
            </h2>
            <button
              onClick={openPopup}
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
          <div className="border-t border-c-border grid grid-cols-1 gap-4 pt-4">
            <CardComment />
            <CardComment />
            <CardComment />
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
          <h2>Xếp hạng của bạn</h2>
          rate
        </div>

        <form>
          <div className="flex flex-col gap-2 pb-4">
            <h2>Đánh giá của bạn</h2>
            <input
              type="text"
              placeholder="Nhập tiêu đề đánh giá"
              className="border border-c-border"
            />
            <textarea
              name=""
              id=""
              rows={5}
              className="border border-c-border"
              placeholder="Nội dung đánh giá"
            ></textarea>
          </div>

          <div className="border-t border-c-border pt-4 text-right">
            <button className="text-white bg-c-logo py-2 px-3 rounded-lg text-lg font-semibold">
              Viết đánh giá
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
