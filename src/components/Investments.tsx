import React, { useState, useEffect, Fragment } from "react";
import { InvestmentsProps } from "../modules/typeInterfaces";

import { motion } from "framer-motion";
import CardSpinner from "./CardSpinner";
import "./Investments.css";
import editIcon from "../assets/images/edit.png";

import getDisplayNumber from "../modules/getDisplayNumber";
import InvestmentAddStock from "./InvestmentAddStock";

import { investmentsAPIData } from "../modules/typeInterfaces";
import { getInvestmentData } from "../modules/serverRequests";
import currencyConvert from "../modules/currencyConvert";

const Investments: React.FC<InvestmentsProps> = ({
  selectedCurrencyCode,
  selectedCurrencySymbol,
  currencyCodesFromDB,
}) => {
  const [showSpinner, setShowSpinner] = useState<boolean>(true);

  const [showAddNewStockForm, setShowAddNewStockForm] =
    useState<boolean>(false);
  const [investmentAPIData, setinvestmentAPIData] =
    useState<Array<investmentsAPIData>>();
  const [investmentsTotalValue, setInvestmentsTotalValue] = useState<number>(0);

  const refreshInvestmentsData = async () => {
    const investData: Array<investmentsAPIData> = await getInvestmentData();

    let netTotalInSelectCur: number = 0;

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

      netTotalInSelectCur += convertedValue;
    }
    setinvestmentAPIData(investData);
    setInvestmentsTotalValue(netTotalInSelectCur);
  };

  // load initial API data
  // useEffect(() => {
  //   refreshInvestmentsData();
  // }, []);

  //reload API data if currency changes:
  useEffect(() => {
    refreshInvestmentsData();
  }, [selectedCurrencyCode]);

  // remove the loading status if cash account data populated in state
  useEffect(() => {
    if (investmentAPIData && investmentAPIData.length !== 0) {
      setShowSpinner(false);
    }
  }, [investmentAPIData]);

  const addANewStock = () => {
    setShowAddNewStockForm(true);
  };

  const updateThisStock = () => {
    console.log("got here");
  };

  const closeModal = (e: React.FormEvent<EventTarget>) => {
    const target = e.target as HTMLElement;
    if (target.className === "newAdditionModal") {
      setShowAddNewStockForm(false);
    }
  };

  return (
    <section className="viewCard">
      {showSpinner === true ? (
        <CardSpinner cardTitle="Investments" />
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
                {selectedCurrencySymbol}{" "}
                {getDisplayNumber(investmentsTotalValue)}
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
                  {investmentAPIData?.map((data) => (
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
      {showAddNewStockForm === true && (
        <div className="newAdditionModal" onClick={(e) => closeModal(e)}>
          <div className="newAdditionModalInner">
            <InvestmentAddStock
              currencyCodesFromDB={currencyCodesFromDB}
              setShowAddNewStockForm={setShowAddNewStockForm}
              refreshInvestmentsData={refreshInvestmentsData}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Investments;
