import axios from "axios";
import {
  createAccountFormData,
  AddNewInvestmentFormData,
  AddNewPropertyFormData,
} from "./typeInterfaces";

const addnewinvestment = async (formData: AddNewInvestmentFormData) => {
  try {
    const serverResponse = await axios.post("/api/addnewinvestment", formData);
    return await serverResponse.data;
  } catch (error) {
    console.error(error);
  }
};

const addNewProperty = async (formData: AddNewPropertyFormData) => {
  try {
    const serverResponse = await axios.post("/api/addnewproperty", formData);
    return await serverResponse.data;
  } catch (error) {
    console.error(error);
  }
};

const createAccountAttempt = async (formData: createAccountFormData) => {
  try {
    const serverResponse = await axios.post("/api/createaccount", formData);
    return await serverResponse.data;
  } catch (error) {
    console.error(error);
  }
};

const loginAttempt = async (formData: createAccountFormData) => {
  try {
    const serverResponse = await axios.post("/api/login", formData);
    return await serverResponse.data;
  } catch (error) {
    console.error(error);
  }
};

const getCurrencyCodeData = async () => {
  try {
    const serverResponse = await axios.get("/api/getcurrencycodes");
    return await serverResponse.data;
  } catch (err) {
    console.error(err);
  }
};

const getCurrencyFXData = async (currencyFrom: string, currencyTo: string) => {
  const formData = {
    currencyFrom,
    currencyTo,
  };
  try {
    const serverResponse = await axios.post("/api/getfxrates", formData);

    return await serverResponse.data;
  } catch (err) {
    console.error(err);
  }
};

const getPropertiesData = async () => {
  try {
    const serverResponse = await axios.get("/api/getpropertiesdata");
    return await serverResponse.data;
  } catch (err) {
    console.error(err);
  }
};

const getCashAccountData = async () => {
  try {
    const serverResponse = await axios.get("/api/getcashaccountdata");

    return await serverResponse.data;
  } catch (err) {
    console.error(err);
  }
};

const updateCashAccountBalance = async (
  account_id: number,
  balance: number
) => {
  const formData = {
    account_id,
    balance,
  };
  try {
    const serverResponse = await axios.post(
      "/api/updatecashaccountbalance",
      formData
    );
    return await serverResponse.data;
  } catch (err) {
    console.error(err);
  }
};

const updatePropertyValue = async (
  property_id: number,
  property_valuation: number,
  property_loan_value: number
) => {
  const formData = {
    property_id,
    property_valuation,
    property_loan_value,
  };
  try {
    const serverResponse = await axios.post(
      "/api/updatepropertyvalue",
      formData
    );
    return await serverResponse.data;
  } catch (err) {
    console.error(err);
  }
};

const getInvestmentData = async () => {
  try {
    const serverResponse = await axios.get("/api/getinvestmentdata");

    return await serverResponse.data;
  } catch (err) {
    console.error(err);
  }
};

export {
  createAccountAttempt,
  loginAttempt,
  getCashAccountData,
  updateCashAccountBalance,
  getPropertiesData,
  getCurrencyFXData,
  getCurrencyCodeData,
  updatePropertyValue,
  getInvestmentData,
  addnewinvestment,
  addNewProperty,
};
