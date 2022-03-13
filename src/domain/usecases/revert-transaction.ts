export interface RevertTransaction {
  revert(_id: string): Promise<void>;
}
