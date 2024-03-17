export interface DeleteTransactionRepository {
  delete(_id: string): Promise<void>;
}
