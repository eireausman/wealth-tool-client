import React, { useEffect, useRef } from "react";
import { updateCashAccountBalance } from "../modules/serverRequests";
import { CashAccountUpdateBalProps } from "../modules/typeInterfaces";
import "./CashAccountUpdBal.css";
import { motion } from "framer-motion";

const CashAccountUpdBal: React.FC<CashAccountUpdateBalProps> = ({
  setAccountIDToEdit,
  updatedAllAccountBalances,
  editAccountDetail,
  seteditAccountDetail,
}) => {
  useEffect(() => {
    newAccountBalanceInputBox.current !== null &&
      newAccountBalanceInputBox.current.focus();
  }, []);

  const newAccountBalance = (e: React.FormEvent<EventTarget>) => {
    console.log();
    const target = e.target as HTMLInputElement;
    const number = parseInt(target.value);
    const editAccountDetailCopy = { ...editAccountDetail };
    editAccountDetailCopy.account_balance = number;
    seteditAccountDetail(editAccountDetailCopy);
  };

  const cancelForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setAccountIDToEdit(-1);
  };

  const newAccountBalanceInputBox = useRef<HTMLInputElement | null>(null);

  const saveNewAccountBalance = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    updateCashAccountBalance(
      editAccountDetail.account_id!,
      editAccountDetail.account_balance!
    )
      .then((data) => {
        updatedAllAccountBalances();
        setAccountIDToEdit(-1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="editAccountBalForm"
      onSubmit={saveNewAccountBalance}
    >
      <span className="accountNickname">
        {editAccountDetail.account_nickname}
      </span>
      <div className="currencySymbolWrapper">
        {editAccountDetail.currencySymbol}
        <input
          name="newAccountBalanceInputBox"
          className="newAccountBalanceInputBox"
          type="number"
          ref={newAccountBalanceInputBox}
          value={editAccountDetail.account_balance}
          onChange={newAccountBalance}
          required
        />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          className="buttonPrimary buttonCashBalSave"
          type="submit"
        >
          Save
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          className="buttonPrimary buttonCashBalSave"
          onClick={cancelForm}
        >
          Cancel
        </motion.button>
      </div>
    </motion.form>
  );
};

export default CashAccountUpdBal;
