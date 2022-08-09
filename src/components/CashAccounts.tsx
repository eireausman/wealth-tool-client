import React, { useState, useEffect, Fragment } from "react";
import { cashAccountAPIData } from "../modules/typeInterfaces";
import { getCashAccountData } from "../modules/serverRequests";
import CashAccountUpdBal from "./CashAccountUpdBal";
import { motion } from "framer-motion";
import "./CashAccounts.css";
import editIcon from "../assets/images/edit.png";

const CashAccounts: React.FC = () => {
  const [cashAccountAPIData, setcashAccountAPIData] =
    useState<Array<cashAccountAPIData>>();
  const [accountIDToEdit, setAccountIDToEdit] = useState<number>();
  const [accountToEditCurBal, setAccountToEditCurBal] = useState<number>(0);
  const [showSpinner, setShowSpinner] = useState<boolean>(true);
  // to provide feedback after updates:
  const [previousAccBal, setpreviousAccBal] = useState<number>();
  const [previousEditAccID, setpreviousEditAccID] = useState<number>();

  const updatedAllAccountBalances = () => {
    getCashAccountData()
      .then((data: Array<cashAccountAPIData>) => {
        setcashAccountAPIData(data);
      })
      .then((data) => {
        setShowSpinner(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    updatedAllAccountBalances();
  }, []);

  const editAccountBalance = (
    account_id: number,
    currentAccountValue: number
  ) => {
    setpreviousAccBal(currentAccountValue);
    setpreviousEditAccID(account_id);
    setAccountIDToEdit(account_id);
    setAccountToEditCurBal(currentAccountValue);
  };

  return (
    <div className="viewCard">
      {showSpinner === true ? (
        <p>CASH ACCOUNTS - loading</p>
      ) : (
        <Fragment>
          <div className="viewCardHeaderRow">
            <h3 className="viewCardHeading">CASH ACCOUNTS</h3>
            <h3 className="viewCardTotal">Total $1,300,000</h3>
          </div>

          {cashAccountAPIData?.map((data) => (
            <div className="viewCardRow">
              <div className="viewCardRowLeftBox">
                <span className="accountNickname">
                  {data.account_nickname.toUpperCase()}
                </span>
                <span className="accountOwner">
                  Owner: {data.account_owner_name}
                </span>
                <span className="accountCurrency">
                  Currency: {data.account_currency}
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
                          {data.account_balance.toLocaleString("en-US")}
                        </span>
                        <img
                          src={editIcon}
                          className="editValueIcon"
                          alt="Edit Value"
                        />
                      </motion.div>
                      <span className="currentValueText">Current Value</span>
                    </Fragment>
                  )}
                </Fragment>
              </div>
            </div>
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default CashAccounts;
