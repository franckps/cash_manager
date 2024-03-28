import { AccountModel } from "../../../domain/models/account";

export interface FindAllAccount {
  findAll(): Promise<AccountModel[]>;
}
