import Footer from "@/components/pages/admin/dashboard/footer/footer";
import Navbar from "@/components/pages/admin/dashboard/navbar";
import Sidebar from "@/components/pages/admin/dashboard/sidebar/sidebar";
import styles from "@/components/pages/admin/dashboard/dashboard.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Nhà nghĩ dưỡng và căn hộ cao cấp cho thuê.",
};

const Layout = ({ children }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
