import React, { Fragment, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  PropertiesNewPropProps,
  AddNewPropertyFormData,
} from "../modules/typeInterfaces";
import "./PropertiesNewProp.css";
import { addNewProperty } from "../modules/serverRequests";

const PropertiesNewProp: React.FC<PropertiesNewPropProps> = ({
  currencyCodesFromDB,
  setshowAddNewForm,
  refreshPropertiesValues,
  settriggerRecalculations,
  triggerRecalculations,
}) => {
  const [formData, setformData] = useState<AddNewPropertyFormData>();
  const currencyCodeSelection = useRef<HTMLSelectElement | null>(null);

  const cancelForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setshowAddNewForm(false);
  };

  const updateFormDataState = (e: React.FormEvent<EventTarget>) => {
    const formDataCopy: AddNewPropertyFormData = { ...formData };
    const target = e.target as HTMLInputElement;

    const fieldName =
      target.getAttribute("name") ??
      (target.getAttribute("name") as keyof typeof FormData);

    formDataCopy[fieldName] = target.value;
    setformData(formDataCopy);
  };

  const saveNewProperty = (e: React.FormEvent<EventTarget>) => {
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
      property_nickname: formData?.propName,
      property_owner_name: formData?.propOwner,
      property_valuation: formData?.propValue,
      property_loan_value: formData?.propLoan,
      currencyCode: currencyCodeForSubmission,
      currencySymbol: currencySymbolForSubmission,
    };

    addNewProperty(formDataForSubmission)
      .then((data) => {
        console.log(data);
        settriggerRecalculations(triggerRecalculations + 1);
        refreshPropertiesValues();
        setshowAddNewForm(false);
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
          className="addNewPropForm"
          onSubmit={(e) => saveNewProperty(e)}
        >
          <span className="addNewPropFormHeading">Property detail</span>
          <label className="newPropInputRow">
            Property Name
            <input
              name="propName"
              className="newPropInputField"
              type="text"
              required
              onChange={updateFormDataState}
            />
          </label>
          <label className="newPropInputRow">
            Owner's Name
            <input
              name="propOwner"
              className="newPropInputField"
              type="text"
              required
              onChange={updateFormDataState}
            />
          </label>
          <label className="newPropInputRow">
            Valued in this currency:
            <select
              className="newPropInputField"
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
          <label className="newPropInputRow">
            Valuation
            <input
              name="propValue"
              placeholder="e.g. 1000"
              className="newPropInputField"
              type="number"
              required
              onChange={updateFormDataState}
            />
          </label>
          <label className="newPropInputRow">
            Outstanding Loan
            <input
              name="propLoan"
              placeholder="e.g. 1000"
              className="newPropInputField"
              type="number"
              required
              onChange={updateFormDataState}
            />
          </label>

          <div className="newPropInputRow">
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

export default PropertiesNewProp;
