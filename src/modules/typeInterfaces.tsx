export interface AddANewInvestmentProps {
  currencyCodesFromDB: currencyCodesAPIData[] | undefined;
  setShowAddNewStockForm: React.Dispatch<React.SetStateAction<boolean>>;
  refreshInvestmentsData: () => void;
}

export interface PropertiesNewPropProps {
  currencyCodesFromDB: currencyCodesAPIData[] | undefined;
  setshowAddNewForm: React.Dispatch<React.SetStateAction<boolean>>;
  refreshPropertiesValues: () => void;
}

export interface AddNewInvestmentFormData {
  [key: string]: string | number | undefined;
  stockName?: string;
  identifier?: string;
  quantity?: number;
  cost?: number;
  currentPrice?: number;
  ownerName?: string;
  institution?: string;
  currencySymbol?: string;
  currencyCode?: string;
}

export interface AddNewPropertyFormData {
  [key: string]: string | number | undefined;
  propName?: string;
  propOwner?: string;
  propValue?: number;
  propLoan?: number;
  currencySymbol?: string;
  currencyCode?: string;
}

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
  selectedCurrencyCode: string;
  selectedCurrencySymbol: string;
}

export interface editAccountDetail {
  account_id: number;
  account_balance: number;
  currencySymbol: string;
  currencyCode: string;
  account_nickname: string;
}

export interface InvestmentsProps {
  selectedCurrencyCode: string;
  selectedCurrencySymbol: string;
  currencyCodesFromDB: currencyCodesAPIData[] | undefined;
}

export interface editingPropertyDetails {
  property_id: number;
  property_nickname: string;
  property_valuation: number;
  property_loan_value: number;
  property_valuation_curr_symbol: string;
}

export interface propertiesAPIData {
  [key: string]: string | number | undefined;
  property_id: number;
  property_nickname: string;
  property_owner_name: string;
  property_valuation: number;
  property_loan_value: number;
  property_valuation_currency: string;
  property_valuation_curr_symbol: string;
  displayValue: number;
}

export interface investmentsAPIData {
  [key: string]: string | number | undefined;
  holding_cost_total_value: number;
  holding_currency_code: string;
  holding_currency_symbol: string;
  holding_current_price: number;
  holding_id: number;
  holding_institution: string;
  holding_market_identifier: string;
  holding_owner_name: string;
  holding_stock_name: string;
  holding_quantity_held: number;
  userUsersId: number;
  displayValueBaseCurrency: number;
  displayValueConverted: number;
}

export interface PropertiesProps {
  selectedCurrencyCode: string;
  selectedCurrencySymbol: string;
  currencyCodesFromDB: currencyCodesAPIData[] | undefined;
}

export interface propertiesUpdateValProps {
  setpropertyToEdit: React.Dispatch<React.SetStateAction<number | undefined>>;
  editingPropertyDetails: editingPropertyDetails | undefined;
  seteditingPropertyDetails: React.Dispatch<
    React.SetStateAction<editingPropertyDetails | undefined>
  >;
  refreshPropertiesValues: () => Promise<void>;
}

export interface CashAccountUpdateBalProps {
  setAccountIDToEdit: React.Dispatch<React.SetStateAction<number | undefined>>;
  updatedAllAccountBalances: () => void;
  editAccountDetail: editAccountDetail;
  seteditAccountDetail: React.Dispatch<
    React.SetStateAction<editAccountDetail | undefined>
  >;
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
  selectedCurrencyCode: string;
  setselectedCurrencyCode: React.Dispatch<React.SetStateAction<string>>;
  currencyCodesFromDB: currencyCodesAPIData[] | undefined;
  setselectedCurrencySymbol: React.Dispatch<React.SetStateAction<string>>;
}
