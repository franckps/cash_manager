import { TransactionModel } from "src/domain/models/transaction";
import {
  FindTransactionByFilters,
  TransactionFiltersModel,
} from "../../../domain/usecases/transaction/find-transaction-by-filters";
import { FindTransactionByFiltersRepository } from "../../protocols/db/transaction/find-transaction-by-filters-repository";

export class DbFindTransactionByFilters implements FindTransactionByFilters {
  constructor(
    private readonly repository: FindTransactionByFiltersRepository
  ) {}
  async find(
    transactionFilter: TransactionFiltersModel
  ): Promise<TransactionModel[]> {
    return await this.repository.find(transactionFilter);
  }
}
