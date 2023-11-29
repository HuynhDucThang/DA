"use client";

import styles from "@/components/pages/admin/dashboard/users/addUser.module.css";
import { addUser } from "@/utils/actions";
import { useFormState } from "react-dom";

const AddUserPage = () => {
  const [state, formAction] = useFormState(addUser, undefined);

  return (
    <div className={styles.container}>
      <form action={formAction} className={styles.form}>
        <input type="text" placeholder="username" name="username" required />
        <input type="email" placeholder="email" name="email" required />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <input type="text" placeholder="address" name="address" required />
        <input type="phonenumber" placeholder="phone" name="phonenumber" />
        <select name="system_role" id="system_role">
          <option value={""}>Choose permission</option>
          <option value={"RENTER"}>Renter</option>
          <option value={"MANAGER"}>Manager</option>
          <option value={"ADMIN"}>ADMIN</option>
        </select>

        {/* <textarea
          name="address"
          id="address"
          rows={4}
          placeholder="Address"
        ></textarea> */}
        <button type="submit">Submit</button>
      </form>
      {state ? (
        <div className="text-c-logo text-lg font-medium">{state}</div>
      ) : null}
    </div>
  );
};

export default AddUserPage;
