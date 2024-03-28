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
}

export interface FindTransactionByFilters {
  find(filters: TransactionFiltersModel): Promise<TransactionModel[]>;
}
