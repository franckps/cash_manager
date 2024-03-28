import { CreateTransactionController } from "../../presentation/controllers/transaction/create-transaction-controller";
import { TransactionRepository } from "../db/sequelize/transaction-repository";
import { Transaction } from "../db/sequelize/sequelize-instance";
import { FindTransactionByFiltersController } from "../../presentation/controllers/transaction/index-transaction-controller";
import { DbCreateTransaction } from "../../data/usecases/transaction/db-create-transaction";
import { DbFindTransactionByFilters } from "../../data/usecases/transaction/db-find-transaction-by-filters";
import { DbGetTotalAmount } from "../../data/usecases/transaction/db-get-total-amount";
import { DbRevertTransaction } from "../../data/usecases/transaction/db-revert-transaction";
import { DbDeleteTransaction } from "../../data/usecases/transaction/db-delete-transaction";
import { GetTotalAmountController } from "../../presentation/controllers/transaction/get-total-amount-controller";
import { RevertTransactionController } from "../../presentation/controllers/transaction/revert-transaction-controller";
import { DeleteTransactionController } from "../../presentation/controllers/transaction/delete-transaction-controller";
import { FindTransactionByIdController } from "../../presentation/controllers/transaction/find-transaction-by-id-controller";
import { DbFindTransactionById } from "../../data/usecases/transaction/db-find-transaction-by-id";
import { CreateTransactionValidator } from "../../utils/validators";

const transactionRepository = new TransactionRepository(Transaction);
const createTransactionValidator = new CreateTransactionValidator();

export const buildCreateTransactionController = () => {
  return new CreateTransactionController(
    new DbCreateTransaction(transactionRepository),
    createTransactionValidator
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

export const buildRevertTransactionController = () => {
  return new RevertTransactionController(
    new DbRevertTransaction(transactionRepository)
  );
};

export const buildFindTransactionByIdController = () => {
  return new FindTransactionByIdController(
    new DbFindTransactionById(transactionRepository)
  );
};

export const buildDeleteTransactionController = () => {
  return new DeleteTransactionController(
    new DbDeleteTransaction(transactionRepository)
  );
};
