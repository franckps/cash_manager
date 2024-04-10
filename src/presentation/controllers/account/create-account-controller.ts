import {
  HttpRequest,
  HttpResponse,
} from "../../../presentation/protocols/http";
import { Controller } from "../../../presentation/protocols/controller";
import {
  CreateAccount,
  CreateAccountModel,
} from "../../../domain/usecases/account/create-account";
import { Validator } from "../../../presentation/protocols/validator";

export class CreateAccountController implements Controller {
  constructor(
    private readonly createAccount: CreateAccount,
    private readonly validator: Validator<CreateAccountModel>
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    this.validator.validate(request.body);
    const newAccount = await this.createAccount.create(request.body);
    return {
      statusCode: 200,
      body: newAccount,
    };
  }
}
