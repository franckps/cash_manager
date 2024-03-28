import { TotalAmountModel } from "src/domain/models/total-amount";
import { GetTotalAmount } from "../../domain/usecases/transaction/get-total-amount";
import { GetTotalAmountRepository } from "../protocols/db/get-total-amount-repository";

export class DbGetTotalAmount implements GetTotalAmount {
  constructor(private readonly repository: GetTotalAmountRepository) {}
  async get(): Promise<TotalAmountModel> {
    return await this.repository.get();
  }
}
