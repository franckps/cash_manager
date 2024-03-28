import { ModelDefined } from "sequelize";
import { CreateAccountRepository } from "src/data/protocols/db/account/create-account-repository";
import { DeleteAccountRepository } from "src/data/protocols/db/account/delete-account-repository";
import { AccountModel } from "src/domain/models/account";

export class AccountRepository
  implements CreateAccountRepository, DeleteAccountRepository
{
  constructor(
    private readonly account: ModelDefined<AccountModel, AccountModel>
  ) {}

  async create(model: AccountModel): Promise<AccountModel> {
    const result = await this.account.create({ ...model, status: "active" });
    return result.dataValues;
  }

  async delete(account: string): Promise<void> {
    await this.account.update(
      { status: "deleted" },
      {
        where: {
          account,
        },
      }
    );
  }

  async findAll(): Promise<AccountModel[]> {
    const result = await this.account.findAll({ where: { status: "active" } });
    return result.map((elm) => elm.dataValues);
  }
}
