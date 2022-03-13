import { TransactionModel } from "src/domain/models/transaction";
import {
  CreateTransaction,
  CreateTransactionModel,
} from "../../domain/usecases/create-transaction";
import { CreateTransactionRepository } from "../protocols/db/create-transaction-repository";

export class DbCreateTransaction implements CreateTransaction {
  constructor(private readonly repository: CreateTransactionRepository) {}
  async create(transaction: CreateTransactionModel): Promise<TransactionModel> {
    await this.repository.create(transaction);
    return null as any;
  }
}
