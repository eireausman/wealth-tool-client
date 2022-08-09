import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./parentstyles.css";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import CashAccounts from "./components/CashAccounts";
import Properties from "./components/Properties";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cashaccounts" element={<CashAccounts />} />
        <Route path="/properties" element={<Properties />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
