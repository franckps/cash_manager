import { Filterable, ModelDefined, Op, WhereOptions } from "sequelize";
import { CreateTransactionRepository } from "src/data/protocols/db/create-transaction-repository";
import { FindTransactionByFiltersRepository } from "src/data/protocols/db/find-transaction-by-filters-repository";
import { FindTransactionByIdRepository } from "src/data/protocols/db/find-transaction-by-id-repository";
import { RevertTransactionRepository } from "src/data/protocols/db/revert-transaction-repository";
import { DeleteTransactionRepository } from "src/data/protocols/db/delete-transaction-repository";
import {
  TransactionModel,
  TransactionStatusModel,
} from "src/domain/models/transaction";
import { TransactionFiltersModel } from "src/domain/usecases/find-transaction-by-filters";

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

  async create(model: TransactionModel): Promise<TransactionModel> {
    const result = await this.transaction.create({ ...model });
    return result.dataValues;
  }

  async findById(_id: string): Promise<TransactionModel> {
    const result = await this.transaction.findAll({
      where: {
        _id,
      },
    });

    if (!result.at(0)) throw new Error("This transaction doesn't exist.");

    return (result.at(0) as any).dataValues;
  }

  async find(filters: TransactionFiltersModel): Promise<TransactionModel[]> {
    let where: WhereOptions<TransactionModel> = {};
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

  async revert(_id: string): Promise<void> {
    const result = await this.findById(_id);
    let status = "reverted" as TransactionStatusModel;
    if (result.status == "reverted") status = "active";
    await this.transaction.update(
      { status },
      {
        where: {
          _id,
        },
      }
    );
  }

  async get(): Promise<{ amount: string }> {
    const [receiptAmount, paymentAmount] = await Promise.all([
      this.transaction.sum("amount", {
        where: { status: "active", type: "Receipt" },
      }),
      this.transaction.sum("amount", {
        where: { status: "active", type: "Payment" },
      }),
    ]);

    return { amount: (receiptAmount - paymentAmount).toString() };
  }

  async delete(_id: string): Promise<void> {
    await this.transaction.update(
      { status: "deleted" },
      {
        where: {
          _id,
        },
      }
    );
  }
}
