import { FindAllAccountRepository } from "src/data/protocols/db/account/find-all-account-repository";
import { AccountModel } from "../../../domain/models/account";
import { FindAllAccount } from "../../../domain/usecases/account/find-all-account";

export class DbFindAllAccount implements FindAllAccount {
  constructor(
    private readonly findAllAccountRepository: FindAllAccountRepository
  ) {}

  findAll(): Promise<AccountModel[]> {
    return this.findAllAccountRepository.findAll();
  }
}
