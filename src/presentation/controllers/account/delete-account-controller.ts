import { DeleteAccount } from "src/domain/usecases/account/delete-account";
import { Controller } from "src/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "src/presentation/protocols/http";

export class DeleteAccountController implements Controller {
  constructor(private readonly deleteAccount: DeleteAccount) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    await this.deleteAccount.delete(request.params.account);

    return {
      statusCode: 200,
      body: {
        success: true,
      },
    };
  }
}
