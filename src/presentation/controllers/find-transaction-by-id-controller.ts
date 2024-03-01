import { FindTransactionById } from "src/domain/usecases/find-transaction-by-id";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class FindTransactionByIdController implements Controller {
  constructor(private readonly findTransactionById: FindTransactionById) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const result = await this.findTransactionById.findById(request.params.id);

    return {
      statusCode: 200,
      body: result,
    };
  }
}
