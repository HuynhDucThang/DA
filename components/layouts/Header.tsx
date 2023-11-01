import Image from "next/image";
import FilterHeader from "./Header/FilterHeader";
import HeaderUserInfor from "./Header/UserHeaderInfor";

export default function Header() {
  return (
    <div className="px-[var(--padding-main)] border-b-2 flex items-center justify-between">
      <div className="flex items-center h-[var(--header-height)] flex-1">
        {/* logo */}
        <div className="relative w-[102px] h-[32px]">
          <Image src="/images/logo.png" alt="logo" fill />
        </div>
      </div>

      {/* search */}
      <FilterHeader />

      {/* right  */}
      <div className="flex justify-end flex-[1_0_140px] ">
        <div className="flex">
          <div className="flex items-center">
            <p className="text-primary hover:bg-[#f7f7f7] rounded-2xl transition-colors p-3">
              Cho thuê chỗ ở qua Airbnb
            </p>
            <div className="w-12 h-12 rounded-full hover:bg-[#f7f7f7] transition-colors flex justify-center items-center">
              <Image
                src="/header/world.svg"
                alt="world icon"
                width={24}
                height={24}
              />
            </div>
          </div>

          <HeaderUserInfor />
        </div>
      </div>
    </div>
  );
}
