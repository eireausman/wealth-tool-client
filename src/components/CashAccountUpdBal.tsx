import React, { useState, useEffect, useRef } from "react";
import { updateCashAccountBalance } from "../modules/serverRequests";
import { CashAccountUpdateBalProps } from "../modules/typeInterfaces";
import "./CashAccountUpdBal.css";

const CashAccountUpdBal: React.FC<CashAccountUpdateBalProps> = ({
  editThisAccountBalanceValue,
  setAccountIDToEdit,
  updatedAllAccountBalances,
  accountToEditCurBal,
}) => {
  const [editedAccountBalance, setEditedAccountBalance] =
    useState<number>(accountToEditCurBal);

  const newAccountBalance = (e: React.FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    const number = parseInt(target.value);
    setEditedAccountBalance(number);
  };

  const newAccountBalanceInputBox = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    newAccountBalanceInputBox.current !== null &&
      newAccountBalanceInputBox.current.focus();
  }, []);

  const saveNewAccountBalance = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    console.log(editedAccountBalance);
    updateCashAccountBalance(
      editThisAccountBalanceValue!,
      editedAccountBalance!
    )
      .then((data) => {
        updatedAllAccountBalances();
        setAccountIDToEdit(-1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="editAccountBalForm" onSubmit={saveNewAccountBalance}>
      <input
        name="newAccountBalanceInputBox"
        className="newAccountBalanceInputBox"
        type="number"
        ref={newAccountBalanceInputBox}
        value={editedAccountBalance}
        onChange={newAccountBalance}
        required
      />
      <span className="displayEditedBalance">
        {editedAccountBalance.toLocaleString("en-US")}
      </span>
      <button type="submit">
        Save as {editedAccountBalance.toLocaleString("en-US")}
      </button>
    </form>
  );
};

export default CashAccountUpdBal;
