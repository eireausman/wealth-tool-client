import React, { useEffect, Fragment, useState } from "react";
import CashAccounts from "./components/CashAccounts";
import OptionsBoard from "./components/OptionsBoard";
import Properties from "./components/Properties";
import { currencyCodesAPIData } from "./modules/typeInterfaces";
import { getCurrencyCodeData } from "./modules/serverRequests";

import {} from "./modules/serverRequests";

function App() {
  const [selectedCurrency, setselectedCurrency] = useState<string>("AUD");
  const [currencyCodesFromDB, setcurrencyCodesFromDB] =
    useState<Array<currencyCodesAPIData>>();

  useEffect(() => {
    const localStoreCurrency = localStorage.getItem("selectedCurrency");
    if (localStoreCurrency !== null) {
      setselectedCurrency(localStoreCurrency);
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
        selectedCurrency={selectedCurrency}
        setselectedCurrency={setselectedCurrency}
        currencyCodesFromDB={currencyCodesFromDB}
      />
      <div className="viewCardsCascade">
        <Properties selectedCurrency={selectedCurrency} />
        <CashAccounts selectedCurrency={selectedCurrency} />
      </div>
    </Fragment>
  );
}

export default App;
