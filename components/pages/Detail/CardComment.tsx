import Image from "next/image";

export default function CardComment() {
  return (
    <div className="card flex gap-6">
      {/* avatar */}
      <div className="">
        <div className="w-20 h-20 relative">
          <Image
            src="/avatar.png"
            alt="avatar"
            fill
            className="rounded-full shadow-md"
          />
        </div>
        <div className="mt-2 flex_center gap-2 p-1 border border-c-border rounded-lg cursor-pointer">
          <Image
            src="/edit_second.svg"
            alt="edit icon"
            width={16}
            height={16}
          />
          <span className="block text-second">2</span>
        </div>
      </div>
      {/* comment */}
      <div className="bg-[#f5f5f7] p-4 flex-1 rounded-xl">
        {/* heading */}
        <div className="flex items-center justify-between border-b border-c-border">
          <div className="pb-2">
            <h3 className="flex items-center text-primary text-xl gap-2">
              Quỳnh Anh{" "}
              <Image
                src="/tick_blue.svg"
                alt="tick icon"
                width={16}
                height={16}
              />
            </h3>
            <p className="text-second text-base">Đã đánh giá 2 năm trước</p>
          </div>
          <div className="flex_center relative group text-white font-medium text-base w-10 h-10 rounded-full bg-c-logo">
            5.0
            <div className="shadow_common z-10 absolute w-[230px] -top-[400%] left-0 p-6 transition-all hidden group-hover:block text-black bg-white rounded-md">
              <div>Vị trí</div>
              <div>Không gian</div>
              <div>Nội thất</div>
              <div>Giá cả</div>
            </div>
          </div>
        </div>

        {/* body */}
        <div className="pt-4">
          <p className="text-lg">
            🌸Xách ba lô lên và đi Đà Lạt, nhưng mà là Đà Lạt giữa lòng thủ đô
            ^^ ☕️Mình tình cờ biết về quán qua post của 1 bạn reviewer, thấy
            quán cũng xinh và hợp với đứa nghiện sống ảo như mình, nhưng đến tận
            nơi thì chưa hẳn đã như tưởng tượng… 🌵Mình chưa thấy quán nào chỉ
            order một cốc cà phê mà có tới một đống ảnh xinh xẻo, không gian
            rộng rãi thoáng đãng, nhiều cây xanh nữa. Đồ uống mình order là cà
            phê Sol, các bạn pha chế giới thiệu món này dành riêng cho các bạn
            nữ muốn thử vị cà phê pha máy kết hợp vs vị béo của kem.
          </p>
        </div>
      </div>
    </div>
  );
}
