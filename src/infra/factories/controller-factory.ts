import { CreateTransactionController } from "../../presentation/controllers/create-transaction-controller";
import { TransactionRepository } from "../db/sequelize/transaction-repository";
import { Transaction } from "../db/sequelize/sequelize-instance";
import { FindTransactionByFiltersController } from "../../presentation/controllers/index-transaction-controller";

const transactionRepository = new TransactionRepository(Transaction);

export const buildCreateTransactionController = () => {
  return new CreateTransactionController(transactionRepository);
};

export const buildFindTransactionByFiltersController = () => {
  return new FindTransactionByFiltersController(transactionRepository);
};
