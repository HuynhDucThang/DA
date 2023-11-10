import styles from "@/components/pages/admin/dashboard/users/singleUser.module.css";
import { updateUser } from "@/utils/actions";
import { IUser } from "@/utils/interface";
import { getUserByIdServer } from "@/utils/proxyServer";
import Image from "next/image";

const SingleUserPage = async ({ params }: any) => {
  const { userId } = params;
  const { data } = await getUserByIdServer(userId);
  const user: IUser = data.data;
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.avatar || "/avatar.png"} alt="avatar" fill />
        </div>
        {user.username}
      </div>
      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form}>
          <input type="hidden" name="id" value={user.id} />
          <label>Username</label>
          <input type="text" name="username" placeholder={user.username} />
          <label>Email</label>
          <input type="email" name="email" placeholder={user.email} />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={user.phonenumber} />
          <label>Address</label>
          <input type="text" name="address" placeholder={user.phonenumber} />
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin" value={user.isVerify as any}>
            <option value={true as any}>Yes</option>
            <option value={false as any}>No</option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive" value={user.isVerify as any}>
            <option value={true as any}>Yes</option>
            <option value={false as any}>No</option>
          </select>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
