import { TotalAmountModel } from "../../../../domain/models/total-amount";

export interface GetTotalAmountRepository {
  get(account: string): Promise<TotalAmountModel>;
}
