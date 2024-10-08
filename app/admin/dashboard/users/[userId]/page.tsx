"use client";

import styles from "@/components/pages/admin/dashboard/users/singleUser.module.css";
import UpdateAvatar from "@/components/pages/admin/dashboard/users/updateAvatar";
import { initUser } from "@/redux/slices/userSlice";
import { showToast } from "@/utils/helpers/common";
import { IUser } from "@/utils/interface";
import { getUserById, updateUser } from "@/utils/proxy";
import { FormEvent, useEffect, useState } from "react";

const SingleUserPage = ({ params }: any) => {
  const { userId } = params;
  const [userDetail, setUserDetail] = useState<IUser | null>(null);
  const [formValues, setFormValues] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUserById(userId);
        setUserDetail({ ...initUser, ...data.payload });
        setFormValues({ ...initUser, ...data.payload });
      } catch (error) {
        showToast("Error when fetching user", "error");
      }
    };
    fetchUser();
  }, [userId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (formValues) {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!formValues) return;

    const { _id, role,...body } = formValues;
    try {
      await updateUser(userId, body);
      showToast("User updated successfully", "success");
    } catch (error) {
      showToast("Error when updating user", "error");
    }
  };

  return (
    <div className={styles.container}>
      <UpdateAvatar />
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="hidden" name="id" value={userDetail?._id} />

          <label>Username</label>
          <input
            type="text"
            name="name"
            value={formValues?.name || ""}
            onChange={handleInputChange}
            placeholder="Enter username"
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formValues?.email || ""}
            readOnly
            placeholder="Enter email"
          />

          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formValues?.address || ""}
            onChange={handleInputChange}
            placeholder="Enter address"
          />

          <label>Phone</label>
          <input
            type="text"
            name="phoneNumber"
            value={formValues?.phoneNumber || ""}
            onChange={handleInputChange}
            placeholder="Enter phone number"
          />

          <label>System role</label>
          <select
            name="role"
            value={formValues?.role || ""}
            onChange={handleInputChange}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
