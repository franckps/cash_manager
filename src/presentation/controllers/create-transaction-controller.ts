import { CreateTransaction } from "src/domain/usecases/create-transaction";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class CreateTransactionController implements Controller {
  constructor(private readonly createTransaction: CreateTransaction) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const newTransaction = await this.createTransaction.create(request.body);
    return {
      statusCode: 200,
      body: newTransaction,
    };
  }
}
