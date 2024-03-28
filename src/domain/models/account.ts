export type AccountStatusModel = "active" | "deleted";

export interface AccountModel {
  account: string;
  status: AccountStatusModel;
}
