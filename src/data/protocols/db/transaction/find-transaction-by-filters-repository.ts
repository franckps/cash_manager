import { TransactionModel } from "../../../../domain/models/transaction";
import { TransactionFiltersModel } from "src/domain/usecases/transaction/find-transaction-by-filters";

export interface FindTransactionByFiltersRepository {
  find(
    account: string,
    filters: TransactionFiltersModel
  ): Promise<TransactionModel[]>;
}
