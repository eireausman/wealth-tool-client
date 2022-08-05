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
