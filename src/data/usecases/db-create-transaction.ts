import crypto from "crypto";
import { TransactionModel } from "src/domain/models/transaction";
import {
  CreateTransaction,
  CreateTransactionModel,
} from "../../domain/usecases/create-transaction";
import { CreateTransactionRepository } from "../protocols/db/create-transaction-repository";

export class DbCreateTransaction implements CreateTransaction {
  constructor(private readonly repository: CreateTransactionRepository) {}
  async create(transaction: CreateTransactionModel): Promise<TransactionModel> {
    const id = crypto.randomUUID();
    return await this.repository.create({
      ...transaction,
      _id: id,
      status: "active",
    });
  }
}
