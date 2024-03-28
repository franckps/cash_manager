import { AccountModel } from "src/domain/models/account";

export interface CreateAccountRepository {
  create(account: AccountModel): Promise<AccountModel>;
}
