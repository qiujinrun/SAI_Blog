export interface LoginResponse {
  status_code: number;
  status_msg: string;
  user: {
    ID: number;
    name: string;
    account: string;
  };
  token: string;
}

export interface RegisterResponse {
  status_code: number;
  status_msg: string;
}