import React, { useState } from "react";
import { USERNAMEMIN, PASSWORDMIN } from "../modules/publicEnvVariables";
import {
  LoginAttemptFormData,
  LoginAttemptServerResponse,
} from "../modules/typeInterfaces";
import { loginAttempt } from "../modules/serverRequests";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginAttemptFormData>({
    username: "",
    password: "",
  });
  const [formSubmitResponse, setFormSubmitResponse] =
    useState<LoginAttemptServerResponse>({});
  const [showResponseMessage, setshowResponseMessage] =
    useState<boolean>(false);

  const updateFormDataState = (e: React.FormEvent<EventTarget>) => {
    const formDataCopy: LoginAttemptFormData = { ...formData };
    const target = e.target as HTMLInputElement;

    const fieldName =
      target.getAttribute("name") ??
      (target.getAttribute("name") as keyof typeof FormData);
    formDataCopy[fieldName] = target.value;
    setFormData(formDataCopy);
  };

  const submitFormData = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const serverResponse = await loginAttempt(formData);
    console.log(serverResponse);
    setFormSubmitResponse(serverResponse);
    setshowResponseMessage(true);
  };

  return (
    <form method="POST" className="column-form" onSubmit={submitFormData}>
      <label>
        Username
        <input
          name="username"
          minLength={USERNAMEMIN}
          required
          type="text"
          value={formData.username}
          onChange={updateFormDataState}
        />
      </label>
      <label>
        Password
        <input
          name="password"
          minLength={PASSWORDMIN}
          required
          type="text"
          value={formData.password}
          onChange={updateFormDataState}
        />
      </label>
      <button type="submit">test</button>
      {showResponseMessage === true &&
        formSubmitResponse.requestOutcome === false && (
          <div className="alertFailure">{formSubmitResponse.message}</div>
        )}
      {showResponseMessage === true &&
        formSubmitResponse.requestOutcome === true && (
          <div className="alertSuccess">{formSubmitResponse.message}</div>
        )}
    </form>
  );
};

export default Login;
