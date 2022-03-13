import { TransactionModel } from "../../../domain/models/transaction";
import { TransactionFiltersModel } from "src/domain/usecases/find-transaction-by-filters";

export interface FindTransactionByFiltersRepository {
  find(filters: TransactionFiltersModel): Promise<TransactionModel[]>;
}
