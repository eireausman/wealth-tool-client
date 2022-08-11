export interface createAccountFormData {
  [key: string]: string | undefined;
  username?: string;
  password?: string;
}

export interface cashAccountAPIData {
  [key: string]: string | number | undefined;
  account_currency_code: string;
  account_currency_symbol: string;
  account_id: number;
  account_nickname: string;
  account_owner_name: string;
  userUsersId: number;
  account_balance: number;
  displayValue: number;
}

export interface currencyCodesAPIData {
  currency_code: string;
  currency_name: string;
  currency_symbol: string;
  id: number;
}

export interface currencyFXAPIData {
  id: number;
  currency_code_from: string;
  currency_code_from_symbol: string;
  currency_code_to: string;
  currency_code_to_symbol: string;
  currency_fxrate: string;
  currency_fxrate_dateupdated: string;
}

export interface CashAccountsProps {
  selectedCurrency: string;
}

export interface PropertiesProps {
  selectedCurrency: string;
}

export interface propertiesAPIData {
  [key: string]: string | number | undefined;
  property_id: number;
  property_nickname: string;
  property_owner_name: string;
  property_valuation: number;
  property_loan_value: number;
  property_valuation_currency: string;
}

export interface CashAccountUpdateBalProps {
  editThisAccountBalanceValue: number;
  setAccountIDToEdit: React.Dispatch<React.SetStateAction<number | undefined>>;
  updatedAllAccountBalances: () => void;
  accountToEditCurBal: number;
}

export interface LoginAttemptFormData {
  [key: string]: string | undefined;
  username?: string;
  password?: string;
}

export interface createAccountServerResponse {
  requestOutcome?: boolean;
  message?: string;
}

export interface LoginAttemptServerResponse {
  requestOutcome?: boolean;
  message?: string;
}

export interface OptionsBoardProps {
  selectedCurrency: string;
  setselectedCurrency: React.Dispatch<React.SetStateAction<string>>;
  currencyCodesFromDB: currencyCodesAPIData[] | undefined;
}
