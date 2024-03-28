import { TransactionModel } from "../../models/transaction";

export interface FindTransactionById {
  findById(_id: string): Promise<TransactionModel>;
}
