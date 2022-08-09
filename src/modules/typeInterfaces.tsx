export interface createAccountFormData {
  [key: string]: string | undefined;
  username?: string;
  password?: string;
}

export interface cashAccountAPIData {
  [key: string]: string | number | undefined;
  account_currency: string;
  account_id: number;
  account_nickname: string;
  account_owner_name: string;
  userUsersId: number;
  account_balance: number;
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
