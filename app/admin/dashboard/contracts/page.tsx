import styles from "@/components/pages/admin/dashboard/users/users.module.css";
import Pagination from "@/components/pages/admin/dashboard/pagination";
import Search from "@/components/pages/admin/dashboard/search/search";
import { IContractLatest } from "@/utils/interface";
import { getContractsServer } from "@/utils/proxyServer";
import Image from "next/image";
import Link from "next/link";
import { handleConvertDate } from "@/utils/helpers/common";
import { URL } from "@/utils/api";
import { deleteContractAction } from "@/utils/actions";

const UsersPage = async ({ searchParams }: any) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { data } = await getContractsServer(q, page);

  const contracts: IContractLatest[] = data.data;
  const totalRecord = data.total_record;

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
            <td>actions</td>
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
                  {contract.user.email}
                </span>
              </td>
              <td>{contract.apartment.owner?.email}</td>
              <td>${contract.total_amount}</td>
              <td>{contract.status}</td>
              <td>
                14h,{" "}
                {handleConvertDate(new Date(contract.start_date), "dd/MM/yyyy")}
              </td>
              <td>
                12h,{" "}
                {handleConvertDate(new Date(contract.end_date), "dd/MM/yyyy")}
              </td>
              <td>
                <div className={styles.buttons}>
                  <form action={deleteContractAction}>
                    <input
                      type="hidden"
                      name="contract_id"
                      value={contract.id}
                    />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
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

export default UsersPage;
