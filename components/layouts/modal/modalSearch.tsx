import { BtnCommon, Login } from "@/components/common";
import Modal from "@/components/common/modal/Modal";
import RangeSlider from "@/components/common/slider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeModalType } from "@/redux/slices/modalSlice";
import { CITY } from "@/utils/enum";
import {
  updateMutilpleSearchParams,
  updateSearchParams,
} from "@/utils/helpers/common";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DATA_APARTMENT_TYPE = [
  {
    key: "STUDIO",
    name: "Studio",
    icon: "/filter/house.svg",
  },
  {
    key: "HOUSE",
    name: "Nhà",
    icon: "/filter/studio.svg",
  },
  {
    key: "CONDO",
    name: "Chung cư",
    icon: "/filter/condo.svg",
  },
];

export default function ModalSearch() {
  const { typeModal } = useAppSelector((state) => state.modal);

  const [searchParams, setSearchParams] = useState({
    city: "",
    lowest_price: 0,
    hightest_price: 0,
    apartment_type: "",
  });

  const dispatch = useAppDispatch();

  const router = useRouter();

  const [checkboxState, setCheckboxState] = useState<number[]>([]);

  const handleCheckboxChange = (index: number) => {
    setCheckboxState((prevCheckboxState) => {
      const find = prevCheckboxState.includes(index);
      let newState = [...prevCheckboxState];

      if (find) {
        newState = newState.filter((item) => item !== index);
      } else {
        newState.push(index);
      }
      return newState;
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams((pre) => ({ ...pre, city: event.target.value }));
  };

  const [typeApartment, setTypeApartment] = useState<string>("");

  const handleSliderChange = (event: any) => {
    const { name, value } = event.target;

    setSearchParams((prevRange) => ({
      ...prevRange,
      [name]: parseInt(value, 10),
    }));
  };

  const handleFilterApartments = () => {
    Object.keys(searchParams).forEach((key) => {
      if (!searchParams[key as keyof typeof searchParams]) {
        delete searchParams[key as keyof typeof searchParams];
      }
    });

    const params = updateMutilpleSearchParams(searchParams);
    router.replace(params, { scroll: false });
  };

  return (
    <Modal
      isOpen={typeModal === "SEARCH" ? true : false}
      handleCloseModal={() => dispatch(removeModalType())}
      commonStyles="max-w-[700px]"
      title="Tìm kiếm căn hộ"
    >
      <div className="h-[60vh] overflow-y-auto -mr-4 px-2">
        <div className="py-4">
          <h2>Thành phố</h2>
          <p>Tên thành phố mà bạn muốn đến.</p>

          <label htmlFor="city" className="border border-c-grey rounded-lg">
            <select
              id="city"
              value={searchParams.city}
              onChange={handleSelectChange}
              className="outline-none"
            >
              <option value="" disabled hidden>
                Chọn thành phố
              </option>
              {Object.keys(CITY).map((key) => (
                <option key={key} value={key}>
                  {CITY[key as keyof typeof CITY]}
                </option>
              ))}
            </select>
          </label>
        </div>
        {/*  */}
        <div className="py-4">
          <h2>Loại nơi ở</h2>
          <p>Tìm phòng, nhà nguyên căn hoặc bất kỳ loại chỗ ở nào.</p>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {DATA_APARTMENT_TYPE.map((type, index) => (
              <div
                key={index}
                className={`rounded-xl border border-c-grey flex flex-col gap-8 items-center justify-center aspect-[2/1.3] transition-all cursor-pointer ${
                  type.key === searchParams.apartment_type && "bg-slate-300"
                }`}
                onClick={() =>
                  setSearchParams((pre) => ({
                    ...pre,
                    apartment_type: type.key,
                  }))
                }
              >
                <Image src={type.icon} alt="TV" width={30} height={30} />
                <p className="text-lg font-semibold text-primary">
                  {type.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-c-grey py-4">
          <h2>Tiện nghi </h2>
          <p>Đồ dùng thiết yếu và vật dụng khác</p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <label className="block w-1/2" key={index}>
                <input
                  type="checkbox"
                  name={`item2-${index}`}
                  checked={checkboxState.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                />
                {index}
              </label>
            ))}
          </div>

          {/*  */}
        </div>

        <div className="border-t border-c-grey py-4">
          <h2>Khoảng giá</h2>
          <p>Giá theo đêm chưa bao gồm phí và thuế</p>

          <div>
            <label htmlFor="">Giá Thấp Nhất</label>
            <input
              type="range"
              min={0}
              max={1000}
              step={1}
              value={searchParams.lowest_price}
              onChange={handleSliderChange}
              name="lowest_price"
            />
          </div>

          <div>
            <label htmlFor="">Giá Cao nhất</label>
            <input
              type="range"
              min={0}
              max={1000}
              step={1}
              value={searchParams.hightest_price}
              onChange={handleSliderChange}
              name="hightest_price"
            />
          </div>
        </div>

        <BtnCommon title="Tìm kiếm" handleClick={handleFilterApartments} />
      </div>
    </Modal>
  );
}
