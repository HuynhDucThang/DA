import styles from "@/components/pages/admin/dashboard/users/users.module.css";
import Pagination from "@/components/pages/admin/dashboard/pagination";
import Search from "@/components/pages/admin/dashboard/search/search";
import { deleteUser } from "@/utils/actions";
import { IApartmentContract } from "@/utils/interface";
import { getContractsServer } from "@/utils/proxyServer";
import Image from "next/image";
import Link from "next/link";
import { handleConvertDate } from "@/utils/helpers/common";

const UsersPage = async ({ searchParams }: any) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { data } = await getContractsServer(q, page);

  const contracts: IApartmentContract[] = data.data;

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
            <td>User_ID</td>
            <td>Apartment_ID</td>
            <td>Content</td>
            <td>Start date</td>
            <td>End Date</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => (
            <tr key={contract.id}>
              <td>{contract.user_id}</td>
              <td>{contract.apartment_id}</td>
              <td>
                <div className={styles.user}>{contract.content}</div>
              </td>

              <td>{handleConvertDate(new Date(contract?.start_date))}</td>
              <td>{handleConvertDate(new Date(contract?.end_date))}</td>
              <td>
                <div className={styles.buttons}>
                  <form action={deleteUser}>
                    <input
                      type="hidden"
                      name="contractId"
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
      <Pagination count={10} />
    </div>
  );
};

export default UsersPage;
