export interface RevertTransaction {
  revert(account: string, _id: string): Promise<void>;
}
