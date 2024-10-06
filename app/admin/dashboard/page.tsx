"use client";

import Transactions from "@/components/pages/admin/dashboard/index/transaction";
import styles from "@/components/pages/admin/dashboard/dashboard.module.css";
import Chart from "@/components/pages/admin/dashboard/chart";
import Rightbar from "@/components/pages/admin/dashboard/index/rightbar";
import Card from "@/components/pages/admin/dashboard/card";
import {
  IOverViewStatistics,
  IResponseApartmentContract,
} from "@/utils/interface.v2";
import { useEffect, useState } from "react";
import { getContracts, getOverviewStatistics } from "@/utils/proxy";
import { showToast } from "@/utils/helpers/common";

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

const Dashboard = () => {
  const [overview, setOverview] = useState<Partial<IOverViewStatistics>>({});
  const [contracts, setContracts] = useState<IResponseApartmentContract[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contractsResult, overviewResult] = await Promise.allSettled([
          getContracts({}),
          getOverviewStatistics(),
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
          {(
            [
              {
                title: "User",
                value: 20,
                change: 40,
              },
            ] as IStatisticalsCommon[]
          ).map((item, index) => (
            <Card item={item} key={index} />
          ))}
        </div>
        <Transactions />
        <Chart
          chartData={[
            {
              name: "tháng 9",
              Contract_Count: 50,
              User_Count: 90,
            },
            {
              name: "tháng 10",
              Contract_Count: 10,
              User_Count: 3,
            },
            {
              name: "tháng 11",
              Contract_Count: 90,
              User_Count: 20,
            },
          ]}
        />
      </div>
      {/* <div className={styles.side}>
    <Rightbar />
  </div> */}
    </div>
  );
};

export default Dashboard;
