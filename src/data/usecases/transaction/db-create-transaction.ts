import crypto from "crypto";
import { TransactionModel } from "src/domain/models/transaction";
import {
  CreateTransaction,
  CreateTransactionModel,
} from "../../../domain/usecases/transaction/create-transaction";
import { CreateTransactionRepository } from "../../protocols/db/transaction/create-transaction-repository";

export class DbCreateTransaction implements CreateTransaction {
  constructor(private readonly repository: CreateTransactionRepository) {}
  async create(
    account: string,
    transaction: CreateTransactionModel
  ): Promise<TransactionModel> {
    const id = crypto.randomUUID();
    return await this.repository.create(account, {
      ...transaction,
      _id: id,
      status: "active",
    });
  }
}
