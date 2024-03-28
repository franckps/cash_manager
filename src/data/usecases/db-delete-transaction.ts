import { DeleteTransaction } from "../../domain/usecases/transaction/delete-transaction";
import { DeleteTransactionRepository } from "../protocols/db/transaction/delete-transaction-repository";

export class DbDeleteTransaction implements DeleteTransaction {
  constructor(private readonly repository: DeleteTransactionRepository) {}
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
