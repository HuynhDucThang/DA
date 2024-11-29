import Modal from "@/components/common/modal/Modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeModalType } from "@/redux/slices/modalSlice";
import { CITY } from "@/utils/enum";
import {
  clearSearchParams,
  showToast,
  updateMutilpleSearchParams,
} from "@/utils/helpers/common";
import { IResponseApartmentAmenity } from "@/utils/interface.v2";
import { getAmenities, getApartments } from "@/utils/proxy";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";

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

const options = [
  { value: "0-500000", label: "0 - 500k" },
  { value: "500000-1000000", label: "500k - 1.000k" },
  { value: "1000000-1500000", label: "1.000k - 1.500k" },
  { value: "1500000-2000000", label: "1.500k - 2.000k" },
  { value: "2000000-2500000", label: "2.000k - 2.500k" },
  { value: "2500000-3000000", label: "2.500k - 3.000k" },
];

export default function ModalSearch() {
  const { typeModal } = useAppSelector((state) => state.modal);
  const [totalApartment, setTotalApartment] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [searchParams, setSearchParams] = useState({
    city: "",
    lowest_price: 100000,
    hightest_price: 5000000,
    apartment_type: "",
    amenities: [] as string[],
    
  });
  
  const [amenities, setAmenities] = useState<IResponseApartmentAmenity[]>([]);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const params = useSearchParams();
  const tagId = params.get("tag");

  useEffect(() => {
    const getApartmentFilter = async () => {
      try {
        const objectChecked = checkValuesIsExistInObject({
          ...searchParams,
          tag: tagId,
          isApproved: true,
        });

        const { data } = await getApartments(objectChecked);

        if (data?.payload) setTotalApartment(data?.payload?.length);
      } catch (error) {
        console.log(error);
      } finally {
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
      const find = prevCheckboxState?.amenities?.findIndex(
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

      if (
        (!value && value !== 0) ||
        (typeof value === "string" && value === "")
      ) {
        delete searchParams[key as keyof typeof searchParams];
      }
    });

    const params = updateMutilpleSearchParams(searchParams);
    router.replace(params, { scroll: false });
  };

  const handleClearAllSearchParams = () => {
    router.replace(clearSearchParams(Object.keys(searchParams)), {
      scroll: false,
    });
  };

  return (
    <Modal
      isOpen={typeModal === "SEARCH" ? true : false}
      handleCloseModal={() => dispatch(removeModalType())}
      commonStyles="max-w-[760px]"
      title="Tìm kiếm căn hộ"
    >
      <div className="max-h-[80vh] overflow-y-auto -mr-4 px-2">
        <Container
          title="Khoảng giá"
          desc="Giá theo đêm chưa bao gồm phí và thuế"
        >
          <Select
            className="z-10 h-12"
            onChange={(data: SingleValue<{ value: string; label: string }>) => {
              if (!data?.value) return;

              try {
                const value: any = data.value;
                const prices = value.split("-");

                if (
                  prices.length < 2 ||
                  isNaN(+prices[0]) ||
                  isNaN(+prices[1])
                ) {
                  throw new Error("Giá trị tiền không chính xác");
                }

                setSearchParams((pre) => ({
                  ...pre,
                  lowest_price: +prices[0],
                  hightest_price: +prices[1],
                }));
              } catch (error: any) {
                showToast(error.message, "error");
              }
            }}
            isSearchable={true}
            placeholder="Khoảng giá"
            options={options}
          />
        </Container>
        <Container title="Quận" desc="Tên quận mà bạn muốn đến.">
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
                Chọn quận
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
            {amenities?.map((amenity, index) => (
              <label
                className="flex item-center gap-3 cursor-pointer"
                key={index}
              >
                <input
                  type="checkbox"
                  name={`item2-${index}`}
                  value={amenity.name}
                  checked={searchParams?.amenities?.includes(amenity._id)}
                  onChange={() => handleCheckboxChange(amenity._id)}
                  className="w-6 h-6"
                />
                <span className="text-lg">{amenity.name}</span>
              </label>
            ))}
          </div>
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
