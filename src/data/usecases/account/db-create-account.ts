import { AccountModel } from "../../../domain/models/account";
import {
  CreateAccount,
  CreateAccountModel,
} from "../../../domain/usecases/account/create-account";
import { CreateAccountRepository } from "../../../data/protocols/db/account/create-account-repository";

export class DbCreateAccount implements CreateAccount {
  constructor(
    private readonly createAccountRepository: CreateAccountRepository
  ) {}

  create(account: CreateAccountModel): Promise<AccountModel> {
    return this.createAccountRepository.create(account);
  }
}
