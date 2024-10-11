"use client"

import styles from "@/components/pages/admin/dashboard/users/users.module.css";
import Pagination from "@/components/pages/admin/dashboard/pagination";
import Search from "@/components/pages/admin/dashboard/search/search";
import Link from "next/link";
import { handleConvertDate, showToast } from "@/utils/helpers/common";
import { useEffect, useState } from "react";
import { getContracts } from "@/utils/proxy";
import { IResponseApartmentContract } from "@/utils/interface.v2";

const UsersPage = ({ searchParams }: any) => {
  const page = searchParams?.page || 1;


  const [contracts, setContracts] = useState<IResponseApartmentContract[]>([]);
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const [isFeching, setIsFetching] = useState<boolean>(true);

  const fetchUsers = async () => {
    setIsFetching(true);

    try {
      const { data } = await getContracts({...searchParams, page});
      setContracts(data.data);
      setTotalRecord(data.data.length);
    } catch (error) {
      showToast("Fetch contracts fail", "error");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchParams]);

  const colorStatus: Record<string, string> = {
    COMPLETED: "done",
    PENDING: "pending",
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for contract..." />
        <Link href="/admin/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table} style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <td>Căn hộ</td>
            <td>Người thuê</td>
            <td>Người sở hữu</td>
            <td>Tổng tiền</td>
            <td>trạng thái</td>
            <td>Ngày bắt đầu</td>
            <td>Ngày kết thúc</td>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => (
            <tr>
              <td>
                <div className={styles.user}>
                  {contract.apartment.name}
                </div>
              </td>
              <td>
                <span className={`${styles.status} ${styles.pending}`}>
                  {contract.payer.email}
                </span>
              </td>
              <td>{contract.apartment.owner?.email}</td>
              <td>{contract.information.totalPrice} Vnđ</td>
              <td className={`status ${colorStatus[contract.status]}`}>
                {contract.status}
              </td>
              <td>
                14h,{" "}
                {handleConvertDate(new Date(contract.startDate), "dd/MM/yyyy")}
              </td>
              <td>
                12h,{" "}
                {handleConvertDate(new Date(contract.endDate), "dd/MM/yyyy")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={totalRecord} />
    </div>
  );
};

export default UsersPage;
