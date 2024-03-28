import { AccountModel } from "../../../domain/models/account";

export interface CreateAccount {
  create(account: AccountModel): Promise<AccountModel>;
}
