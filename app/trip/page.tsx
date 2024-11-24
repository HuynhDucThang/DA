"use client";

import { Loading } from "@/components/common";
import Table from "@/components/pages/trip/table";
import { useAppSelector } from "@/redux/hooks";
import { showToast } from "@/utils/helpers/common";
import { IResponseApartmentContract } from "@/utils/interface.v2";
import { deleteContract, getContracts } from "@/utils/proxy";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Trip() {
  const { currentUser, isLoading: isLoadingRedux } = useAppSelector(
    (state) => state.user
  );
  const [total, setTotal] = useState<number>(0);

  const [contractsTrip, setContractsTrip] = useState<
    IResponseApartmentContract[]
  >([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [changePage, setChangePage] = useState<number>(1);

  useEffect(() => {
    const getTrip = async () => {
      if (!currentUser._id && !isLoadingRedux) {
        showToast("Hãy đăng nhập để sử dụng chức năng này", "error");
        router.push("/");
        return;
      }
      setIsLoading(true);
      try {
        const { data } = await getContracts({
          page: changePage,
          userId: currentUser._id,
        });

        setContractsTrip(data.data);
        setTotal(data.total);
      } catch (error) {
        showToast("Xảy ra lỗi trong quá trình xử lý");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };
    getTrip();
  }, [changePage, isLoadingRedux]);

  const deleteStateContracts = (contractId: string) => {
    const newContract = contractsTrip.filter(
      (contract) => contract._id !== contractId
    );
    setContractsTrip(newContract);
  };

  const deteteTrip = async (contractId: string) => {
    setIsLoading(true);
    try {
      await deleteContract(contractId);
      deleteStateContracts(contractId);
      showToast("Xoá thành công");
      // router.refresh();
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
            <Table
              data={contractsTrip}
              changePage={changePage}
              totalPage={Math.ceil(total / 6)}
              setChangePage={setChangePage}
              onDelete={deteteTrip}
            />
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
