"use client";

import { BtnCommon, Loading } from "@/components/common";
import RangeCalendar from "@/components/common/calendar/rangeCalendar";
import ModalAbs from "@/components/common/modal/ModalAbs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeDate, setDates } from "@/redux/slices/booking";
import { setModalType } from "@/redux/slices/modalSlice";
import { RootState } from "@/redux/store";
import {
  clearAllSearchParams,
  convertStringToFloat,
  handleConvertDate,
  showToast,
} from "@/utils/helpers/common";
import useModal from "@/utils/hook/useModal";
import { IApartmentRead } from "@/utils/interface";
import { IResponseApartment } from "@/utils/interface.v2";
import {
  createContract,
  getContractsByApartment,
  redirectToVnPay,
  updateContract,
} from "@/utils/proxy";

import Image from "next/image";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const dataNumberEnteredHouse = [
  {
    title: "Người lớn",
    desc: "Từ 13 tuổi trở lên",
    key: "adult",
  },
  {
    title: "Trẻ em",
    desc: "Độ tuổi 2 - 12",
    key: "young",
  },
  {
    title: "Em bé",
    desc: "Dưới 2 tuổi",
    key: "baby",
  },
  {
    title: "Thú cưng",
    desc: "Cho phép mang theo",
    key: "pet",
  },
];

type TYPE_ENTERD_HOUSE = "adult" | "young" | "baby" | "pet";

interface IProps {
  apartmentDetail: IResponseApartment;
}

export default function PayDetail({ apartmentDetail }: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [numberEnteredHouse, setNumberEnteredHouse] = useState<
    Record<TYPE_ENTERD_HOUSE, number>
  >({
    adult: 2,
    young: 0,
    baby: 0,
    pet: 0,
  });

  const { isOpen, typePopup, closePopup, openPopup } = useModal<
    "start-day" | "end-day" | "number-people"
  >();

  const { currentUser } = useAppSelector((state: RootState) => state.user);
  const { start_date, end_date } = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();
  const params = useParams();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const router = useRouter();

  const resVnPay = searchParams.get("vnp_ResponseCode");
  const contractId = searchParams.get("vnp_OrderInfo");

  useEffect(() => {
    const getContractsApartment = async () => {
      setIsLoading(true);
      try {
        const { data } = await getContractsByApartment(apartmentDetail._id);
        dispatch(setDates(data.data));
      } catch (error) {
        console.log("errpr");
      } finally {
        setIsLoading(false);
      }
    };
    getContractsApartment();
  }, []);

  useEffect(() => {
    if (!resVnPay || !contractId) return;

    const updateStatusContract = async () => {
      try {
        await updateContract(contractId, {
          status: resVnPay === "00" ? "success" : "fail",
        });
        const searchs = clearAllSearchParams();
        router.replace(searchs);
        showToast(`Bạn đã tạo hợp đồng thành công`, "success");
      } catch (error) {
        console.log(error);
        showToast(`Hợp đồng của bạn đã thất bại`, "error");
      }
    };
    updateStatusContract();
  }, []);

  const totalDay =
    end_date && start_date
      ? new Date(end_date).getDate() - new Date(start_date).getDate() ?? null
      : 0;

  const pricePerNight = convertStringToFloat(apartmentDetail.pricePerNight);

  const totalAmount = 45 + 30 + totalDay * (pricePerNight ?? 0);

  const totalPeople = useMemo(() => {
    let total = 0;
    for (const key in numberEnteredHouse) {
      total += numberEnteredHouse[key as TYPE_ENTERD_HOUSE];
    }

    return total;
  }, [numberEnteredHouse]);

  const handleBooking = async () => {
    if (!currentUser.id) {
      showToast(`"Hãy đăng nhập trước nhé`, "error");
      dispatch(setModalType("LOGIN"));
      return;
    }

    if (!start_date || !end_date) {
      showToast(`Hãy chọn ngày đặt lịch`, "error");

      return;
    }
    setIsLoading(true);
    try {
      const { data } = await createContract({
        apartment_id: params.apartmentId as string,
        user_id: currentUser.id,
        content: `${
          currentUser.username
        } đặt phòng trong khoảng thời gian ${handleConvertDate(
          start_date
        )} - ${handleConvertDate(end_date)}`,
        end_date: end_date,
        start_date: start_date,
        total_amount: totalAmount,
        num_of_people: totalPeople,
      });

      // setNumberEnteredHouse({
      //   adult: 2,
      //   young: 0,
      //   baby: 0,
      //   pet: 0,
      // });
      // dispatch(setDate(data));
      console.log("data.id : ", data.id);

      await handlePayment(data.id);

      showToast(`Thành công`);
    } catch (error) {
      showToast(`Lỗi`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async (contractId: string) => {
    console.log("data.id : ", contractId);

    setIsLoading(true);
    try {
      const { data } = await redirectToVnPay(totalAmount, pathName, contractId);
      console.log("data : ", data);
      if (data) {
        window.location.replace(data);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPeople = (key: keyof typeof numberEnteredHouse) => {
    setNumberEnteredHouse((pre) => ({ ...pre, [key]: pre[key] + 1 }));
  };

  const handleSubtractPeople = (key: keyof typeof numberEnteredHouse) => {
    setNumberEnteredHouse((pre) => ({ ...pre, [key]: pre[key] - 1 }));
  };

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="w-[35%]">
        <div className="w-full sticky top-[15%]">
          <div className="p-6 border rounded-lg shadow_common">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h4 className="text-3xl font-semibold text-primary">
                  ${apartmentDetail.pricePerNight}
                </h4>
                <span className="text-second text-xl">/đêm</span>
              </div>

              <div className="flex items-center gap-1">
                <Image
                  src="/star.svg"
                  alt="arrow_bottom"
                  width={20}
                  height={20}
                />
                <span>{apartmentDetail.rating?.totalScope}</span>
                <Image
                  src="/dot.svg"
                  alt="arrow_bottom"
                  width={10}
                  height={10}
                />
                <span className="text-second text-base">6 đánh giá</span>
              </div>
            </div>

            {/* choose */}
            <div className="border border-c-border my-4 rounded-lg">
              {/* top */}
              <div className="grid grid-cols-2 relative">
                <div
                  className={`p-3 ${
                    typePopup === "start-day" &&
                    "border-[3px] border-primary rounded-lg"
                  }`}
                  onClick={() => openPopup("start-day")}
                >
                  <p className="text_filter_apartment">Nhận phòng</p>
                  <div className="text-second text-lg font-medium">
                    {start_date
                      ? handleConvertDate(start_date, "dd/MM/yyyy")
                      : "Chọn Ngày"}
                  </div>
                </div>
                <div
                  className={`p-3 ${
                    typePopup === "end-day"
                      ? "border-[3px] border-primary rounded-lg"
                      : "border-l border-c-border"
                  }`}
                  onClick={() => openPopup("end-day")}
                >
                  <p className="text_filter_apartment">Trả phòng</p>
                  <div className="text-second text-lg font-medium">
                    {end_date
                      ? handleConvertDate(end_date, "dd/MM/yyyy")
                      : "Chọn Ngày"}
                  </div>
                </div>

                <ModalAbs
                  isOpen={isOpen && typePopup !== "number-people"}
                  parentStyles="top-[50%] right-0"
                  subParentStyles="w-auto p-4"
                >
                  <RangeCalendar />
                  <div className="mt-4 flex gap-5 justify-end items-center">
                    <div
                      className="text-primary underline cursor-pointer"
                      onClick={() => dispatch(removeDate())}
                    >
                      Xoá ngày
                    </div>
                    <div
                      className="text-white bg-black p-3 cursor-pointer rounded-md"
                      onClick={closePopup}
                    >
                      Đóng
                    </div>
                  </div>
                </ModalAbs>
              </div>
              {/* bottom number people */}
              <div
                className={`relative p-3  ${
                  typePopup === "number-people"
                    ? "border-[3px] border-primary rounded-lg"
                    : "border-t border-c-border"
                }`}
              >
                <div
                  className="flex items-center justify-between "
                  onClick={() =>
                    isOpen && typePopup === "number-people"
                      ? closePopup()
                      : openPopup("number-people")
                  }
                >
                  <div className="">
                    <p className="text_filter_apartment">Số khách</p>
                    <div className="text-second text-lg font-medium">
                      {totalPeople} Khách
                    </div>
                  </div>
                  <Image
                    src="/arrow/arrow_bottom.svg"
                    alt="arrow_bottom"
                    width={24}
                    height={24}
                  />
                </div>

                <ModalAbs
                  isOpen={isOpen && typePopup === "number-people"}
                  parentStyles="w-full top-[105%] right-0 rounded-sm"
                  subParentStyles="w-full p-4"
                >
                  {dataNumberEnteredHouse.map((data) => (
                    <div
                      key={data.key}
                      className="flex items-center justify-between p-2"
                    >
                      <div>
                        <h2 className="text-xl font-semibold text-primary">
                          {data.title}
                        </h2>
                        <p className="text_card_heading">{data.desc}</p>
                      </div>
                      <div className="flex gap-3">
                        <div
                          className={`text-center p-3 rounded-full border border-c-border cursor-pointer ${
                            numberEnteredHouse[
                              data.key as TYPE_ENTERD_HOUSE
                            ] === 0 && "pointer-events-none opacity-40"
                          }`}
                          onClick={() =>
                            handleSubtractPeople(data.key as TYPE_ENTERD_HOUSE)
                          }
                        >
                          -
                        </div>
                        <div className="text-center p-3 rounded-full border border-c-border">
                          {numberEnteredHouse[data.key as TYPE_ENTERD_HOUSE]}
                        </div>
                        <div
                          className="text-center p-3 rounded-full border border-c-border cursor-pointer"
                          onClick={() =>
                            handleAddPeople(data.key as TYPE_ENTERD_HOUSE)
                          }
                        >
                          +
                        </div>
                      </div>
                    </div>
                  ))}

                  <p className="text-second text-base font-medium leading-5 mt-5">
                    Chỗ ở này cho phép tối đa 5 khách, không tính em bé. Nếu bạn
                    mang theo nhiều hơn 2 thú cưng, vui lòng báo cho Chủ nhà
                    biết.
                  </p>
                </ModalAbs>
              </div>
            </div>

            {/* buttun */}
            <BtnCommon title="Đặt phòng" handleClick={handleBooking} />
            {/* fee */}
            {!isNaN(totalDay) && totalDay > 0 ? (
              <>
                <div className="py-6">
                  <div className="flex justify-between mt-2">
                    <p className="text-primary text-xl">Phí</p>
                    <p className="text-primary text-xl">Tổng</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-primary text-lg underline">
                      ${apartmentDetail.pricePerNight} x {totalDay} đêm
                    </p>
                    <p className="text-primary text-lg">
                      $
                      {totalDay *
                        (convertStringToFloat(apartmentDetail.pricePerNight) ??
                          0)}
                    </p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-primary text-lg underline">
                      Phí vệ sinh
                    </p>
                    <p className="text-primary text-lg">$30</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-primary text-lg underline">
                      Phí dịch vụ Airbnb
                    </p>
                    <p className="text-primary text-lg">$45</p>
                  </div>
                </div>

                <div className="flex justify-between mt-2 pt-3 border-t-2 border-c-border">
                  <p className="text-primary text-xl">Tổng trước thuế</p>
                  <p className="text-primary text-xl">${totalAmount}</p>
                </div>
              </>
            ) : null}
          </div>

          <div className="p-6 border rounded-lg shadow_common mt-8">
            <div className="flex gap-6">
              <p className="text-lg">
                <span className="text-xl text-primary font-semibold">{`Giá tốt  `}</span>
                . Những ngày bạn chọn có giá thấp hơn $56 so với mức giá trung
                bình theo đêm trong 3 tháng qua.
              </p>
              <div className="relative w-[150px] aspect-[1/1]">
                <Image src="/tag.svg" alt="tag icon" fill />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
