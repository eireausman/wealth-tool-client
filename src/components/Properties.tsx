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
import getDisplayNumber from "../modules/getDisplayNumber";

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
    const propData: Array<propertiesAPIData> = await getPropertiesData();

    let TotalInSelectCurr: number = 0;

    for (let i = 0; i < propData.length; i += 1) {
      const netValue =
        propData[i].property_valuation - propData[i].property_loan_value;

      const convertedValue = await currencyConvert(
        netValue,
        propData[i].property_valuation_currency,
        selectedCurrencyCode
      );

      propData[i].displayValue = await convertedValue;

      TotalInSelectCurr += propData[i].displayValue;
    }
    setpropertiesConvertedTotal(TotalInSelectCurr);
    setPropertiesAPIData(propData);
    setShowSpinner(false);
  };

  useEffect(() => {
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
              {getDisplayNumber(propertiesConvertedTotal)}
            </h3>
          </motion.div>
          {propertiesAPIData?.map((data) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="viewCardRow"
              key={data.property_id}
            >
              {propertyToEdit === data.property_id ? (
                <PropertiesUpdateVal
                  setpropertyToEdit={setpropertyToEdit}
                  editingPropertyDetails={editingPropertyDetails}
                  seteditingPropertyDetails={seteditingPropertyDetails}
                  refreshPropertiesValues={refreshPropertiesValues}
                />
              ) : (
                <Fragment>
                  <div
                    className="viewCardRowLeftBox PropertyLeftBox"
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
                    <table className="valuesTable">
                      <tbody>
                        <tr className="calculatedBalanceValueRow">
                          <td>Net {selectedCurrencyCode}: </td>
                          <td>
                            {selectedCurrencySymbol}{" "}
                            {getDisplayNumber(data.displayValue)}
                          </td>
                        </tr>
                        <tr>
                          <td>Valuation: </td>
                          <td>
                            {data.property_valuation_curr_symbol}{" "}
                            {getDisplayNumber(data.property_valuation)}
                          </td>
                        </tr>
                        <tr>
                          <td>Loan: </td>
                          <td>
                            {data.property_valuation_curr_symbol}{" "}
                            {getDisplayNumber(data.property_loan_value)}
                          </td>
                        </tr>
                        <tr>
                          <td>Net Val: </td>
                          <td>
                            {data.property_valuation_curr_symbol}{" "}
                            {getDisplayNumber(data.displayValue)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
