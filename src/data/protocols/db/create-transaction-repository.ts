import { TransactionModel } from "../../../domain/models/transaction";

export interface CreateTransactionRepository {
  create(transaction: TransactionModel): Promise<TransactionModel>;
}
