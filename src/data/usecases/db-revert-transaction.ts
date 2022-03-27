import { RevertTransaction } from "../../domain/usecases/revert-transaction";
import { RevertTransactionRepository } from "../protocols/db/revert-transaction-repository";

export class DbRevertTransaction implements RevertTransaction {
  constructor(private readonly repository: RevertTransactionRepository) {}
  async revert(id: string): Promise<void> {
    return await this.repository.revert(id);
  }
}
