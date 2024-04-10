import { GetTotalAmount } from "src/domain/usecases/transaction/get-total-amount";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class GetTotalAmountController implements Controller {
  constructor(private readonly getTotalAmount: GetTotalAmount) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const result = await this.getTotalAmount.get(request.params.account);

    return {
      statusCode: 200,
      body: result,
    };
  }
}
