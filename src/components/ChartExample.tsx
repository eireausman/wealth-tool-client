import React, { useState, useEffect } from "react";
import { cashAccountAPIData } from "../modules/typeInterfaces";
import { getCashAccountData } from "../modules/serverRequests";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const ChartExample = () => {
  const [cashAccountAPIData, setcashAccountAPIData] =
    useState<Array<cashAccountAPIData>>();
  const [constructedChartData, setconstructedChartData] = useState([]);

  const updatedAllAccountBalances = async () => {
    const cashAcData: Array<cashAccountAPIData> = await getCashAccountData();

    setcashAccountAPIData(cashAcData);
  };

  useEffect(() => {
    updatedAllAccountBalances();
  }, []);

  ChartJS.register(ArcElement, Tooltip, Legend);

  useEffect(() => {
    // // let labels = [];
    // // let datesets = [];
    // // let backgroundColor = [];
    // // let borderColor = [];
    // // cashAccountAPIData?.map((data) => {
    // //   labels.push(data.account_nickname);
    // //   datesets.push(data.account_balance);
    // // });
    // // const saveChartData = {
    // //   labels,
    // //   datasets,
    // // };
    // setconstructedChartData(saveChartData);
  }, [cashAccountAPIData]);

  const data = {
    labels: ["Property", "Cash Accounts", "Investments", "Other"],
    datasets: [
      {
        label: "Proportion of Positive Wealth",
        data: [200, 300, 100, 150],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="viewCard">
      <div className="viewCardRow">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default ChartExample;
