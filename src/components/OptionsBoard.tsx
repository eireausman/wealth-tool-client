import React from "react";
import { OptionsBoardProps } from "../modules/typeInterfaces";

const OptionsBoard: React.FC<OptionsBoardProps> = ({
  selectedCurrencyCode: selectedCurrency,
  setselectedCurrencyCode,
  currencyCodesFromDB,
  setselectedCurrencySymbol,
}) => {
  const setCurrency = (e: React.FormEvent<EventTarget>) => {
    const target = e.target as HTMLSelectElement;
    // const targetKey = target.value as keyof typeof currencyCodesFromDB;
    currencyCodesFromDB?.forEach((item) => {
      if (item.currency_code === target.value!) {
        setselectedCurrencyCode(item.currency_code);
        setselectedCurrencySymbol(item.currency_symbol);
        localStorage.setItem("selectedCurrencyCode", item.currency_code);
        localStorage.setItem("selectedCurrencySymbol", item.currency_symbol);
      }
    });
  };

  return (
    <div className="optionsBoard">
      <label htmlFor="Currency">Show values in: </label>

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
    </div>
  );
};

export default OptionsBoard;
