import { CreateTransactionController } from "../../presentation/controllers/create-transaction-controller";
import { TransactionRepository } from "../db/sequelize/transaction-repository";
import { Transaction } from "../db/sequelize/sequelize-instance";
import { FindTransactionByFiltersController } from "../../presentation/controllers/index-transaction-controller";
import { DbCreateTransaction } from "../../data/usecases/db-create-transaction";
import { DbFindTransactionByFilters } from "../../data/usecases/db-find-transaction-by-filters";

const transactionRepository = new TransactionRepository(Transaction);

export const buildCreateTransactionController = () => {
  return new CreateTransactionController(
    new DbCreateTransaction(transactionRepository)
  );
};
