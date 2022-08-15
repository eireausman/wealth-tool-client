import React, { useState, useEffect, useRef, Fragment } from "react";
import { propertiesUpdateValProps } from "../modules/typeInterfaces";
import { motion } from "framer-motion";
import "./PropertiesUpdateVal.css";
import { LanguageVariant, ListFormat } from "typescript";
import { updatePropertyValue } from "../modules/serverRequests";

const PropertiesUpdateVal: React.FC<propertiesUpdateValProps> = ({
  setpropertyToEdit,
  editingPropertyDetails,
  seteditingPropertyDetails,
  refreshPropertiesValues,
}) => {
  const [newPropValue, setNewPropValue] = useState<number>(
    editingPropertyDetails!.property_valuation
  );

  const newPropValueInputBox = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    newPropValueInputBox.current!.focus();
  }, []);

  const saveNewPropValue = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    updatePropertyValue(
      editingPropertyDetails!.property_id,
      editingPropertyDetails!.property_valuation,
      editingPropertyDetails!.property_loan_value
    )
      .then((data) => {
        // refreshPropertiesValues();
        // seteditingPropertyDetails(undefined);
      })
      .catch((err) => console.log(err));
  };

  const newPropValuation = (e: React.FormEvent<EventTarget>) => {
    console.log();
    const target = e.target as HTMLInputElement;
    const number = parseInt(target.value);
    const editingPropertyDetailsCopy = { ...editingPropertyDetails! };
    editingPropertyDetailsCopy.property_valuation = number;
    seteditingPropertyDetails(editingPropertyDetailsCopy);
  };
  const newPropLoanAmount = (e: React.FormEvent<EventTarget>) => {
    console.log();
    const target = e.target as HTMLInputElement;
    const number = parseInt(target.value);
    const editingPropertyDetailsCopy = { ...editingPropertyDetails! };
    editingPropertyDetailsCopy.property_loan_value = number;
    seteditingPropertyDetails(editingPropertyDetailsCopy);
  };
  const cancelForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setpropertyToEdit(-1);
  };
  return (
    <Fragment>
      <span className="propertyName">
        {editingPropertyDetails?.property_nickname.toUpperCase()}
      </span>
      <motion.form
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="editPropertyForm"
        onSubmit={(e) => saveNewPropValue(e)}
      >
        <label className="newPropertyValueInputRow">
          Valuation
          {editingPropertyDetails?.property_valuation_curr_symbol}
          <input
            name="newPropertyValueInputBox"
            className="newPropertyValueInputBox"
            type="number"
            ref={newPropValueInputBox}
            value={editingPropertyDetails?.property_valuation}
            onChange={newPropValuation}
            required
          />
        </label>

        <label className="newPropertyValueInputRow">
          Loan Amount
          {editingPropertyDetails?.property_valuation_curr_symbol}
          <input
            name="newPropertyLoanAmountInputBox"
            className="newPropertyLoanAmountInputBox"
            type="number"
            value={editingPropertyDetails?.property_loan_value}
            onChange={newPropLoanAmount}
            required
          />
        </label>
        <div className="newPropertyValueInputRow">
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
    </Fragment>
  );
};

export default PropertiesUpdateVal;
