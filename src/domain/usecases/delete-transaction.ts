export interface DeleteTransaction {
  delete(_id: string): Promise<void>;
}
