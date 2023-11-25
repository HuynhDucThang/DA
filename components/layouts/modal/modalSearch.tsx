import { BtnCommon, Login } from "@/components/common";
import LoadingSearch from "@/components/common/loadingSearch";
import Modal from "@/components/common/modal/Modal";
import RangeSlider from "@/components/common/slider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeModalType } from "@/redux/slices/modalSlice";
import { CITY } from "@/utils/enum";
import {
  updateMutilpleSearchParams,
  updateSearchParams,
} from "@/utils/helpers/common";
import { IAmenityRead } from "@/utils/interface";
import { getAmenities, getApartmentsLocal } from "@/utils/proxy";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
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
  const [amenities, setAmenities] = useState<IAmenityRead[]>([]);
  const { typeModal } = useAppSelector((state) => state.modal);
  const [totalApartment, setTotalApartment] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState({
    city: "",
    lowest_price: 0,
    hightest_price: 0,
    apartment_type: "",
  });

  const dispatch = useAppDispatch();

  const router = useRouter();

  const [checkboxState, setCheckboxState] = useState<number[]>([]);

  const params = useSearchParams();
  const tagId = params.get("tagId");

  useEffect(() => {
    const getApartmentFilter = async () => {
      setIsLoading(true);
      try {
        const { data } = await getApartmentsLocal({
          ...searchParams,
          tag_id: tagId,
        });
        setTotalApartment(data?.data?.length);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getApartmentFilter();
  }, [searchParams, tagId]);

  useEffect(() => {
    const getAmenitiesFilter = async () => {
      try {
        const { data } = await getAmenities();
        setAmenities(data.data);
      } catch (error) {}
    };
    getAmenitiesFilter();
  }, []);

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
      commonStyles="max-w-[760px]"
      title="Tìm kiếm căn hộ"
    >
      <div className="h-[60vh] overflow-y-auto -mr-4 px-2">
        <Container title="Thành phố" desc="Tên thành phố mà bạn muốn đến.">
          <label
            htmlFor="city"
            className="border border-c-grey rounded-lg flex items-center justify-between"
          >
            <select
              id="city"
              value={searchParams.city}
              onChange={handleSelectChange}
              className="outline-none w-full p-4 overflow-hidden rounded-xl"
            >
              <option value="" className="text-lg block p-4" disabled hidden>
                Chọn thành phố
              </option>
              {Object.keys(CITY).map((key) => (
                <option key={key} value={key} className="text-lg block p-2">
                  {CITY[key as keyof typeof CITY]}
                </option>
              ))}
            </select>
          </label>
        </Container>

        {/*  */}
        <Container
          title="Loại nơi ở "
          desc="Tìm phòng, nhà nguyên căn hoặc bất kỳ loại chỗ ở nào."
        >
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
        </Container>

        {/*  */}
        <Container title="Tiện nghi " desc="Đồ dùng thiết yếu và vật dụng khác">
          <div className="mt-6 grid grid-cols-2 gap-4">
            {amenities.map((amenity, index) => (
              <label
                className="flex item-center gap-3 cursor-pointer"
                key={index}
              >
                <input
                  type="checkbox"
                  name={`item2-${index}`}
                  checked={checkboxState.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                  className="w-6 h-6"
                />
                <span className="text-lg">{amenity.name}</span>
              </label>
            ))}
          </div>
        </Container>

        {/*  */}
        <Container
          title="Khoảng giá"
          desc="Giá theo đêm chưa bao gồm phí và thuế"
        >
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
        </Container>

        <div className="sticky bottom-0">
          <BtnCommon
            title={`Tìm kiếm căn hộ (${
              isLoading ? "...đang tải..." : totalApartment
            })`}
            handleClick={handleFilterApartments}
          />
        </div>
      </div>
    </Modal>
  );
}

interface IContainer {
  children: React.ReactNode;
  title: string;
  desc: string;
}

function Container({ children, desc, title }: IContainer) {
  return (
    <div className="py-4 border-b border-c-grey">
      <h2 className="text-2xl text-txt-primary font-semibold">{title}</h2>
      <p className="text-xl text-second font-medium mb-6">{desc}</p>

      {children}
    </div>
  );
}
