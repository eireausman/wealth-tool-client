import React, { useEffect, Fragment, useState, useReducer } from "react";
import CashAccounts from "./components/CashAccounts";
import OptionsBoard from "./components/OptionsBoard";
import Properties from "./components/Properties";
import { currencyCodesAPIData } from "./modules/typeInterfaces";
import { getCurrencyCodeData } from "./modules/serverRequests";
import ChartNetWealthCategories from "./components/ChartNetWealthCategories";
import Investments from "./components/Investments";
import FXRates from "./components/FXRates";

function App() {
  const [selectedCurrencyCode, setselectedCurrencyCode] =
    useState<string>("AUD");
  const [selectedCurrencySymbol, setselectedCurrencySymbol] =
    useState<string>("$");
  const [currencyCodesFromDB, setcurrencyCodesFromDB] =
    useState<Array<currencyCodesAPIData>>();

  // useEffect(() => {
  //   const localStoreCurrencyCode = localStorage.getItem("selectedCurrencyCode");
  //   const localStoreCurrencySymbol = localStorage.getItem(
  //     "selectedCurrencySymbol"
  //   );

  //   if (localStoreCurrencyCode !== null) {
  //     setselectedCurrencyCode(localStoreCurrencyCode);
  //   }
  //   if (localStoreCurrencySymbol !== null) {
  //     setselectedCurrencySymbol(localStoreCurrencySymbol);
  //   }
  // }, []);

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
        selectedCurrencySymbol={selectedCurrencySymbol}
        setselectedCurrencyCode={setselectedCurrencyCode}
        currencyCodesFromDB={currencyCodesFromDB}
        setselectedCurrencySymbol={setselectedCurrencySymbol}
      />
      <div className="viewCardsCascade">
        <ChartNetWealthCategories selectedCurrencyCode={selectedCurrencyCode} />
        <Investments
          selectedCurrencyCode={selectedCurrencyCode}
          selectedCurrencySymbol={selectedCurrencySymbol}
          currencyCodesFromDB={currencyCodesFromDB}
        />
        <FXRates />

        <Properties
          selectedCurrencyCode={selectedCurrencyCode}
          selectedCurrencySymbol={selectedCurrencySymbol}
          currencyCodesFromDB={currencyCodesFromDB}
        />

        <CashAccounts
          selectedCurrencyCode={selectedCurrencyCode}
          selectedCurrencySymbol={selectedCurrencySymbol}
          currencyCodesFromDB={currencyCodesFromDB}
        />
      </div>
    </Fragment>
  );
}

export default App;
