import React, { useState, useEffect, Fragment } from "react";
import {
  propertiesAPIData,
  PropertiesProps,
  editingPropertyDetails,
} from "../modules/typeInterfaces";
import { getPropertiesData } from "../modules/serverRequests";
import { motion } from "framer-motion";
import CardSpinner from "./CardSpinner";
import "./Properties.css";
import editIcon from "../assets/images/edit.png";
import currencyConvert from "../modules/currencyConvert";
import PropertiesUpdateVal from "./PropertiesUpdateVal";

const Properties: React.FC<PropertiesProps> = ({
  selectedCurrencyCode,
  selectedCurrencySymbol,
}) => {
  const [propertiesAPIData, setPropertiesAPIData] =
    useState<Array<propertiesAPIData>>();
  const [showSpinner, setShowSpinner] = useState<boolean>(true);
  const [propertiesConvertedTotal, setpropertiesConvertedTotal] =
    useState<number>(0);
  const [propertyToEdit, setpropertyToEdit] = useState<number>();
  const [editingPropertyDetails, seteditingPropertyDetails] =
    useState<editingPropertyDetails>();

  const refreshPropertiesValues = async () => {
    if (selectedCurrencyCode !== null) {
      const propData: Array<propertiesAPIData> = await getPropertiesData();

      let TotalInSelectCurr: number = 0;

      for await (let item of propData) {
        const netValue = item.property_valuation - item.property_loan_value;
        console.log(item.property_valuation_currency, selectedCurrencyCode);

        if (item.property_valuation_currency === selectedCurrencyCode) {
          console.log("Got here", new Date());
          item.displayValue = netValue;
        } else {
          console.log(
            netValue,
            item.property_valuation_currency,
            selectedCurrencyCode
          );

          const convertedValue = await currencyConvert(
            netValue,
            item.property_valuation_currency,
            selectedCurrencyCode
          );
          // const convertedValue = netValue * 1.3;

          console.log(convertedValue, new Date());

          item.displayValue = await convertedValue;
        }
        TotalInSelectCurr += item.displayValue;
        console.log(item.displayValue, new Date());
      }
      setpropertiesConvertedTotal(TotalInSelectCurr);
      setPropertiesAPIData(propData);
      setShowSpinner(false);
    }
  };

  useEffect(() => {
    console.log("Runs useEffect", selectedCurrencyCode);
    refreshPropertiesValues();
  }, [selectedCurrencyCode]);

  const editThisProperty = (
    property_id: number,
    property_nickname: string,
    property_valuation: number,
    property_loan_value: number,
    property_valuation_curr_symbol: string
  ) => {
    setpropertyToEdit(property_id);

    const editPropertyDetails = {
      property_id,
      property_nickname,
      property_valuation,
      property_loan_value,
      property_valuation_curr_symbol,
    };
    seteditingPropertyDetails(editPropertyDetails);
  };

  return (
    <section className="viewCard">
      {showSpinner === true ? (
        <CardSpinner cardTitle="Properties" />
      ) : (
        <Fragment>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="viewCardHeaderRow"
          >
            <h3 className="viewCardHeading">PROPERTY</h3>
            <h3 className="viewCardTotal">
              {selectedCurrencySymbol}{" "}
              {propertiesConvertedTotal.toLocaleString("en-US")}
            </h3>
          </motion.div>
          {propertiesAPIData?.map((data) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="viewCardRow PropertyCardRow"
              key={data.property_id}
              onClick={() =>
                editThisProperty(
                  data.property_id,
                  data.property_nickname,
                  data.property_valuation,
                  data.property_loan_value,
                  data.property_valuation_curr_symbol
                )
              }
            >
              {propertyToEdit === data.property_id ? (
                <PropertiesUpdateVal
                  editingPropertyDetails={editingPropertyDetails}
                  refreshPropertiesValues={refreshPropertiesValues}
                />
              ) : (
                <Fragment>
                  <div className="viewCardRowLeftBox">
                    <span className="propertyName">
                      {data.property_nickname.toUpperCase()}
                      <img
                        src={editIcon}
                        className="editValueIcon"
                        alt="Edit Value"
                      />
                    </span>
                    <span className="ownerText">
                      Owner: {data.property_owner_name}
                    </span>
                    <span className="valueBaseCurrency">
                      Currency: {data.property_valuation_currency}
                    </span>
                  </div>
                  <div className="viewCardRowRightBox">
                    <span className="currentValueText">
                      Net {selectedCurrencyCode}:{" "}
                      <span className="calculatedBalanceValue">
                        {selectedCurrencySymbol}{" "}
                        {data.displayValue.toLocaleString("en-US")}
                      </span>
                    </span>

                    <span className="valueBaseCurrency">
                      Valuation: {data.property_valuation_curr_symbol}{" "}
                      {data.property_valuation.toLocaleString("en-US")}
                    </span>
                    <span className="loanValueBaseCurrency">
                      Loan: {data.property_valuation_curr_symbol}{" "}
                      {data.property_loan_value.toLocaleString("en-US")}
                    </span>
                    <span className="netValueBaseCurrency">
                      Net val: {data.property_valuation_curr_symbol}{" "}
                      {(
                        data.property_valuation - data.property_loan_value
                      ).toLocaleString("en-US")}
                    </span>
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
export default Properties;
