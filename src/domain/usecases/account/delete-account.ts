export interface DeleteAccount {
  delete(account: string): Promise<void>;
}
