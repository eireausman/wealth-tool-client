import React, { useState, useEffect, Fragment } from "react";
import {
  InvestmentsProps,
  investmentsAPIData,
} from "../modules/typeInterfaces";
import { getInvestmentData } from "../modules/serverRequests";
import { motion } from "framer-motion";
import CardSpinner from "./CardSpinner";
import "./Properties.css";
import editIcon from "../assets/images/edit.png";
import currencyConvert from "../modules/currencyConvert";

import getDisplayNumber from "../modules/getDisplayNumber";

const Investments: React.FC<InvestmentsProps> = (
  selectedCurrencyCode,
  selectedCurrencySymbol
) => {
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const refreshInvestmentsData = async () => {
    const investData: Array<investmentsAPIData> = await getInvestmentData();
    console.log(investData);

    let TotalInSelectCurr: number = 0;

    // for (let i = 0; i < investData.length; i += 1) {
    //   const convertedValue = await currencyConvert(
    //     investData[i].
    //     investData[i].property_valuation_currency,
    //     selectedCurrencyCode
    //   );

    //   investData[i].displayValue = await convertedValue;

    //   TotalInSelectCurr += investData[i].displayValue;
    // }
    // setpropertiesConvertedTotal(TotalInSelectCurr);
    // setPropertiesAPIData(investData);
    // setShowSpinner(false);
  };

  useEffect(() => {
    refreshInvestmentsData();
  }, [selectedCurrencyCode]);

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
            <h3 className="viewCardHeading">INVESTMENTS</h3>
            <h3 className="viewCardTotal"></h3>
          </motion.div>
          <table className="tableRoundedCorner">
            <thead>
              <tr>
                <td className="columnInWideView"> Leave This</td>
                <td className="columnNotInNarrowTable"> Disappear This</td>
                <td className="columnInWideView"> Leave This</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="columnInWideView"> Leave This</td>
                <td className="columnNotInNarrowTable"> Disappear This</td>
                <td className="columnInWideView"> Leave This</td>
              </tr>
            </tbody>
          </table>
        </Fragment>
      )}
    </section>
  );
};

export default Investments;
