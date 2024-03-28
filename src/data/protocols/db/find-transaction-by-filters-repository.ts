import { TransactionModel } from "../../../domain/models/transaction";
import { TransactionFiltersModel } from "src/domain/usecases/transaction/find-transaction-by-filters";

export interface FindTransactionByFiltersRepository {
  find(filters: TransactionFiltersModel): Promise<TransactionModel[]>;
}
