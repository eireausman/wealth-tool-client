import { getCurrencyFXData } from "../modules/serverRequests";
import { currencyFXAPIData } from "../modules/typeInterfaces";

const currencyConvert = async (
  valueFrom: number,
  currencyCodeFrom: string,
  currencyCodeTo: string
) => {
  const serverResponse = await getCurrencyFXData(
    currencyCodeFrom,
    currencyCodeTo
  );
  const convertedNumber = valueFrom * serverResponse.currency_fxrate;
  const rationalisedNumber = parseInt(convertedNumber.toFixed(0));

  return rationalisedNumber;
};

export default currencyConvert;
