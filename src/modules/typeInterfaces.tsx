export interface createAccountFormData {
  [key: string]: string | undefined;
  username?: string;
  password?: string;
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
