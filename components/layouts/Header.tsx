import Image from "next/image";
import FilterHeader from "./Header/FilterHeader";

const menuFilter = ["Địa điểm bất kỳ", "Tuần bất kỳ", "Thêm khách"];

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

          <div className="py-2 px-3 border border-solid rounded-3xl transition-shadow hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_6px] cursor-pointer">
            <div className="flex gap-4">
              <Image src="/header/menu.svg" className="text-red-800" alt="menu" height={24} width={24} />
              <div className="h-10 w-10 relative">
                <Image
                  src="/images/avatar.png"
                  alt="menu"
                  className="rounded-full object-contai"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
