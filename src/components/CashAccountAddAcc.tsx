import React, { Fragment, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  AddNewCashAccountPropProps,
  AddNewCashAccountFormData,
} from "../modules/typeInterfaces";
import "./CashAccountAddAcc.css";
import { addNewCashAccount } from "../modules/serverRequests";
const CashAccountAddAcc: React.FC<AddNewCashAccountPropProps> = ({
  currencyCodesFromDB,
  setshowAddNewForm,
  updatedAllAccountBalances,
  settriggerRecalculations,
  triggerRecalculations,
}) => {
  const [formData, setformData] = useState<AddNewCashAccountFormData>();
  const currencyCodeSelection = useRef<HTMLSelectElement | null>(null);

  const cancelForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setshowAddNewForm(false);
  };

  const updateFormDataState = (e: React.FormEvent<EventTarget>) => {
    const formDataCopy: AddNewCashAccountFormData = { ...formData };
    const target = e.target as HTMLInputElement;

    const fieldName =
      target.getAttribute("name") ??
      (target.getAttribute("name") as keyof typeof formData);

    formDataCopy[fieldName] = target.value;
    setformData(formDataCopy);
  };

  const saveNewCashAccount = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    // figure out the currency symbol to add to the db
    const currencyCodeForSubmission = currencyCodeSelection.current!.value;
    let currencySymbolForSubmission = "";
    currencyCodesFromDB?.forEach((currencyEntry) => {
      if (currencyEntry.currency_code === currencyCodeForSubmission) {
        currencySymbolForSubmission = currencyEntry.currency_symbol;
      }
    });

    const formDataForSubmission = {
      account_nickname: formData?.account_nickname,
      account_number_last4_digits: formData?.account_number_last4_digits,
      account_owner_name: formData?.account_owner_name,
      account_balance: formData?.account_balance,
      account_currency_code: currencyCodeForSubmission,
      account_currency_symbol: currencySymbolForSubmission,
    };

    addNewCashAccount(formDataForSubmission)
      .then((data) => {
        console.log(data);
        settriggerRecalculations(triggerRecalculations + 1);
        updatedAllAccountBalances();
        setshowAddNewForm(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="viewCardRow">
      <motion.form
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="addNewCashAccForm"
        onSubmit={(e) => saveNewCashAccount(e)}
      >
        <span className="addNewPropFormHeading">New Cash Account Detail</span>
        <label className="newCashAccInputRow">
          Account Nickname
          <input
            name="account_nickname"
            className="newCashAccInputField"
            type="text"
            required
            onChange={updateFormDataState}
          />
        </label>
        <label className="newCashAccInputRow">
          Account number last 4 digits
          <input
            name="account_number_last4_digits"
            className="newCashAccInputField"
            type="number"
            required
            maxLength={4}
            onChange={updateFormDataState}
          />
        </label>
        <label className="newCashAccInputRow">
          Owner's Name
          <input
            name="account_owner_name"
            className="newCashAccInputField"
            type="text"
            required
            onChange={updateFormDataState}
          />
        </label>
        <label className="newCashAccInputRow">
          Account Balance
          <input
            name="account_balance"
            placeholder="e.g. 1000"
            className="newCashAccInputField"
            type="number"
            required
            onChange={updateFormDataState}
          />
        </label>
        <label className="newCashAccInputRow">
          Based in this currency:
          <select
            className="newCashAccInputField"
            name="currencyCode"
            id="currencyCode"
            ref={currencyCodeSelection}
            onChange={updateFormDataState}
          >
            {currencyCodesFromDB?.map((data) => (
              <option key={data.id} value={data.currency_code}>
                {data.currency_name}
              </option>
            ))}
          </select>
        </label>

        <div className="newCashAccInputRow">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            className="buttonPrimary buttonCashBalSave"
            onClick={cancelForm}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            className="buttonPrimary buttonCashBalSave"
            type="submit"
          >
            Save
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default CashAccountAddAcc;
