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
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [1, 1, 2, 1, 1, 1],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default ChartExample;
