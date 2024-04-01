export interface DeleteTransactionRepository {
  delete(account: string, _id: string): Promise<void>;
}
