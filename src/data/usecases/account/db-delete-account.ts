import { DeleteAccount } from "../../../domain/usecases/account/delete-account";
import { DeleteAccountRepository } from "../../protocols/db/account/delete-account-repository";

export class DbDeleteAccount implements DeleteAccount {
  constructor(
    private readonly deleteAccountRepository: DeleteAccountRepository
  ) {}

  delete(account: string): Promise<void> {
    return this.deleteAccountRepository.delete(account);
  }
}
