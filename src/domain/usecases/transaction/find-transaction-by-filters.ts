import {
  TransactionTypeModel,
  TransactionModel,
  TransactionStatusModel,
} from "../../models/transaction";

export interface TransactionFiltersModel {
  amount?: [string, string];
  type?: TransactionTypeModel;
  title?: string[];
  status?: TransactionStatusModel;
  account?: string;
}

export interface FindTransactionByFilters {
  find(
    account: string,
    filters: TransactionFiltersModel
  ): Promise<TransactionModel[]>;
}
