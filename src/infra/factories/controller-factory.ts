import { CreateTransactionController } from "../../presentation/controllers/create-transaction-controller";
import { TransactionRepository } from "../db/sequelize/transaction-repository";
import { Transaction } from "../db/sequelize/sequelize-instance";
import { FindTransactionByFiltersController } from "../../presentation/controllers/index-transaction-controller";
import { DbCreateTransaction } from "../../data/usecases/db-create-transaction";
import { DbFindTransactionByFilters } from "../../data/usecases/db-find-transaction-by-filters";
import { DbGetTotalAmount } from "dist/src/data/usecases/db-get-total-amount";
import { GetTotalAmountController } from "src/presentation/controllers/get-total-amount-controller";

const transactionRepository = new TransactionRepository(Transaction);

export const buildCreateTransactionController = () => {
  return new CreateTransactionController(
    new DbCreateTransaction(transactionRepository)
  );
};

export const buildFindTransactionByFiltersController = () => {
  return new FindTransactionByFiltersController(
    new DbFindTransactionByFilters(transactionRepository)
  );
};

export const buildGetTotalAmountController = () => {
  return new GetTotalAmountController(
    new DbGetTotalAmount(transactionRepository)
  );
};
