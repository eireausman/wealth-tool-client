import React, { useState, useEffect } from "react";
import { OptionsBoardProps } from "../modules/typeInterfaces";
import {
  getTotalPosAssets,
  getTotalDebtValue,
} from "../modules/serverRequests";
import "./OptionsBoard.css";

const OptionsBoard: React.FC<OptionsBoardProps> = ({
  selectedCurrencyCode: selectedCurrency,
  selectedCurrencySymbol,
  setselectedCurrencyCode,
  currencyCodesFromDB,
  setselectedCurrencySymbol,
}) => {
  const [totalDebtValue, settotalDebtValue] = useState<number>();
  const [netWealthValue, setnetWealthValue] = useState<number>();
  const [totalPosAssets, settotalPosAssets] = useState<number>();
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

  useEffect(() => {
    Promise.all([getValueTotalPosAssets(), getValueTotalDeb()]).then((data) => {
      const calculatedNetWealth = data[0] + data[1];
      setnetWealthValue(calculatedNetWealth);
    });
  }, [selectedCurrency]);

  console.log();

  return (
    <div className="optionsBoard">
      <div className="wealthSummary">
        <div className="totalAssetBox">
          <b>Net Wealth</b> {selectedCurrencySymbol}
          {netWealthValue}
        </div>{" "}
        <div className="totalAssetBox">
          <b>Total Assets</b> <span>{totalPosAssets}</span>
        </div>
        <div className="totalAssetBox">
          <b>Total Debt </b>
          <span>{totalDebtValue}</span>
        </div>
      </div>
      <label htmlFor="Currency">
        Show values in:{" "}
        <select
          name="Currency"
          id="Currency"
          onChange={setCurrency}
          value={selectedCurrency}
        >
          {currencyCodesFromDB?.map((data) => (
            <option key={data.id} value={data.currency_code}>
              {data.currency_name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default OptionsBoard;
