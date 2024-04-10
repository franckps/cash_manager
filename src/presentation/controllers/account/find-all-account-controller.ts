import { FindAllAccount } from "src/domain/usecases/account/find-all-account";
import { Controller } from "src/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "src/presentation/protocols/http";

export class FindAllAccountController implements Controller {
  constructor(private readonly findAllAccount: FindAllAccount) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const result = await this.findAllAccount.findAll();
    return {
      statusCode: 200,
      body: result,
    };
  }
}
