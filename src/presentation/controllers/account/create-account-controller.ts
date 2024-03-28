import { HttpRequest, HttpResponse } from "src/presentation/protocols/http";
import { Controller } from "../../../presentation/protocols/controller";
import { CreateAccount } from "../../../domain/usecases/account/create-account";

export class CreateAccountController implements Controller {
  constructor(private readonly createAccount: CreateAccount) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const newAccount = await this.createAccount.create(request.body);
    return {
      statusCode: 200,
      body: newAccount,
    };
  }
}
