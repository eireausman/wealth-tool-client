import React, { useState, useEffect, Fragment } from "react";
import {
  InvestmentsProps,
  investmentsAPIData,
} from "../modules/typeInterfaces";
import { getInvestmentData } from "../modules/serverRequests";
import { motion } from "framer-motion";
import CardSpinner from "./CardSpinner";
import "./Investments.css";
import editIcon from "../assets/images/edit.png";
import currencyConvert from "../modules/currencyConvert";

import getDisplayNumber from "../modules/getDisplayNumber";
import InvestmentAddStock from "./InvestmentAddStock";

const Investments: React.FC<InvestmentsProps> = ({
  selectedCurrencyCode,
  selectedCurrencySymbol,
  currencyCodesFromDB,
}) => {
  const [showSpinner, setShowSpinner] = useState<boolean>(true);
  const [propertiesAPIData, setpropertiesAPIData] =
    useState<Array<investmentsAPIData>>();
  const [totalInSelectCur, settotalInSelectCur] = useState<number>();
  const [showAddNewStockForm, setShowAddNewStockForm] =
    useState<boolean>(false);

  const refreshInvestmentsData = async () => {
    const investData: Array<investmentsAPIData> = await getInvestmentData();

    let TotalInSelectCurr: number = 0;

    for (let i = 0; i < investData.length; i += 1) {
      const currentValuePreConversion =
        investData[i].holding_quantity_held *
        investData[i].holding_current_price;
      const convertedValue = await currencyConvert(
        currentValuePreConversion,
        investData[i].holding_currency_code,
        selectedCurrencyCode
      );
      investData[i].displayValueBaseCurrency = currentValuePreConversion;
      investData[i].displayValueConverted = await convertedValue;
      TotalInSelectCurr += investData[i].displayValueConverted;
    }

    settotalInSelectCur(TotalInSelectCurr);
    setpropertiesAPIData(investData);
    setShowSpinner(false);
  };

  useEffect(() => {
    refreshInvestmentsData();
  }, [selectedCurrencyCode]);

  const addANewStock = () => {
    setShowAddNewStockForm(true);
  };

  const updateThisStock = () => {
    console.log("got here");
  };

  return (
    <section className="viewCard">
      {showAddNewStockForm === true && (
        <InvestmentAddStock
          currencyCodesFromDB={currencyCodesFromDB}
          setShowAddNewStockForm={setShowAddNewStockForm}
          refreshInvestmentsData={refreshInvestmentsData}
        />
      )}
      {showSpinner === true ? (
        <CardSpinner cardTitle="Properties" />
      ) : (
        <Fragment>
          <Fragment>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="viewCardHeaderRow"
            >
              <h3 className="viewCardHeading">INVESTMENTS</h3>
              <h3 className="viewCardTotal">
                {" "}
                {selectedCurrencySymbol} {getDisplayNumber(totalInSelectCur!)}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="buttonWhite buttonAddNewEntry"
                  onClick={addANewStock}
                >
                  + Add Stock
                </motion.button>
              </h3>
            </motion.div>
            <div className="viewCardRow">
              <table className="investmentsTable">
                <thead>
                  <tr>
                    <td className="columnInWideView">HOLDING NAME</td>
                    <td className="columnInWideView">OWNER</td>
                    <td className="columnNotInNarrowTable"> QUANTITY</td>
                    <td className="columnNotInNarrowTable"> PRICE</td>
                    <td className="columnInWideView">VALUE</td>
                  </tr>
                </thead>
                <tbody>
                  {propertiesAPIData?.map((data) => (
                    <tr onClick={updateThisStock} key={data.holding_id}>
                      <td className="columnInWideView">
                        {data.holding_stock_name}
                      </td>
                      <td className="columnInWideView">
                        {data.holding_owner_name}
                      </td>

                      <td className="columnNotInNarrowTable">
                        {" "}
                        {data.holding_quantity_held}
                      </td>
                      <td className="columnNotInNarrowTable">
                        {" "}
                        {data.holding_current_price}
                      </td>
                      <td className="columnInWideView">
                        {data.displayValueConverted !==
                        data.displayValueBaseCurrency ? (
                          <div>
                            {selectedCurrencySymbol}{" "}
                            {getDisplayNumber(data.displayValueConverted)}
                            <br />
                            {data.holding_currency_symbol}{" "}
                            {getDisplayNumber(data.displayValueBaseCurrency)}
                          </div>
                        ) : (
                          <div>
                            {selectedCurrencySymbol}{" "}
                            {getDisplayNumber(data.displayValueConverted)}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Fragment>
        </Fragment>
      )}
    </section>
  );
};

export default Investments;
