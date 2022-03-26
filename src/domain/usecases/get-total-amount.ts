export interface GetTotalAmount {
  get(): Promise<{ amount: string }>;
}
