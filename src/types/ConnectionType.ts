// todo: remove access token from client
export interface ConnectionType {
  id: string;
  created_at: string;
  provider: string;
  account_name: string;
  access_token: string;
}
