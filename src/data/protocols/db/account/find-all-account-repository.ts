import { AccountModel } from "src/domain/models/account";

export interface FindAllAccountRepository {
  findAll(): Promise<AccountModel[]>;
}
