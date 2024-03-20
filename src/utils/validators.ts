import { z } from "zod";
import { CreateTransactionModel } from "../domain/usecases/create-transaction";
import { Validator } from "../presentation/protocols/validator";

const transactionScheme = z.object({
  amount: z.coerce.number().gt(0),
  type: z.enum(["Receipt", "Payment"]),
  title: z.string().nonempty(),
});

export class CreateTransactionValidator
  implements Validator<CreateTransactionModel>
{
  public validate(transaction: CreateTransactionModel): void {
    transactionScheme.parse(transaction);
  }
}
