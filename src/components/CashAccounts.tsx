import React, { useState, useEffect, Fragment } from "react";
import {
  cashAccountAPIData,
  CashAccountsProps,
} from "../modules/typeInterfaces";
import { getCashAccountData } from "../modules/serverRequests";
import CashAccountUpdBal from "./CashAccountUpdBal";
import { motion } from "framer-motion";
import "./CashAccounts.css";
import editIcon from "../assets/images/edit.png";
import currencyConvert from "../modules/currencyConvert";

const CashAccounts: React.FC<CashAccountsProps> = ({ selectedCurrency }) => {
  const [cashAccountAPIData, setcashAccountAPIData] =
    useState<Array<cashAccountAPIData>>();
  const [cashAccountsTotal, setcashAccountsTotal] = useState(0);
  const [accountIDToEdit, setAccountIDToEdit] = useState<number>();
  const [accountToEditCurBal, setAccountToEditCurBal] = useState<number>(0);

  const [showSpinner, setShowSpinner] = useState<boolean>(true);

  const updatedAllAccountBalances = async () => {
    const cashAcData: Array<cashAccountAPIData> = await getCashAccountData();
    let TotalInSelectCurr: number = 0;
    for (let item in cashAcData) {
      if (cashAcData[item].account_currency_code === selectedCurrency) {
        cashAcData[item].displayValue = cashAcData[item].account_balance;
      } else {
        const convertedValue = await currencyConvert(
          cashAcData[item].account_balance,
          cashAcData[item].account_currency_code,
          selectedCurrency
        );
        cashAcData[item].displayValue = convertedValue;
      }
      TotalInSelectCurr += cashAcData[item].displayValue;
    }
    setcashAccountsTotal(TotalInSelectCurr);
    setcashAccountAPIData(cashAcData);
    setShowSpinner(false);
  };

  useEffect(() => {
    updatedAllAccountBalances();
  }, [selectedCurrency]);

  const editAccountBalance = (
    account_id: number,
    currentAccountValue: number
  ) => {
    setAccountIDToEdit(account_id);
    setAccountToEditCurBal(currentAccountValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="viewCard"
    >
      {showSpinner === true ? (
        <p>CASH ACCOUNTS - loading</p>
      ) : (
        <Fragment>
          <div className="viewCardHeaderRow">
            <h3 className="viewCardHeading">CASH ACCOUNTS</h3>
            <h3 className="viewCardTotal">
              {selectedCurrency} {cashAccountsTotal.toLocaleString("en-US")}
            </h3>
          </div>

          {cashAccountAPIData?.map((data) => (
            <div className="viewCardRow" key={data.account_id}>
              <div className="viewCardRowLeftBox">
                <span className="accountNickname">
                  {data.account_nickname.toUpperCase()}
                </span>
                <span className="accountOwner">
                  Owner: {data.account_owner_name}
                </span>
                <span className="accountCurrency">
                  Currency: {data.account_currency_code}
                </span>
              </div>
              <div className="viewCardRowRightBox">
                <Fragment>
                  {accountIDToEdit === data.account_id ? (
                    <CashAccountUpdBal
                      editThisAccountBalanceValue={accountIDToEdit}
                      setAccountIDToEdit={setAccountIDToEdit}
                      updatedAllAccountBalances={updatedAllAccountBalances}
                      accountToEditCurBal={accountToEditCurBal}
                    />
                  ) : (
                    <Fragment>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        onClick={() =>
                          editAccountBalance(
                            data.account_id,
                            data.account_balance
                          )
                        }
                      >
                        <span className="accountValue">
                          {data.account_currency_symbol}{" "}
                          {data.account_balance.toLocaleString("en-US")}
                        </span>
                        <img
                          src={editIcon}
                          className="editValueIcon"
                          alt="Edit Value"
                        />
                      </motion.div>
                      <span className="currentValueText">Current Value </span>
                      <span className="calculatedBalanceValue">
                        {selectedCurrency} {data.displayValue}
                      </span>
                    </Fragment>
                  )}
                </Fragment>
              </div>
            </div>
          ))}
        </Fragment>
      )}
    </motion.div>
  );
};

export default CashAccounts;
