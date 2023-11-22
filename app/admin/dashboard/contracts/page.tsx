import styles from "@/components/pages/admin/dashboard/users/users.module.css";
import Pagination from "@/components/pages/admin/dashboard/pagination";
import Search from "@/components/pages/admin/dashboard/search/search";
import { IContractLatest } from "@/utils/interface";
import { getContractsServer } from "@/utils/proxyServer";
import Image from "next/image";
import Link from "next/link";
import { handleConvertDate } from "@/utils/helpers/common";
import { URL } from "@/utils/api";

const UsersPage = async ({ searchParams }: any) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { data } = await getContractsServer(q, page);

  const contracts: IContractLatest[] = data.data;

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
            <td>Tổng tiền</td>
            <td>Nội dung</td>
            <td>Ngày bắt đầu</td>
            <td>Ngày kết thúc</td>
          </tr>
        </thead>
        <tbody>
        {contracts.map((contract) => (
            <tr>
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
                    className={styles.userImage}
                  />
                  {contract.apartment.name}
                </div>
              </td>
              <td>
                <span className={`${styles.status} ${styles.pending}`}>
                  {contract.user.username}
                </span>
              </td>
              <td>${contract.total_amount}</td>
              <td>${contract.content}</td>
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
      <Pagination count={10} />
    </div>
  );
};

export default UsersPage;
