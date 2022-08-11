import React, { useState, useEffect } from "react";
import { propertiesAPIData, PropertiesProps } from "../modules/typeInterfaces";
import { getPropertiesData } from "../modules/serverRequests";

const Properties: React.FC<PropertiesProps> = ({ selectedCurrency }) => {
  const [propertiesAPIData, setPropertiesAPIData] =
    useState<Array<propertiesAPIData>>();

  const refreshPropertiesValues = () => {
    getPropertiesData()
      .then((data) => {
        setPropertiesAPIData(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    refreshPropertiesValues();
  }, []);

  return (
    <div className="viewCard">
      <h3 className="viewCardHeading">PROPERTIES</h3>
      {propertiesAPIData?.map((data) => (
        <div key={data.property_id}>
          <p>{data.property_valuation.toLocaleString("en-US")}</p>
          <p>{data.property_loan_value.toLocaleString("en-US")}</p>
          <p>
            {(
              data.property_valuation - data.property_loan_value
            ).toLocaleString("en-US")}
          </p>
          <p>{data.property_valuation_currency}</p>
          <p>{data.account_owner_name}</p>
        </div>
      ))}
    </div>
  );
};
export default Properties;
