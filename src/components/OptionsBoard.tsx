import React, { useState, useEffect } from "react";
import { OptionsBoardProps } from "../modules/typeInterfaces";
import {
  getTotalPosAssets,
  getTotalDebtValue,
} from "../modules/serverRequests";
import "./OptionsBoard.css";
import getDisplayNumber from "../modules/getDisplayNumber";

const OptionsBoard: React.FC<OptionsBoardProps> = ({
  selectedCurrencyCode: selectedCurrency,
  selectedCurrencySymbol,
  setselectedCurrencyCode,
  currencyCodesFromDB,
  setselectedCurrencySymbol,
}) => {
  const [totalDebtValue, settotalDebtValue] = useState<number>(0);
  const [netWealthValue, setnetWealthValue] = useState<number>(0);
  const [totalPosAssets, settotalPosAssets] = useState<number>(0);
  const setCurrency = (e: React.FormEvent<EventTarget>) => {
    const target = e.target as HTMLSelectElement;

    currencyCodesFromDB?.forEach((item) => {
      if (item.currency_code === target.value) {
        setselectedCurrencyCode(item.currency_code);
        setselectedCurrencySymbol(item.currency_symbol);
        localStorage.setItem("selectedCurrencyCode", item.currency_code);
        localStorage.setItem("selectedCurrencySymbol", item.currency_symbol);
      }
    });
  };

  const getValueTotalPosAssets = async () => {
    const totalPostAssetsData = await getTotalPosAssets(selectedCurrency);

    const totalPosAssetsInteger = parseInt(totalPostAssetsData.convertedTotal);

    settotalPosAssets(totalPosAssetsInteger);
    return totalPosAssetsInteger;
  };

  const getValueTotalDeb = async () => {
    const totalDebtServerData = await getTotalDebtValue(selectedCurrency);

    const totalDebtInteger = parseInt(totalDebtServerData.convertedTotal);

    settotalDebtValue(totalDebtInteger);
    return totalDebtInteger;
  };

  const getCalculatedNetWealth = async () => {
    Promise.all([getValueTotalPosAssets(), getValueTotalDeb()]).then((data) => {
      console.log(data);

      const calculatedNetWealth = data[0] + data[1];
      setnetWealthValue(calculatedNetWealth);
    });
  };

  useEffect(() => {
    getCalculatedNetWealth();
  }, [selectedCurrency]);

  return (
    <div className="optionsBoard">
      <label htmlFor="Currency">
        Show values in:{" "}
        <select
          name="Currency"
          id="Currency"
          onChange={setCurrency}
          value={selectedCurrency}
          className="currencySelectElement"
        >
          {currencyCodesFromDB?.map((data) => (
            <option key={data.id} value={data.currency_code}>
              {data.currency_name}
            </option>
          ))}
        </select>
      </label>
      <div className="wealthSummary">
        <div className="totalAssetBox">
          <b>Net Wealth</b>{" "}
          <span
            className={
              netWealthValue < 0
                ? "optionsBoardNegative"
                : "optionsBoardPositive"
            }
          >
            {selectedCurrencySymbol}
            {getDisplayNumber(netWealthValue)}
          </span>
        </div>{" "}
        <div className="totalAssetBox">
          <b>Total Assets</b>{" "}
          <span
            className={
              totalPosAssets < 0
                ? "optionsBoardNegative"
                : "optionsBoardPositive"
            }
          >
            {selectedCurrencySymbol}
            {getDisplayNumber(totalPosAssets)}
          </span>
        </div>
        <div className="totalAssetBox">
          <b>Total Debt </b>
          <span
            className={
              totalDebtValue < 0
                ? "optionsBoardNegative"
                : "optionsBoardPositive"
            }
          >
            {selectedCurrencySymbol}
            {getDisplayNumber(totalDebtValue)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OptionsBoard;
