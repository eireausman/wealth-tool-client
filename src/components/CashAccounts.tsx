import React, { useState, useEffect, Fragment } from "react";
import {
  CashAccountsProps,
  editAccountDetail,
} from "../modules/typeInterfaces";
import { motion } from "framer-motion";
import "./CashAccounts.css";
import CardSpinner from "./CardSpinner";
import getDisplayNumber from "../modules/getDisplayNumber";
import CashAccountAddAcc from "./CashAccountAddAcc";
import { cashAccountAPIData } from "../modules/typeInterfaces";
import { getCashAccountData } from "../modules/serverRequests";
import currencyConvert from "../modules/currencyConvert";
import CashAccountUpdBal from "./CashAccountUpdBal";
import editIcon from "../assets/images/edit.png";

const CashAccounts: React.FC<CashAccountsProps> = ({
  selectedCurrencyCode,
  selectedCurrencySymbol,
  currencyCodesFromDB,
  settriggerRecalculations,
  triggerRecalculations,
}) => {
  const [accountIDToEdit, setAccountIDToEdit] = useState<number>();
  const [editAccountDetail, seteditAccountDetail] =
    useState<editAccountDetail>();
  const [showSpinner, setShowSpinner] = useState<boolean>(true);
  const [showAddNewForm, setshowAddNewForm] = useState(false);
  const [cashAccountNetTotal, setcashAccountNetTotal] = useState<number>(0);
  const [styleForHoverDiv, setStyleForHoverDiv] = useState<object>({
    opacity: 0,
  });
  const [styleRowID, setstyleRowID] = useState<number>(-1);
  const [cashAccAPIData, setcashAccAPIData] =
    useState<Array<cashAccountAPIData>>();

  const updatedAllAccountBalances = async () => {
    const cashAcData: Array<cashAccountAPIData> = await getCashAccountData(
      selectedCurrencyCode
    );

    let netTotalInSelectCur: number = 0;

    for (let item of cashAcData) {
      const convertedValue = await currencyConvert(
        item.account_balance,
        item.account_currency_code,
        selectedCurrencyCode
      );
      item.displayValue = await convertedValue;

      netTotalInSelectCur += convertedValue;
    }
    setcashAccAPIData(cashAcData);
    setcashAccountNetTotal(netTotalInSelectCur);
  };

  //reload API data if currency changes:
  useEffect(() => {
    updatedAllAccountBalances();
  }, [selectedCurrencyCode]);

  // remove the loading status if cash account data populated in state
  useEffect(() => {
    if (cashAccAPIData && cashAccAPIData.length !== 0) {
      setShowSpinner(false);
    }
  }, [cashAccAPIData]);

  const showAddNewCashAccForm = () => {
    setshowAddNewForm(true);
  };

  const editAccountBalance = (
    account_id: number,
    currentAccountValue: number,
    account_currency_symbol: string,
    account_currency_code: string,
    account_nickname: string
  ) => {
    setAccountIDToEdit(account_id);

    const editAccountDetail = {
      account_id,
      account_balance: currentAccountValue,
      currencySymbol: account_currency_symbol,
      currencyCode: account_currency_code,
      account_nickname,
    };
    seteditAccountDetail(editAccountDetail);
  };

  const closeModal = (e: React.FormEvent<EventTarget>) => {
    const target = e.target as HTMLElement;
    if (target.className === "newAdditionModal") {
      setshowAddNewForm(false);
    }
  };

  return (
    <section className="viewCard">
      {showSpinner === true ? (
        <CardSpinner cardTitle="Cash Accounts" />
      ) : (
        <Fragment>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="viewCardHeaderRow"
          >
            <h3 className="viewCardHeading">CASH ACCOUNTS</h3>
            <h3 className="viewCardTotal">
              {selectedCurrencySymbol} {getDisplayNumber(cashAccountNetTotal)}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="buttonWhite buttonAddNewEntry"
                onClick={showAddNewCashAccForm}
              >
                + Add Account
              </motion.button>
            </h3>
          </motion.div>
          <section className="cashAccountsTable">
            <header className="cashAccountsTableHeader">
              <div className="table-header">A/c Name</div>
              <div className="table-header">Owner</div>
              <div className="table-header">Balance</div>
              <div className="table-header">Converted</div>
            </header>
            <section className="cashAccountsTableDataContainer">
              {cashAccAPIData?.map((data, index) => (
                <Fragment key={data.account_id}>
                  {accountIDToEdit === data.account_id ? (
                    <CashAccountUpdBal
                      setAccountIDToEdit={setAccountIDToEdit}
                      updatedAllAccountBalances={updatedAllAccountBalances}
                      editAccountDetail={editAccountDetail!}
                      seteditAccountDetail={seteditAccountDetail}
                      settriggerRecalculations={settriggerRecalculations}
                      triggerRecalculations={triggerRecalculations}
                    />
                  ) : (
                    <div
                      className="cashAccountsTableDataGridRow"
                      onClick={() =>
                        editAccountBalance(
                          data.account_id,
                          data.account_balance,
                          data.account_currency_symbol,
                          data.account_currency_code,
                          data.account_nickname
                        )
                      }
                      onMouseEnter={(e) => {
                        setstyleRowID(data.account_id);
                        setStyleForHoverDiv({ opacity: "1" });
                      }}
                      onMouseLeave={(e) => {
                        setStyleForHoverDiv({ opacity: "0" });
                        setstyleRowID(-1);
                      }}
                    >
                      <div>
                        {data.account_nickname.toUpperCase()}
                        <img
                          src={editIcon}
                          className="editValueIcon"
                          alt="Edit Value"
                          style={
                            styleRowID === data.account_id
                              ? styleForHoverDiv
                              : { opacity: "0" }
                          }
                        />
                      </div>
                      <div>{data.account_owner_name.toUpperCase()}</div>
                      <div>
                        {" "}
                        {data.account_currency_symbol}{" "}
                        {getDisplayNumber(data.account_balance)}
                      </div>
                      <div>
                        {" "}
                        {selectedCurrencySymbol}{" "}
                        {getDisplayNumber(data.displayValue)}
                      </div>
                    </div>
                  )}
                </Fragment>
              ))}
            </section>
          </section>
          {/* {cashAccountAPIData?.map((data) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="viewCardRow"
              key={data.account_id}
            >
              {accountIDToEdit === data.account_id ? (
                <CashAccountUpdBal
                  setAccountIDToEdit={setAccountIDToEdit}
                  updatedAllAccountBalances={updatedAllAccountBalances}
                  editAccountDetail={editAccountDetail!}
                  seteditAccountDetail={seteditAccountDetail}
                />
              ) : (
                <Fragment>
                  <div className="viewCardRowLeftBox">
                    <span className="accountNickname">
                      {data.account_nickname.toUpperCase()}
                    </span>
                    <span className="accountOwner">
                      Owner: {data.account_owner_name}
                    </span>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      whileTap={{ scale: 0.9 }}
                      className="baseCurrencyWrapperDiv"
                      onClick={() =>
                        editAccountBalance(
                          data.account_id,
                          data.account_balance,
                          data.account_currency_symbol,
                          data.account_currency_code,
                          data.account_nickname
                        )
                      }
                    >
                      <span className="accountValueBaseCurrency">
                        {data.account_currency_symbol}{" "}
                        {getDisplayNumber(data.account_balance)}
                      </span>
                      <img
                        src={editIcon}
                        className="editValueIcon"
                        alt="Edit Value"
                      />
                    </motion.div>
                  </div>

                  <div className="viewCardRowRightBox">
                    <Fragment>
                      <span className="currentValueText">
                        {selectedCurrencyCode} value:
                      </span>
                      <span className="calculatedBalanceValue">
                        {selectedCurrencySymbol}{" "}
                        {getDisplayNumber(data.displayValue)}
                      </span>
                    </Fragment>
                  </div>
                </Fragment>
              )}
            </motion.div>
          ))} */}
        </Fragment>
      )}
      {showAddNewForm === true && (
        <div className="newAdditionModal" onClick={(e) => closeModal(e)}>
          <div className="newAdditionModalInner">
            {" "}
            <CashAccountAddAcc
              currencyCodesFromDB={currencyCodesFromDB}
              setshowAddNewForm={setshowAddNewForm}
              updatedAllAccountBalances={updatedAllAccountBalances}
              settriggerRecalculations={settriggerRecalculations}
              triggerRecalculations={triggerRecalculations}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default CashAccounts;
