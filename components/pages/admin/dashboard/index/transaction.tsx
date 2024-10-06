"use client";

import Image from "next/image";
import styles from "./transaction.module.css";
import { handleConvertDate, showToast } from "@/utils/helpers/common";
import { IResponseApartmentContract } from "@/utils/interface.v2";
import { useEffect, useState } from "react";
import { getContracts } from "@/utils/proxy";

const Transactions = () => {
  const [contracts, setContracts] = useState<IResponseApartmentContract[]>([]);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const { data } = await getContracts({});
        setContracts(data.data);
      } catch (error) {
        showToast("Lấy danh sách hợp dồng không thành công", "error");
      }
    };

    fetchContracts();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Căn hộ</td>
            <td>Người thuê</td>
            <td>Tổng tiền</td>
            <td>Nội dung</td>
            <td>Ngày bắt đầu</td>
            <td>Ngày kết thúc</td>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract, index) => (
            <tr key={index}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={contract?.apartment?.images?.[0]}
                    alt="ảnh"
                    width={40}
                    height={40}
                    className={`${styles.userImage} object-cover`}
                  />
                  {contract?.apartment?.name}
                </div>
              </td>
              <td>
                <span className={`${styles.status} ${styles.pending}`}>
                  {contract?.payer?.email}
                </span>
              </td>
              <td>${contract?.information.totalPrice}</td>
              <td>${contract?.content}</td>
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
    </div>
  );
};

export default Transactions;
