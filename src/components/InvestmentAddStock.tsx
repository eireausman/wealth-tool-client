import React, { Fragment, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  AddANewInvestmentProps,
  AddNewInvestmentFormData,
} from "../modules/typeInterfaces";
import "./InvestmentAddStock.css";
import { addnewinvestment } from "../modules/serverRequests";

const InvestmentAddStock: React.FC<AddANewInvestmentProps> = ({
  currencyCodesFromDB,
  setShowAddNewStockForm,
  refreshInvestmentsData,
}) => {
  const [formData, setformData] = useState<AddNewInvestmentFormData>();
  const currencyCodeSelection = useRef<HTMLSelectElement | null>(null);

  const cancelForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setShowAddNewStockForm(false);
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

  const saveNewInvestment = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    // figure out the currency symbol to add to the db
    const currencyCodeForSubmission = currencyCodeSelection.current!.value;
    let currencySymbolForSubmission = "";
    currencyCodesFromDB?.forEach((currencyEntry) => {
      if (currencyEntry.currency_code === currencyCodeForSubmission) {
        currencySymbolForSubmission = currencyEntry.currency_symbol;
      }
    });

    const formDataForSubmission = {
      stockName: formData?.stockName,
      identifier: formData?.identifier,
      quantity: formData?.quantity,
      currencyCode: currencyCodeForSubmission,
      currencySymbol: currencySymbolForSubmission,
      currentPrice: formData?.currentPrice,
      ownerName: formData?.ownerName,
      institution: formData?.institution,
      cost: formData?.cost,
    };

    addnewinvestment(formDataForSubmission)
      .then((data) => {
        console.log(data);
        refreshInvestmentsData();
        setShowAddNewStockForm(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <div className="viewCardRow">
        <motion.form
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="addNewStockForm"
          onSubmit={(e) => saveNewInvestment(e)}
        >
          <span className="addNewStockFormHeading">Stock detail</span>
          <label className="newStockInputRow">
            Stock Name
            <input
              name="stockName"
              className="newStockInputField"
              type="text"
              required
              minLength={3}
              maxLength={40}
              onChange={updateFormDataState}
            />
          </label>

          <label className="newStockInputRow">
            Stock Identifier
            <input
              name="identifier"
              placeholder="e.g. ASX"
              className="newStockInputField"
              type="text"
              required
              minLength={3}
              maxLength={3}
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
              name="currencyCode"
              id="currencyCode"
              ref={currencyCodeSelection}
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
              minLength={3}
              maxLength={20}
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
              minLength={3}
              maxLength={35}
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
      </div>
    </Fragment>
  );
};

export default InvestmentAddStock;
