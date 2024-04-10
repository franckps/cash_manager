import { z } from "zod";
import { CreateTransactionModel } from "../domain/usecases/transaction/create-transaction";
import { CreateAccountModel } from "../domain/usecases/account/create-account";
import { Validator } from "../presentation/protocols/validator";

const transactionScheme = z.object({
  amount: z.coerce.number().gt(0),
  type: z.enum(["Receipt", "Payment"]),
  title: z.string().nonempty(),
});

const accountScheme = z.object({
  account: z.coerce.number().gt(0),
  title: z.string().nonempty(),
});

export class CreateTransactionValidator
  implements Validator<CreateTransactionModel>
{
  public validate(transaction: CreateTransactionModel): void {
    transactionScheme.parse(transaction);
  }
}

export class CreateAccountValidator implements Validator<CreateAccountModel> {
  public validate(transaction: CreateAccountModel): void {
    accountScheme.parse(transaction);
  }
}
