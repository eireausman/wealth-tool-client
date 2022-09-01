import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USERNAMEMIN, PASSWORDMIN } from "../modules/publicEnvVariables";
import {
  LoginAttemptFormData,
  LoginAttemptServerResponse,
} from "../modules/typeInterfaces";
import { loginAttempt } from "../modules/serverRequests";
import { motion } from "framer-motion";
import "./Login.css";
import CardSpinner from "./CardSpinner";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginAttemptFormData>({
    username: "",
    password: "",
  });
  const [formSubmitResponse, setFormSubmitResponse] =
    useState<LoginAttemptServerResponse>({});
  const [showResponseMessage, setshowResponseMessage] =
    useState<boolean>(false);
  const [showSpinner, setshowSpinner] = useState<boolean>(false);

  const updateFormDataState = (e: React.FormEvent<EventTarget>) => {
    const formDataCopy: LoginAttemptFormData = { ...formData };
    const target = e.target as HTMLInputElement;

    const fieldName =
      target.getAttribute("name") ??
      (target.getAttribute("name") as keyof typeof FormData);
    formDataCopy[fieldName] = target.value;
    setFormData(formDataCopy);
  };

  const navigate = useNavigate();
  const loginRedirect = () => {
    navigate("/");
  };

  const submitFormData = async (e: React.FormEvent<EventTarget>) => {
    setshowSpinner(true);
    setFormSubmitResponse({});
    setshowResponseMessage(false);
    e.preventDefault();
    const serverResponse = await loginAttempt(formData);

    setshowSpinner(false);
    setFormSubmitResponse(serverResponse);
    setshowResponseMessage(true);
    if (serverResponse.requestOutcome === true) {
      setTimeout(loginRedirect, 2000);
    }
  };

  return (
    <div className="form-container">
      <motion.form
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        method="POST"
        className="column-form loginForm"
        onSubmit={submitFormData}
      >
        <div className="loginFormInputRow">
          <label>
            Username
            <input
              className="loginFormInputField"
              name="username"
              minLength={USERNAMEMIN}
              required
              type="text"
              value={formData.username}
              onChange={updateFormDataState}
            />
          </label>
        </div>
        <div className="loginFormInputRow">
          <label>
            Password 12345678
            <input
              className="loginFormInputField"
              name="password"
              minLength={PASSWORDMIN}
              required
              type="text"
              value={formData.password}
              onChange={updateFormDataState}
            />
          </label>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          type="submit"
          className="buttonPrimary buttonLogin"
        >
          Login
        </motion.button>
      </motion.form>
      {showSpinner === true && (
        <CardSpinner cardTitle={"Logging in.... please wait...."} />
      )}
      {showResponseMessage === true &&
        formSubmitResponse.requestOutcome === false && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="alertFailure loginAlertFailure"
          >
            {formSubmitResponse.message}
          </motion.div>
        )}
      {showResponseMessage === true &&
        formSubmitResponse.requestOutcome === true && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="alertSuccess loginAlertSuccess"
          >
            {formSubmitResponse.message}.{" "}
            <Link to="/">Click here if not redirected....</Link>
          </motion.div>
        )}

      <p className="createAccountLinkText">
        <Link to="/createaccount"> Need an account? Create one here.</Link>
      </p>
    </div>
  );
};

export default Login;
