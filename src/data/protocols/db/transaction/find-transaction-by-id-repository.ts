import { TransactionModel } from "../../../../domain/models/transaction";

export interface FindTransactionByIdRepository {
  findById(_id: string): Promise<TransactionModel>;
}
