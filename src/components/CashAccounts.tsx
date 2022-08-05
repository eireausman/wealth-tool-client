import React, { useState, useEffect } from "react";
import { cashAccountAPIData } from "../modules/typeInterfaces";
import { getCashAccountData } from "../modules/serverRequests";

const CashAccounts = () => {
  const [cashAccountAPIData, setcashAccountAPIData] =
    useState<Array<cashAccountAPIData>>();

  useEffect(() => {
    getCashAccountData()
      .then((data: Array<cashAccountAPIData>) => {
        setcashAccountAPIData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {cashAccountAPIData?.map((data) => (
        <div key={data.account_id}>
          <p>{data.account_currency}</p>
          <p>{data.account_id}</p>
          <p>{data.account_nickname}</p>
          <p>{data.account_owner_name}</p>
          <p>{data.userUsersId}</p>
        </div>
      ))}
    </div>
  );
};

export default CashAccounts;
