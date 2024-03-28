import { DeleteTransaction } from "src/domain/usecases/transaction/delete-transaction";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class DeleteTransactionController implements Controller {
  constructor(private readonly deleteTransaction: DeleteTransaction) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    await this.deleteTransaction.delete(request.params.id);
    return {
      statusCode: 200,
      body: { success: true },
    };
  }
}
