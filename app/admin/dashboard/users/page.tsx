import styles from "@/components/pages/admin/dashboard/users/users.module.css";
import Pagination from "@/components/pages/admin/dashboard/pagination";
import Search from "@/components/pages/admin/dashboard/search/search";
import { deleteUser } from "@/utils/actions";
import { IUser } from "@/utils/interface";
import { getUsersServer } from "@/utils/proxyServer";
import Image from "next/image";
import Link from "next/link";
import { handleConvertDate } from "@/utils/helpers/common";
import { URL } from "@/utils/api";

const UsersPage = async ({ searchParams }: any) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { data } = await getUsersServer(q, page);

  const users: IUser[] = data.data;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/admin/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table} style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Phone number</td>
            <td>Created At</td>
            <td>System role</td>
            <td>Role</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={
                      user.avatar
                        ? `${URL}/${user.avatar}`
                        : "/avatar_none_user.svg"
                    }
                    alt="avatar"
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.phonenumber}</td>
              <td>{handleConvertDate(new Date(user?.created_at))}</td>
              <td>{user.system_role}</td>
              <td>{user.isVerify ? "Admin" : "Client"}</td>
              <td>
                <div className={styles.buttons}>
                  <Link
                    href={`/admin/dashboard/users/${user.id}`}
                    prefetch={false}
                  >
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteUser}>
                    <input type="hidden" name="email" value={user.email} />
                    <input type="hidden" name="user_id" value={user.id} />
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
