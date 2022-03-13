export type TransactionTypeModel = "Receipt" | "Payment";

export type TransactionStatusModel = "active" | "reverted";

export interface TransactionModel {
  _id: string;
  amount: string;
  type: TransactionTypeModel;
  title: string;
  description: string;
  status: TransactionStatusModel;
}
