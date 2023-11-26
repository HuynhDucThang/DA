import { BtnCommon, Login } from "@/components/common";
import LoadingSearch from "@/components/common/loadingSearch";
import Modal from "@/components/common/modal/Modal";
import RangeSlider from "@/components/common/slider";
import SliderC from "@/components/common/slider/slider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeModalType } from "@/redux/slices/modalSlice";
import { CITY } from "@/utils/enum";
import {
  clearAllSearchParams,
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
  const { typeModal } = useAppSelector((state) => state.modal);
  const [totalApartment, setTotalApartment] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState({
    city: "",
    lowest_price: 1,
    hightest_price: 5000,
    apartment_type: "",
    amenities: [] as string[],
  });
  const [amenities, setAmenities] = useState<IAmenityRead[]>([]);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const params = useSearchParams();
  const tagId = params.get("tagId");

  useEffect(() => {
    const getApartmentFilter = async () => {
      setIsLoading(true);
      try {
        const objectChecked = checkValuesIsExistInObject({
          ...searchParams,
          tag_id: tagId,
        });

        const { data } = await getApartmentsLocal(objectChecked);
        setTotalApartment(data?.data?.length);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getApartmentFilter();
  }, [searchParams, tagId]);

  const checkValuesIsExistInObject = (object: any) => {
    Object.keys(object).forEach((key) => {
      const value = object[key as keyof typeof object];

      if (Array.isArray(value) && value.length === 0) {
        delete object[key as keyof typeof object];
      }

      if (!value || (typeof value === "string" && value === "")) {
        delete object[key as keyof typeof object];
      }
    });
    return object;
  };

  useEffect(() => {
    const getAmenitiesFilter = async () => {
      try {
        const { data } = await getAmenities();
        setAmenities(data.data);
      } catch (error) {}
    };
    getAmenitiesFilter();
  }, []);

  const handleCheckboxChange = (amenityValue: string) => {
    setSearchParams((prevCheckboxState) => {
      const find = prevCheckboxState.amenities.findIndex(
        (amenity) => amenity === amenityValue
      );

      let newAmenities: string[] = [...prevCheckboxState.amenities];

      if (find !== -1) {
        newAmenities = newAmenities.filter(
          (amenity) => amenity !== amenityValue
        );
      } else {
        newAmenities.push(amenityValue);
      }

      return { ...prevCheckboxState, amenities: newAmenities };
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams((pre) => ({ ...pre, city: event.target.value }));
  };

  const handleFilterApartments = () => {
    Object.keys(searchParams).forEach((key) => {
      const value = searchParams[key as keyof typeof searchParams];

      if (Array.isArray(value) && value.length === 0) {
        delete searchParams[key as keyof typeof searchParams];
      }

      if (!value || (typeof value === "string" && value === "")) {
        delete searchParams[key as keyof typeof searchParams];
      }
    });

    const params = updateMutilpleSearchParams(searchParams);
    router.replace(params, { scroll: false });
  };

  const handleClearAllSearchParams = () => {
    const params = clearAllSearchParams();
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
                onClick={() => {
                  setSearchParams((pre) => ({
                    ...pre,
                    apartment_type: type.key,
                  }));
                }}
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
                  value={amenity.name}
                  checked={searchParams.amenities.includes(amenity.name)}
                  onChange={() => handleCheckboxChange(amenity.name)}
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
          <SliderC
            min={1}
            max={5000}
            values={[searchParams.lowest_price, searchParams.hightest_price]}
            handleChange={(newValue: number[]) =>
              setSearchParams((pre) => ({
                ...pre,
                lowest_price: newValue[0],
                hightest_price: newValue[1],
              }))
            }
          />
        </Container>

        <div className="sticky bottom-0 z-20 pt-4 bg-white shadow-lg -ml-4 pl-4">
          <div className="flex w-full justify-between items-center">
            <div
              className="text-txt-primary text-xl font-semibold underline p-3 rounded-xl transition-all hover:bg-slate-100 cursor-pointer"
              onClick={handleClearAllSearchParams}
            >
              Xoá tất cả
            </div>

            <div
              className="text-white py-4 px-6 bg-[#222222] hover:bg-black hover:shadow-lg transition-all duration-500 rounded-xl w-fit text-xl font-medium cursor-pointer"
              onClick={handleFilterApartments}
            >
              {`Hiển thị (${totalApartment}) địa điểm`}
            </div>
          </div>
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
