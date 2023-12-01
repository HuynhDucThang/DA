"use client";

import { Loading } from "@/components/common";
import { CardTrip } from "@/components/pages/Home";
import CardApartment from "@/components/pages/Home/CardApartment";
import { useAppSelector } from "@/redux/hooks";
import { showToast } from "@/utils/helpers/common";
import { IContractsTrip } from "@/utils/interface";
import { deleteContract, getContractsTrip } from "@/utils/proxy";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Trip() {
  const { currentUser } = useAppSelector((state) => state.user);
  const [contractsTrip, setContractsTrip] = useState<IContractsTrip[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getTrip = async () => {
      setIsLoading(true);
      try {
        const { data } = await getContractsTrip(currentUser.id);
        setContractsTrip(data.data);
      } catch (error) {
        showToast("Xảy ra lỗi trong quá trình xử lý");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };
    getTrip();
  }, []);

  const deleteStateContracts = (contractId: string) => {
    const newContract = contractsTrip.filter(
      (contract) => contract.id !== contractId
    );
    setContractsTrip(newContract);
  };

  const deteteTrip = async (contractId: string) => {
    setIsLoading(true);
    try {
      await deleteContract(contractId);
      deleteStateContracts(contractId);
      router.refresh();
    } catch (error) {
      showToast("Xảy ra lỗi trong quá trình xử lý.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="px-pd-main py-8">
        <h2 className="text-center text-3xl font-semibold">
          Danh sách các chuyến đi của bạn
        </h2>

        <div className="py-10">
          {contractsTrip.length ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
              {contractsTrip.map((contract, index) => (
                <CardTrip
                  contract={contract}
                  key={index}
                  deteteTrip={deteteTrip}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="flex flex-col gap-4 w-fit mt-6">
                <h4 className="text-2xl text-primary font-medium">
                  Chưa có chuyến đi nào được đặt... vẫn chưa!
                </h4>
                <p className="text-lg">
                  Đã đến lúc phủi bụi hành lý và bắt đầu chuẩn bị cho chuyến
                  phiêu lưu tiếp theo của bạn rồi.
                </p>

                <Link
                  href={"/#apartments"}
                  className="text-white py-4 px-6 bg-[#222222] hover:bg-black hover:shadow-lg transition-all duration-500 rounded-xl w-fit text-xl font-medium cursor-pointer"
                >
                  Bắt đầu tìm kiếm
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
