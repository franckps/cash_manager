import { TransactionModel } from "../../models/transaction";

export interface FindTransactionById {
  findById(account: string, _id: string): Promise<TransactionModel>;
}
