import { AccountModel } from "../../../domain/models/account";

export interface CreateAccountModel {
  account: string;
  title: string;
}

export interface CreateAccount {
  create(account: CreateAccountModel): Promise<AccountModel>;
}
