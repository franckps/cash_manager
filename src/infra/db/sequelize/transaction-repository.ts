import { ModelDefined, Op, WhereOptions } from "sequelize";
import { CreateTransactionRepository } from "src/data/protocols/db/transaction/create-transaction-repository";
import { FindTransactionByFiltersRepository } from "src/data/protocols/db/transaction/find-transaction-by-filters-repository";
import { FindTransactionByIdRepository } from "src/data/protocols/db/transaction/find-transaction-by-id-repository";
import { RevertTransactionRepository } from "src/data/protocols/db/transaction/revert-transaction-repository";
import { DeleteTransactionRepository } from "src/data/protocols/db/transaction/delete-transaction-repository";
import {
  TransactionModel,
  TransactionStatusModel,
} from "src/domain/models/transaction";
import { TransactionFiltersModel } from "src/domain/usecases/transaction/find-transaction-by-filters";

export class TransactionRepository
  implements
    CreateTransactionRepository,
    FindTransactionByIdRepository,
    FindTransactionByFiltersRepository,
    RevertTransactionRepository,
    DeleteTransactionRepository
{
  constructor(
    private readonly transaction: ModelDefined<
      TransactionModel,
      TransactionModel
    >
  ) {}

  async create(
    account: string,
    model: TransactionModel
  ): Promise<TransactionModel> {
    const result = await this.transaction.create({ ...model, account });
    return result.dataValues;
  }

  async findById(account: string, _id: string): Promise<TransactionModel> {
    const result = await this.transaction.findAll({
      where: {
        _id,
        account,
      },
    });

    if (!result.at(0)) throw new Error("This transaction doesn't exist.");

    return (result.at(0) as any).dataValues;
  }

  async find(
    account: string,
    filters: TransactionFiltersModel
  ): Promise<TransactionModel[]> {
    let where: WhereOptions<TransactionModel> = { account };
    console.log({ filters });
    if (!!filters.amount) where["amount"] = { [Op.between]: filters.amount };
    if (!!filters.type) where["type"] = filters.type;
    if (!!filters.title) where["title"] = { [Op.or]: filters.title };

    where["status"] = { [Op.not]: "deleted" };
    if (!!filters.status && filters.status != "deleted")
      where["status"] = filters.status;

    console.log(JSON.stringify(where, null, 1));
    const result = await this.transaction.findAll({
      where,
    });

    if (!result.at(0)) return [] as TransactionModel[];

    return result.map((elm) => elm.dataValues);
  }

  async revert(account: string, _id: string): Promise<void> {
    const result = await this.findById(account, _id);
    let status = "reverted" as TransactionStatusModel;
    if (result.status == "reverted") status = "active";
    await this.transaction.update(
      { status },
      {
        where: {
          _id,
          account,
        },
      }
    );
  }

  async get(account: string): Promise<{ amount: string }> {
    const [receiptAmount, paymentAmount] = await Promise.all([
      this.transaction.sum("amount", {
        where: { status: "active", type: "Receipt", account },
      }),
      this.transaction.sum("amount", {
        where: { status: "active", type: "Payment", account },
      }),
    ]);

    return { amount: (receiptAmount - paymentAmount).toString() };
  }

  async delete(account: string, _id: string): Promise<void> {
    await this.transaction.update(
      { status: "deleted" },
      {
        where: {
          _id,
          account,
        },
      }
    );
  }
}
