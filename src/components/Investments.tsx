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
import InvestmentsUpdateStock from "./InvestmentsUpdateStock";

const Investments: React.FC<InvestmentsProps> = ({
  selectedCurrencyCode,
  selectedCurrencySymbol,
  currencyCodesFromDB,
  settriggerRecalculations,
  triggerRecalculations,
}) => {
  const [showSpinner, setShowSpinner] = useState<boolean>(true);
  const [stockIDToEdit, setStockIDToEdit] = useState<number>(-1);
  const [showAddNewStockForm, setShowAddNewStockForm] =
    useState<boolean>(false);
  const [investmentAPIData, setinvestmentAPIData] =
    useState<Array<investmentsAPIData>>();
  const [investmentsTotalValue, setInvestmentsTotalValue] = useState<number>(0);
  const [styleForHoverDiv, setStyleForHoverDiv] = useState<object>({
    opacity: 0,
  });
  const [styleRowID, setstyleRowID] = useState<number>(-1);

  const refreshInvestmentsData = async () => {
    const investData: Array<investmentsAPIData> = await getInvestmentData(
      selectedCurrencyCode
    );

    let netTotalInSelectCur: number = 0;

    setinvestmentAPIData(investData);
    setInvestmentsTotalValue(netTotalInSelectCur);
  };

  const editStockID = (holding_id: number) => {
    setStockIDToEdit(holding_id);
  };

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
            <section className="investmentsTable">
              <header className="investmentsTableHeader">
                <div className="table-header">Holding</div>
                <div className="table-header columnInWideViewOnly">Owner</div>
                <div className="table-header columnInWideViewOnly">Held at</div>
                <div className="table-header columnInWideViewOnly">
                  Currency
                </div>
                <div className="table-header">Quantity</div>
                <div className="table-header ">Price</div>
                <div className="table-header columnInWideViewOnly">Cost</div>
                <div className="table-header">Value</div>
              </header>
              <section className="investmentsTableDataContainer">
                {investmentAPIData?.map((data, index) => (
                  <Fragment key={data.account_id}>
                    {stockIDToEdit === data.account_id ? (
                      <InvestmentsUpdateStock />
                    ) : (
                      <div
                        className="investmentsTableDataGridRow"
                        onClick={() => editStockID(data.holding_id)}
                        onMouseEnter={(e) => {
                          setstyleRowID(data.holding_id);
                          setStyleForHoverDiv({ opacity: "1" });
                        }}
                        onMouseLeave={(e) => {
                          setStyleForHoverDiv({ opacity: "0" });
                          setstyleRowID(-1);
                        }}
                      >
                        <div>
                          {data.holding_stock_name.toUpperCase()}
                          <img
                            src={editIcon}
                            className="editValueIcon"
                            alt="Edit Value"
                            style={
                              styleRowID === data.holding_id
                                ? styleForHoverDiv
                                : { opacity: "0" }
                            }
                          />
                        </div>
                        <div className="columnInWideViewOnly">
                          {data.holding_owner_name.toUpperCase()}
                        </div>
                        <div> {data.holding_institution}</div>
                        <div className="columnInWideViewOnly">
                          {" "}
                          {data.holding_currency_code}
                        </div>
                        <div>
                          {getDisplayNumber(data.holding_quantity_held)}
                        </div>
                        <div>
                          {" "}
                          {selectedCurrencySymbol}{" "}
                          {getDisplayNumber(data.holding_current_price)}
                        </div>
                        <div className="columnInWideViewOnly">
                          {" "}
                          {data.holding_cost_total_value}
                        </div>
                        <div> {data.investmentConvertedValue}</div>
                      </div>
                    )}
                  </Fragment>
                ))}
              </section>
            </section>
            {/* <div className="viewCardRow">
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
            </div> */}
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
              settriggerRecalculations={settriggerRecalculations}
              triggerRecalculations={triggerRecalculations}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Investments;
