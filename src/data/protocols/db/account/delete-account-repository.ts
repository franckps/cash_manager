export interface DeleteAccountRepository {
  delete(account: string): Promise<void>;
}
