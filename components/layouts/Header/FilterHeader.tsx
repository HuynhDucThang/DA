import { useAppDispatch } from "@/redux/hooks";
import { setModalType } from "@/redux/slices/modalSlice";
import Image from "next/image";

const menuFilter = ["Địa điểm bất kỳ", "Tuần bất kỳ", "Thêm khách"];

export default function FilterHeader() {
  const dispatch = useAppDispatch();
  return (
    <div className="px-4" onClick={() => dispatch(setModalType("SEARCH"))}>
      <div className="min-w-[350px] flex-[0_1_auto] flex h-[var(--height-input)] p-2 rounded-3xl cursor-pointer shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-shadow hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_12px]">
        {menuFilter.map((menu, index) => (
          <div
            key={index}
            className={`flex items-center ${
              index === 2 ? "pl-4 pr-1" : "px-4"
            } min-w-[var(--header-height)] line-clamp-1 text-primary ${
              index === 1 && "border-x-2"
            }`}
          >
            {menu}
            {index === 2 ? (
              <div className="w-8 h-8 flex_center bg-[var(--color-logo)] rounded-full ml-2">
                <Image
                  src="/search/search_white.svg"
                  alt="search icon"
                  width={24}
                  height={24}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
