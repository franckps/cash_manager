import { CreateTransactionController } from "../../presentation/controllers/create-transaction-controller";
import { TransactionRepository } from "../db/sequelize/transaction-repository";
import { Transaction } from "../db/sequelize/sequelize-instance";
import { FindTransactionByFiltersController } from "../../presentation/controllers/index-transaction-controller";
import { DbCreateTransaction } from "../../data/usecases/db-create-transaction";
import { DbFindTransactionByFilters } from "../../data/usecases/db-find-transaction-by-filters";
import { DbGetTotalAmount } from "../../data/usecases/db-get-total-amount";
import { DbRevertTransaction } from "../../data/usecases/db-revert-transaction";
import { DbDeleteTransaction } from "../../data/usecases/db-delete-transaction";
import { GetTotalAmountController } from "../../presentation/controllers/get-total-amount-controller";
import { RevertTransactionController } from "../../presentation/controllers/revert-transaction-controller";
import { DeleteTransactionController } from "../../presentation/controllers/delete-transaction-controller";
import { FindTransactionByIdController } from "../../presentation/controllers/find-transaction-by-id-controller";
import { DbFindTransactionById } from "../../data/usecases/db-find-transaction-by-id";
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
