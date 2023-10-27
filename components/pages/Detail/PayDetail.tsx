import Image from "next/image";

export default function PayDetail() {
  return (
    <div className="w-[30%] ">
      <div className="w-full border rounded-lg shadow-[rgba(0,0,0,0.12)_0px_6px_16px]">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h4 className="text-3xl font-semibold text-primary">$147</h4>
              <span className="text-second text-xl">/đêm</span>
            </div>

            <div className="flex items-center gap-1">
              <Image
                src="/star.svg"
                alt="arrow_bottom"
                width={20}
                height={20}
              />
              <span>5,0</span>
              <Image src="/dot.svg" alt="arrow_bottom" width={10} height={10} />
              <span className="text-second text-base">6 đánh giá</span>
            </div>
          </div>

          {/* buttun */}
          <div className="bg-[#dc0e64] flex_center rounded-lg py-4 mt-4 cursor-pointer">
            <div className="text-xl font-semibold text-white ">Đặt phòng</div>
          </div>

          {/* fee */}
          <div className="py-6">
            <div className="flex justify-between mt-2">
              <p className="text-primary text-xl">Phí</p>
              <p className="text-primary text-xl">Tổng</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-second text-xl underline">$178 x 2 đêm</p>
              <p className="text-second text-xl">$365</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-second text-xl underline">Phí vệ sinh</p>
              <p className="text-second text-xl">$68</p>
            </div>
          </div>

          <div className="flex justify-between mt-2 pt-3 border-t-2 border-c-border">
            <p className="text-primary text-xl">Tổng trước thuế</p>
            <p className="text-primary text-xl">$424</p>
          </div>

          {/*  */}
        </div>
      </div>
    </div>
  );
}
