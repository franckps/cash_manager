import { RevertTransaction } from "src/domain/usecases/revert-transaction";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class RevertTransactionController implements Controller {
  constructor(private readonly revertTransaction: RevertTransaction) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    await this.revertTransaction.revert(request.params.id);
    return {
      statusCode: 200,
      body: { success: true },
    };
  }
}
