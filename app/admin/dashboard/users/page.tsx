"use client";

import styles from "@/components/pages/admin/dashboard/users/users.module.css";
import Pagination from "@/components/pages/admin/dashboard/pagination";
import Search from "@/components/pages/admin/dashboard/search/search";
import { IUser } from "@/utils/interface";
import { getUsersServer } from "@/utils/proxyServer";
import Image from "next/image";
import Link from "next/link";
import { handleConvertDate, showToast } from "@/utils/helpers/common";
import { URL } from "@/utils/api";
import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "@/utils/proxy";

const UsersPage = ({ searchParams }: any) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const [users, setUsers] = useState<IUser[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [isFeching, setIsFetching] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsFetching(true);

      try {
        const { data } = await getUsers({
          q,
          page,
        });
        setUsers(data.data.users);
        setTotalUsers(data.data.totalUsers);
      } catch (error) {
        showToast("Fetch users fail");
      } finally {
        setIsFetching(false);
      }
    };

    fetchUsers();
  }, [q, page]);

  const handleDeleteUser = async (userId: string) => {
    setIsDeleting(true);
    try {
      await deleteUser(userId);
      setIsFetching(true);
    } catch (error) {
      showToast("Delete user fail", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user email ..." />
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
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <div className={styles.user}>
                  <div className="relative w-[40px] h-[40px]">
                    <Image
                      src={
                        user.avatar
                          ? `${URL}/${user.avatar}`
                          : "/avatar_none_user.svg"
                      }
                      alt="avatar"
                      fill
                      className={`${styles.userImage} object-cover`}
                    />
                  </div>
                  {user.name}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>
                {user?.createdAt &&
                  handleConvertDate(new Date(user?.createdAt))}
              </td>
              <td>{user.role}</td>
              <td>
                <div className={styles.buttons}>
                  <Link
                    href={`/admin/dashboard/users/${user._id}`}
                    prefetch={false}
                  >
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <button
                    className={`${styles.button} ${styles.delete}`}
                    disabled={isFeching}
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={totalUsers} />
    </div>
  );
};

export default UsersPage;
