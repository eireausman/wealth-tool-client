import React, { useState, useEffect } from "react";
import { cashAccountAPIData } from "../modules/typeInterfaces";
import {
  getCashAccountData,
  updateCashAccountBalance,
} from "../modules/serverRequests";

const CashAccounts = () => {
  const [cashAccountAPIData, setcashAccountAPIData] =
    useState<Array<cashAccountAPIData>>();
  const [editThisAccountBalanceValue, setEditThisAccountBalanceValue] =
    useState<number>();
  const [editedAccountBalance, setEditedAccountBalance] = useState<number>();

  const updatedAllAccountBalances = () => {
    getCashAccountData()
      .then((data: Array<cashAccountAPIData>) => {
        setcashAccountAPIData(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    updatedAllAccountBalances();
  }, []);

  const editAccountBalance = (account_id: number) => {
    setEditThisAccountBalanceValue(account_id);
  };

  const newAccountBalance = (e: React.FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    const number = parseInt(target.value);
    setEditedAccountBalance(number);
  };

  const saveNewAccountBalance = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    console.log(editedAccountBalance);
    updateCashAccountBalance(
      editThisAccountBalanceValue!,
      editedAccountBalance!
    )
      .then((data) => {
        updatedAllAccountBalances();
        setEditThisAccountBalanceValue(-1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {cashAccountAPIData?.map((data) => (
        <div key={data.account_id}>
          <p>{data.account_currency}</p>
          <p>{data.account_id}</p>
          <p>{data.account_nickname}</p>
          <p>{data.account_owner_name}</p>
          <p>{data.userUsersId}</p>
          {editThisAccountBalanceValue === data.account_id ? (
            <form onSubmit={saveNewAccountBalance}>
              <input
                name="new_account_balance"
                type="number"
                value={editedAccountBalance}
                onChange={newAccountBalance}
              />
              <button type="submit">Save New Balance</button>
            </form>
          ) : (
            <button onClick={() => editAccountBalance(data.account_id)}>
              Update Balance
            </button>
          )}
          <p>{data.account_balance}</p>
        </div>
      ))}
    </div>
  );
};

export default CashAccounts;
