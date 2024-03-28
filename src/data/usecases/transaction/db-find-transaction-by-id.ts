import { TransactionModel } from "src/domain/models/transaction";
import { FindTransactionById } from "../../../domain/usecases/transaction/find-transaction-by-id";
import { FindTransactionByIdRepository } from "../../protocols/db/transaction/find-transaction-by-id-repository";

export class DbFindTransactionById implements FindTransactionById {
  constructor(private readonly repository: FindTransactionByIdRepository) {}
  async findById(id: string): Promise<TransactionModel> {
    return await this.repository.findById(id);
  }
}
