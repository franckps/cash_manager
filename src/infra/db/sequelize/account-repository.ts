import { ModelDefined } from "sequelize";
import { CreateAccountRepository } from "src/data/protocols/db/account/create-account-repository";
import { DeleteAccountRepository } from "src/data/protocols/db/account/delete-account-repository";
import { AccountModel } from "src/domain/models/account";
import Sequelize from "sequelize";

export class AccountRepository
  implements CreateAccountRepository, DeleteAccountRepository
{
  constructor(
    private readonly account: ModelDefined<AccountModel, AccountModel>,
    private readonly sequelize: typeof Sequelize
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
    const result = await this.account.findAll({
      where: { status: "active" },
      attributes: {
        include: [
          [
            this.sequelize.literal(this.generateLiteralMiniquery()),
            "totalValue",
          ],
        ],
      },
    });
    return result.map((elm) => elm.dataValues);
  }

  private generateLiteralMiniquery(): string {
    return `(SELECT SUM(amount) as amount FROM (
        SELECT SUM(amount) as amount
        FROM transactions
        WHERE
          status = 'active'
          AND type = 'Receipt'
          AND account = account.account
        UNION
        SELECT SUM(amount * -1) as amount
          FROM transactions
          WHERE
            status = 'active'
            AND type = 'Payment'
            AND account = account.account
      ))`;
  }
}
