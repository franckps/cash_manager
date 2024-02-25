import { DataTypes, ModelDefined, Op, Sequelize } from "sequelize";
import { CreateTransactionRepository } from "src/data/protocols/db/create-transaction-repository";
import { FindTransactionByFiltersRepository } from "src/data/protocols/db/find-transaction-by-filters-repository";
import { FindTransactionByIdRepository } from "src/data/protocols/db/find-transaction-by-id-repository";
import { RevertTransactionRepository } from "src/data/protocols/db/revert-transaction-repository";
import { TransactionModel } from "src/domain/models/transaction";
import { TransactionFiltersModel } from "src/domain/usecases/find-transaction-by-filters";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "path/to/database.sqlite",
});

const Transaction: ModelDefined<TransactionModel, TransactionModel> =
  sequelize.define("Transaction", {
    // Model attributes are defined here
    _id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

export class TransactionRepository
  implements
    CreateTransactionRepository,
    FindTransactionByIdRepository,
    FindTransactionByFiltersRepository,
    RevertTransactionRepository
{
  constructor(private readonly transaction: typeof Transaction) {}

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
    const result = await this.transaction.findAll({
      where: {
        amount: { [Op.between]: filters.amount },
        type: filters.type,
        title: { [Op.or]: filters.title },
        status: filters.status,
      },
    });

    if (!result.at(0)) return [] as TransactionModel[];

    return result.map((elm) => elm.dataValues);
  }

  async revert(_id: string): Promise<void> {
    await this.transaction.update(
      { status: "reverted" },
      {
        where: {
          _id,
        },
      }
    );
  }

  async get(): Promise<{ amount: number }> {
    const [receiptAmount, paymentAmount] = await Promise.all([
      this.transaction.sum("amount", {
        where: { status: "active", type: "Receipt" },
      }),
      this.transaction.sum("amount", {
        where: { status: "active", type: "Payment" },
      }),
    ]);

    return { amount: receiptAmount - paymentAmount };
  }
}
