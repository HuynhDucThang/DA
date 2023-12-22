"use client";

import { Loading } from "@/components/common";
import { CardTrip } from "@/components/pages/Home";
import CardApartment from "@/components/pages/Home/CardApartment";
import Table from "@/components/pages/trip/table";
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
  const [changePage, setChangePage] = useState<number>(1);

  useEffect(() => {
    const getTrip = async () => {
      if (!currentUser.id) {
        showToast("Hãy đăng nhập để sử dụng chức năng này", "error");
        router.push("/");
        return;
      }
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
      showToast("Xoá thành công")
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

        <Table
          data={contractsTrip}
          changePage={changePage}
          totalPage={Math.ceil(contractsTrip.length / 6)}
          setChangePage={setChangePage}
          onDelete={deteteTrip}
        />
      </div>
    </>
  );
}
