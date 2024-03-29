export interface GetTotalAmount {
  get(account: string): Promise<{ amount: string }>;
}
