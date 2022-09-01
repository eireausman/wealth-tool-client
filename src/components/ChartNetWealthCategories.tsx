import React, { useState, useEffect } from "react";

import {
  getNetCashAccountTotal,
  getNetPropertyTotal,
  getNetInvestmentTotal,
} from "../modules/serverRequests";
import { ChartNetWealthCategoriesProps } from "../modules/typeInterfaces";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./ChartNetWealthCategories.css";

const ChartNetWealthCategories: React.FC<ChartNetWealthCategoriesProps> = ({
  selectedCurrencyCode,
  triggerRecalculations,
}) => {
  const [constructedChartData, setconstructedChartData] = useState<
    Array<number>
  >([]);

  const getChartDataFromDB = async () => {
    const PropertyValue = await getNetPropertyTotal(selectedCurrencyCode);
    const CashAccountValue = await getNetCashAccountTotal(selectedCurrencyCode);
    const InvestmentsValue = await getNetInvestmentTotal(selectedCurrencyCode);
    setconstructedChartData([
      PropertyValue,
      CashAccountValue,
      InvestmentsValue,
    ]);
  };

  useEffect(() => {
    getChartDataFromDB();
  }, [triggerRecalculations]);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: [`Property`, "Cash Accounts", "Investments"],

    datasets: [
      {
        label: `Proportion of Net Wealth`,
        data: constructedChartData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      title: {
        display: true,
        text: "Custom Chart Title",
      },
    },
  };

  return (
    <div className="viewCard">
      <span className="chartTitle"> NET WEALTH BREAKDOWN</span>
      <div className="viewCardRow viewCardChartInner">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartNetWealthCategories;
