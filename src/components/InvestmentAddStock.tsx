import React, { Fragment, useState } from "react";
import { motion, Target } from "framer-motion";
import {
  AddANewInvestmentProps,
  AddNewInvestmentFormData,
} from "../modules/typeInterfaces";
import "./InvestmentAddStock.css";

const InvestmentAddStock: React.FC<AddANewInvestmentProps> = ({
  currencyCodesFromDB,
}) => {
  const [formData, setformData] = useState<AddNewInvestmentFormData>();

  const cancelForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
  };

  const updateFormDataState = (e: React.FormEvent<EventTarget>) => {
    const formDataCopy: AddNewInvestmentFormData = { ...formData };
    const target = e.target as HTMLInputElement;

    const fieldName =
      target.getAttribute("name") ??
      (target.getAttribute("name") as keyof typeof FormData);
    formDataCopy[fieldName] = target.value;
    setformData(formDataCopy);
  };

  return (
    <Fragment>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="viewCardHeaderRow"
      >
        <h3 className="viewCardHeading">INVESTMENTS</h3>
        <h3 className="viewCardTotal"> Add a new Investment</h3>
      </motion.div>
      <div className="viewCardRow">
        <motion.form
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="addNewStockForm "
        >
          <span className="addNewStockFormHeading">Stock detail</span>
          <label className="newStockInputRow">
            Stock Name
            <input
              name="stockName"
              className="newStockInputField"
              type="text"
              required
              onChange={updateFormDataState}
            />
          </label>

          <label className="newStockInputRow">
            Stock Identifier
            <input
              name="marketIdentifier"
              placeholder="e.g. ASX"
              className="newStockInputField"
              type="text"
              required
              onChange={updateFormDataState}
            />
          </label>
          <label className="newStockInputRow">
            Quantity Held
            <input
              name="quantity"
              className="newStockInputField"
              type="number"
              required
              onChange={updateFormDataState}
            />
          </label>
          <label className="newStockInputRow">
            Stock Currency
            <select
              className="newStockInputField"
              name="currency"
              id="currency"
              onChange={updateFormDataState}
            >
              {currencyCodesFromDB?.map((data) => (
                <option key={data.id} value={data.currency_code}>
                  {data.currency_name}
                </option>
              ))}
            </select>
          </label>

          <label className="newStockInputRow">
            Total cost
            <input
              name="cost"
              className="newStockInputField"
              type="number"
              required
              onChange={updateFormDataState}
            />
          </label>
          <label className="newStockInputRow">
            Current Price
            <input
              name="currentPrice"
              placeholder="e.g. 159c or 159p"
              className="newStockInputField"
              type="number"
              required
              onChange={updateFormDataState}
            />
          </label>
          <label className="newStockInputRow">
            Owner Name
            <input
              name="ownerName"
              className="newStockInputField"
              type="text"
              required
              onChange={updateFormDataState}
            />
          </label>
          <label className="newStockInputRow">
            Broker / Bank Name
            <input
              name="institution"
              className="newStockInputField"
              type="text"
              required
              onChange={updateFormDataState}
            />
          </label>
          <div className="newStockInputRow">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              className="buttonPrimary buttonCashBalSave"
              onClick={cancelForm}
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              className="buttonPrimary buttonCashBalSave"
              type="submit"
            >
              Save
            </motion.button>
          </div>
        </motion.form>

        {/* <motion.form
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="addNewStockForm"
        >
          <span className="accountNickname"></span>

          <input
            name="newAccountBalanceInputBox"
            className="addNewStockFormInputField"
            type="number"
            // ref={x}

            required
          />
          <label htmlFor="Currency">My stock is priced in:</label>

          <select
            className="addNewStockFormCurrencySelector"
            name="Currency"
            id="Currency"
          >
            {currencyCodesFromDB?.map((data) => (
              <option key={data.id} value={data.currency_code}>
                {data.currency_name}
              </option>
            ))}
          </select>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            className="buttonPrimary buttonCashBalSave"
            type="submit"
          >
            Save
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            className="buttonPrimary buttonCashBalSave"
            onClick={cancelForm}
          >
            Cancel
          </motion.button>
        </motion.form> */}
      </div>
    </Fragment>
  );
};

export default InvestmentAddStock;
