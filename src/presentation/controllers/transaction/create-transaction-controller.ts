import {
  CreateTransaction,
  CreateTransactionModel,
} from "../../../domain/usecases/transaction/create-transaction";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { Validator } from "../../protocols/validator";

export class CreateTransactionController implements Controller {
  constructor(
    private readonly createTransaction: CreateTransaction,
    private readonly validator: Validator<CreateTransactionModel>
  ) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    this.validator.validate(request.body);
    const newTransaction = await this.createTransaction.create(request.body);
    return {
      statusCode: 200,
      body: newTransaction,
    };
  }
}
