"use client";

import styles from "@/components/pages/admin/dashboard/users/users.module.css";
import Pagination from "@/components/pages/admin/dashboard/pagination";
import { handleConvertDate, showToast } from "@/utils/helpers/common";
import { useEffect, useState } from "react";
import { getContracts, updateContract } from "@/utils/proxy";
import { IResponseApartmentContract } from "@/utils/interface.v2";

const ContractsPage = ({ searchParams }: any) => {
  const page = searchParams?.page || 1;

  const [contracts, setContracts] = useState<IResponseApartmentContract[]>([]);
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const [isFeching, setIsFetching] = useState<boolean>(true);

  const fetchContract = async () => {
    setIsFetching(true);

    try {
      const { data } = await getContracts({ ...searchParams, page });
      setContracts(data.data);
      setTotalRecord(data.total);
    } catch (error) {
      showToast("Fetch contracts fail", "error");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchContract();
  }, [searchParams]);

  const colorStatus: Record<string, string> = {
    COMPLETED: "done",
    PENDING: "pending",
  };

  const handleCheckIn = async (contractId: string) => {
    setIsFetching(true);
    try {
      await updateContract(contractId, { isCheckIn: true });
      await fetchContract();
      showToast("User checkout success");
    } catch (error) {
      showToast("User checkout fail", "error");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* <div className={styles.top}>
        <Search placeholder="Search for contract..." />
      </div> */}
      <table className={styles.table} style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <td>Căn hộ</td>
            <td>Người thuê</td>
            <td>Tổng tiền</td>
            <td>trạng thái</td>
            <td>Ngày thanh toán</td>
            <td>Ngày bắt đầu</td>
            <td>Ngày kết thúc</td>
            <td>Checkin</td>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => (
            <tr>
              <td>
                <div className={styles.user}>{contract.apartment.name}</div>
              </td>
              <td>
                <span className={`${styles.status} ${styles.pending}`}>
                  {contract.payer.email}
                </span>
              </td>
              <td>{contract.information.totalPrice} Vnđ</td>
              <td className={`status ${colorStatus[contract.status]}`}>
                {contract.status}
              </td>
              <td>
                {handleConvertDate(
                  new Date(contract.createdAt),
                  "HH:mm, dd/MM/yyyy"
                )}
              </td>
              <td>
                14h,{" "}
                {handleConvertDate(new Date(contract.startDate), "dd/MM/yyyy")}
              </td>
              <td>
                12h,{" "}
                {handleConvertDate(new Date(contract.endDate), "dd/MM/yyyy")}
              </td>
              <td>
                <div className={styles.buttons}>
                  {!contract.isCheckIn ? (
                    <button
                      className={`${styles.button} ${styles.view}`}
                      onClick={() => handleCheckIn(contract._id)}
                    >
                      CheckIn
                    </button>
                  ) : (
                    <p>
                      {contract.checkInAt &&
                        handleConvertDate(
                          new Date(contract.checkInAt),
                          "HH:mm, dd/MM/yyyy"
                        )}
                    </p>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={totalRecord} />
    </div>
  );
};

export default ContractsPage;
