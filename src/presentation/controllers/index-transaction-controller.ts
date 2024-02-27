import { FindTransactionByFilters } from "src/domain/usecases/find-transaction-by-filters";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class FindTransactionByFiltersController implements Controller {
  constructor(
    private readonly findTransactionByFilters: FindTransactionByFilters
  ) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    console.log({ query: request.query });
    const transactionList = await this.findTransactionByFilters.find(
      request.query
    );
    return {
      statusCode: 200,
      body: transactionList,
    };
  }
}
