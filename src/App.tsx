import React from "react";
import CashAccounts from "./components/CashAccounts";
import Properties from "./components/Properties";

function App() {
  return (
    <div className="viewCardsCascade">
      <Properties />
      <CashAccounts />
    </div>
  );
}

export default App;
