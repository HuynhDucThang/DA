"use client";

import Transactions from "@/components/pages/admin/dashboard/index/transaction";
import styles from "@/components/pages/admin/dashboard/dashboard.module.css";
import Chart from "@/components/pages/admin/dashboard/chart";
import Card from "@/components/pages/admin/dashboard/card";
import {
  IOverViewStatistics,
  IResponseApartmentContract,
} from "@/utils/interface.v2";
import { useEffect, useState } from "react";
import { getChartStatistics, getContracts, getOverviewStatistics } from "@/utils/proxy";
import { showToast } from "@/utils/helpers/common";

export interface IStatisticalsChart {
  name: string;
  userCount: number;
  contractCount: number;
}

const Dashboard = () => {
  const [overview, setOverview] = useState<Partial<IOverViewStatistics>[]>([]);
  const [chart, setChart] = useState<IStatisticalsChart[]>([]);
  const [contracts, setContracts] = useState<IResponseApartmentContract[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contractsResult, overviewResult, chartResult] = await Promise.allSettled([
          getContracts({ page: 1 }),
          getOverviewStatistics(),
          getChartStatistics(),
        ]);

        if (contractsResult.status === "fulfilled") {
          setContracts(contractsResult.value.data.data);
        } else {
          showToast("Failed to fetch contracts", "error");
        }

        if (overviewResult.status === "fulfilled") {
          setOverview(overviewResult.value.data.data);
        } else {
          showToast("Failed to fetch overview statistics", "error");
        }

        if (chartResult.status === "fulfilled") {
          setChart(chartResult.value.data.data);
        } else {
          showToast("Failed to fetch overview statistics", "error");
        }

      } catch (error) {
        showToast("An error occurred", "error");
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {overview.map((item, index) => (
            <Card item={item} key={index} />
          ))}
        </div>
        <Transactions contracts={contracts} />
        <Chart
          chartData={chart}
        />
      </div>
    </div>
  );
};

export default Dashboard;
