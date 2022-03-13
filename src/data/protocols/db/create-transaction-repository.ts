import { TransactionModel } from "../../../domain/models/transaction";
import { CreateTransactionModel } from "../../../domain/usecases/create-transaction";

export interface CreateTransactionRepository {
  create(transaction: CreateTransactionModel): Promise<TransactionModel>;
}
