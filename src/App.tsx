import React, { useEffect, Fragment, useState } from "react";
import CashAccounts from "./components/CashAccounts";
import OptionsBoard from "./components/OptionsBoard";
import Properties from "./components/Properties";
import { currencyCodesAPIData } from "./modules/typeInterfaces";
import { getCurrencyCodeData } from "./modules/serverRequests";

import {} from "./modules/serverRequests";
import ChartExample from "./components/ChartExample";
import Investments from "./components/Investments";

function App() {
  const [selectedCurrencyCode, setselectedCurrencyCode] =
    useState<string>("GBP");
  const [selectedCurrencySymbol, setselectedCurrencySymbol] =
    useState<string>("£");
  const [currencyCodesFromDB, setcurrencyCodesFromDB] =
    useState<Array<currencyCodesAPIData>>();

  useEffect(() => {
    const localStoreCurrencyCode = localStorage.getItem("selectedCurrencyCode");
    const localStoreCurrencySymbol = localStorage.getItem(
      "selectedCurrencySymbol"
    );
    if (localStoreCurrencyCode !== null) {
      setselectedCurrencyCode(localStoreCurrencyCode);
    }
    if (localStoreCurrencySymbol !== null) {
      setselectedCurrencySymbol(localStoreCurrencySymbol);
    }
  }, []);

  useEffect(() => {
    if (currencyCodesFromDB === undefined) {
      getCurrencyCodeData()
        .then((data) => {
          setcurrencyCodesFromDB(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <Fragment>
      <OptionsBoard
        selectedCurrencyCode={selectedCurrencyCode}
        setselectedCurrencyCode={setselectedCurrencyCode}
        currencyCodesFromDB={currencyCodesFromDB}
        setselectedCurrencySymbol={setselectedCurrencySymbol}
      />
      <div className="viewCardsCascade">
        <Properties
          selectedCurrencyCode={selectedCurrencyCode}
          selectedCurrencySymbol={selectedCurrencySymbol}
        />
        <CashAccounts
          selectedCurrencyCode={selectedCurrencyCode}
          selectedCurrencySymbol={selectedCurrencySymbol}
        />
        <Investments
          selectedCurrencyCode={selectedCurrencyCode}
          selectedCurrencySymbol={selectedCurrencySymbol}
        />
        <ChartExample />
      </div>
    </Fragment>
  );
}

export default App;
