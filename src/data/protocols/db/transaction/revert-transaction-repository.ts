export interface RevertTransactionRepository {
  revert(account: string, _id: string): Promise<void>;
}
