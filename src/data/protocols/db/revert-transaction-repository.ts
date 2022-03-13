export interface RevertTransactionRepository {
  revert(_id: string): Promise<void>;
}
