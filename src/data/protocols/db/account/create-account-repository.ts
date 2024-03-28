import { AccountModel } from "../../../../domain/models/account";
import { CreateAccountModel } from "../../../../domain/usecases/account/create-account";

export interface CreateAccountRepository {
  create(account: CreateAccountModel): Promise<AccountModel>;
}
