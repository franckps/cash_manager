export interface DeleteTransaction {
  delete(account: string, _id: string): Promise<void>;
}
