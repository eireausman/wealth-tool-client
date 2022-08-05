import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import CashAccounts from "./components/CashAccounts";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cashaccounts" element={<CashAccounts />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
