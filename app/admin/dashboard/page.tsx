import Transactions from "@/components/pages/admin/dashboard/index/transaction";
import styles from "@/components/pages/admin/dashboard/dashboard.module.css";
import Chart from "@/components/pages/admin/dashboard/chart";
import Rightbar from "@/components/pages/admin/dashboard/index/rightbar";
import Card from "@/components/pages/admin/dashboard/card";
import {
  getAdminStaticticalsChart,
  getAdminStaticticalsCommon,
} from "@/utils/proxyServer";

export const cards = [
  {
    title: "Total Users",
    value: 10.928,
    change: 12,
  },
  {
    title: "Total Apartments",
    value: 8.236,
    change: -2,
  },
  {
    title: "Total Contract",
    value: 6.642,
    change: 18,
  },
];

export interface IStatisticalsCommon {
  title: string;
  value: number;
  change: number;
}

export interface IStatisticalsChart {
  name: string;
  User_Count: number;
  Contract_Count: number;
}

const Dashboard = async () => {
  const statisticalCommonPromise = getAdminStaticticalsCommon();
  const statisticalChartPromise = getAdminStaticticalsChart();

  const [statisticalsCommon, statisticalChart] = await Promise.all([
    statisticalCommonPromise,
    statisticalChartPromise,
  ]);
  const commonData: IStatisticalsCommon[] = statisticalsCommon.data;
  const chartData : IStatisticalsChart[] = statisticalChart.data;

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {commonData.map((item) => (
            <Card item={item} key={item.title} />
          ))}
        </div>
        <Transactions />
        <Chart chartData={chartData} />
      </div>
      {/* <div className={styles.side}>
        <Rightbar />
      </div> */}
    </div>
  );
};

export default Dashboard;
