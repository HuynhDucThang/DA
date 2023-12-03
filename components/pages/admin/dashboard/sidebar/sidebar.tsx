import Image from "next/image";
import styles from "./sidebar.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
import { IUser } from "@/utils/interface";
import { getCurrentUserServer } from "@/utils/proxyServer";
import { showToast } from "@/utils/helpers/common";
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

const Sidebar = async () => {
  const data = await getCurrentUserServer();

  if (!data) {
    showToast("Bạn đã hết phiên đăng nhập", "error")
    redirect("/admin/login");
  }

  const user = data.data as IUser;

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
          <span className={styles.username}>{user.username}</span>
          <span className={styles.userTitle}>{user.system_role}</span>
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
      <form
        action={async () => {
          "use server";
          cookies().delete("access_token_admin");
          cookies().delete("refresh_token_admin");
          redirect("/admin/login");
        }}
      >
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
