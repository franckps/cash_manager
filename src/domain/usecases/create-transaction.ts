import { TransactionModel, TransactionTypeModel } from "../models/transaction";

export interface CreateTransactionModel {
  amount: string;
  type: TransactionTypeModel;
  title: string;
  description?: string;
}

export interface CreateTransaction {
  create(transaction: CreateTransactionModel): Promise<TransactionModel>;
}
