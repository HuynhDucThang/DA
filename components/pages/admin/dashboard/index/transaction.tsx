import Image from "next/image";
import styles from "./transaction.module.css";
import { getContractsLatest } from "@/utils/proxyServer";
import { IContractLatest } from "@/utils/interface";
import { URL } from "@/utils/api";
import { handleConvertDate } from "@/utils/helpers/common";

const Transactions = async () => {
  const { data } = await getContractsLatest();
  const contracts = data.data as IContractLatest[];

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
                    src={
                      `${URL}/${contract?.apartment?.images?.[0]?.image_url}` ||
                      "/avatar.png"
                    }
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
                  {contract?.user?.username}
                </span>
              </td>
              <td>${contract?.total_amount}</td>
              <td>${contract?.content}</td>
              <td>
                14h,{" "}
                {handleConvertDate(new Date(contract.start_date), "dd/MM/yyyy")}
              </td>
              <td>
                12h,{" "}
                {handleConvertDate(new Date(contract.end_date), "dd/MM/yyyy")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
