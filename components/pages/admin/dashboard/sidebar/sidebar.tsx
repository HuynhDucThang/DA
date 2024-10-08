"use client";

import Image from "next/image";
import styles from "./sidebar.module.css";
import { redirect, useRouter } from "next/navigation";

import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import MenuLink from "./menuLink";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import {
  currentUserLogout,
  getCurrentUserPending,
} from "@/redux/slices/userSlice";
import { userLogout } from "@/redux/slices/authSlice";
// import { auth, signOut } from "@/app/auth";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/admin/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Apartments",
        path: "/admin/dashboard/apartments",
        icon: <MdShoppingBag />,
      },
      {
        title: "Contracts",
        path: "/admin/dashboard/contracts",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/admin/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/admin/dashboard/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/admin/dashboard/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/admin/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/admin/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = () => {
  const { access_token } = useAppSelector((state) => state.auth);
  const { currentUser: user } = useAppSelector((state) => state.user);
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!access_token) {
      router.push("/admin/login");
      return;
    }
    dispatch(getCurrentUserPending());
  }, [access_token]);

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={"/avatar.png"}
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{user.email}</span>
          <span className={styles.userTitle}>{user.role}</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>

      <button
        className={styles.logout}
        onClick={() => {
          dispatch(currentUserLogout());
          dispatch(userLogout());
          router.push("/admin/login");
        }}
      >
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
