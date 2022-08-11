import React, { useEffect, useState } from "react";
import { OptionsBoardProps } from "../modules/typeInterfaces";

const OptionsBoard: React.FC<OptionsBoardProps> = ({
  selectedCurrency,
  setselectedCurrency,
  currencyCodesFromDB,
}) => {
  const setCurrency = (e: React.FormEvent<EventTarget>) => {
    const target = e.target as HTMLSelectElement;
    setselectedCurrency(target.value!);
    localStorage.setItem("selectedCurrency", target.value!);
    console.log(currencyCodesFromDB);
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
