import styles from "@/components/pages/admin/dashboard/users/singleUser.module.css";
import UpdateAvatar from "@/components/pages/admin/dashboard/users/updateAvatar";
import { updateAvatarUserAction, updateUser } from "@/utils/actions";
import { IUser } from "@/utils/interface";
import { getUserByIdServer } from "@/utils/proxyServer";

const SingleUserPage = async ({ params }: any) => {
  const { userId } = params;
  const { data } = await getUserByIdServer(userId);
  const user: IUser = data.data;

  return (
    <div className={styles.container}>
      <UpdateAvatar user={user} />
      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form}>
          <input type="hidden" name="id" value={user.id} />
          <label>Username</label>
          <input type="text" name="username" placeholder={user.username} />
          <label>Email</label>
          <input type="email" name="email" readOnly={true} placeholder={user.email} />
          {/* <label>Password</label>
          <input type="password" name="password" /> */}
          <label>Phone</label>
          <input type="text" name="phone" placeholder={user.phonenumber} />
          {/* <label>Address</label>
          <input type="text" name="address" placeholder={user.phonenumber} /> */}
          <label>System role</label>
          <select
            name="system_role"
            id="system_role"
          >
            <option value={"RENTER"}>Renter</option>
            <option value={"MANAGER"}>Manager</option>
          </select>

          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
