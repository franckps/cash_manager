import { TransactionModel } from "../../../../domain/models/transaction";

export interface CreateTransactionRepository {
  create(
    account: string,
    transaction: TransactionModel
  ): Promise<TransactionModel>;
}
