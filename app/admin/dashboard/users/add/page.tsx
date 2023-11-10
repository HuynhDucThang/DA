import styles from "@/components/pages/admin/dashboard/users/addUser.module.css";
import { addUser } from "@/utils/actions";

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <form action={addUser} className={styles.form}>
        <input type="text" placeholder="username" name="username" required />
        <input type="email" placeholder="email" name="email" required />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <input type="phone" placeholder="phone" name="phone" />
        <select name="isAdmin" id="isAdmin">
          <option value={false as any}>Is Admin?</option>
          <option value={true as any}>Yes</option>
          <option value={false as any}>No</option>
        </select>
        <select name="isActive" id="isActive">
          <option value={true as any}>Is Active?</option>
          <option value={true as any}>Yes</option>
          <option value={false as any}>No</option>
        </select>
        <textarea
          name="address"
          id="address"
          rows={16}
          placeholder="Address"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;
