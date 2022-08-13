import React, { useState, useEffect, Fragment } from "react";
import {
  cashAccountAPIData,
  CashAccountsProps,
  editAccountDetail,
} from "../modules/typeInterfaces";
import { getCashAccountData } from "../modules/serverRequests";
import CashAccountUpdBal from "./CashAccountUpdBal";
import { motion } from "framer-motion";
import "./CashAccounts.css";
import editIcon from "../assets/images/edit.png";
import currencyConvert from "../modules/currencyConvert";
import CardSpinner from "./CardSpinner";
import getDisplayNumber from "../modules/getDisplayNumber";

const CashAccounts: React.FC<CashAccountsProps> = ({
  selectedCurrencyCode,
  selectedCurrencySymbol,
}) => {
  const [cashAccountAPIData, setcashAccountAPIData] =
    useState<Array<cashAccountAPIData>>();
  const [cashAccountsTotal, setcashAccountsTotal] = useState<number>(0);
  const [accountIDToEdit, setAccountIDToEdit] = useState<number>();

  const [editAccountDetail, seteditAccountDetail] =
    useState<editAccountDetail>();

  const [showSpinner, setShowSpinner] = useState<boolean>(true);

  const updatedAllAccountBalances = async () => {
    const cashAcData: Array<cashAccountAPIData> = await getCashAccountData();
    let TotalInSelectCurr: number = 0;
    for (let item of cashAcData) {
      const convertedValue = await currencyConvert(
        item.account_balance,
        item.account_currency_code,
        selectedCurrencyCode
      );
      item.displayValue = await convertedValue;

      TotalInSelectCurr += item.displayValue;
    }
    setcashAccountsTotal(TotalInSelectCurr);
    setcashAccountAPIData(cashAcData);
    setShowSpinner(false);
  };

  useEffect(() => {
    updatedAllAccountBalances();
  }, [selectedCurrencyCode]);

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
              {selectedCurrencySymbol} {getDisplayNumber(cashAccountsTotal)}
            </h3>
          </motion.div>

          {cashAccountAPIData?.map((data) => (
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
          ))}
        </Fragment>
      )}
    </section>
  );
};

export default CashAccounts;
