import Image from "next/image";

export default function FooterDetail() {
  return (
    <div className="flex items-center justify-between border-t border-c-border spacing_between_cpn_detail">
      <div className="flex gap-3">
        <p className="text-lg">© 2023 Airbnb, Inc.</p>
        <Image src="/dot.svg" alt="dot icon" width={10} height={10} />
        <p className="text-lg">Quyền riêng tư</p>
        <Image src="/dot.svg" alt="dot icon" width={10} height={10} />
        <p className="text-lg">Điều khoản</p>
        <Image src="/dot.svg" alt="dot icon" width={10} height={10} />
        <p className="text-lg">Sơ đồ trang web</p>
      </div>
      <div className="flex">
        <Image src="/header/world.svg" alt="dot icon" width={20} height={20} />
        <p className="text_card_heading">Tiếng Việt (VN)</p>
        <p className="text_card_heading">$ USD</p>
      </div>
    </div>
  );
}
