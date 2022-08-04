import axios from "axios";
import { createAccountFormData } from "./typeInterfaces";

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

export { createAccountAttempt, loginAttempt };
