import { TotalAmountModel } from "../../../../domain/models/total-amount";

export interface GetTotalAmountRepository {
  get(): Promise<TotalAmountModel>;
}
