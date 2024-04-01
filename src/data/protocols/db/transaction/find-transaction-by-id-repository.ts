import { TransactionModel } from "../../../../domain/models/transaction";

export interface FindTransactionByIdRepository {
  findById(account: string, _id: string): Promise<TransactionModel>;
}
