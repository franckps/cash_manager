import { z } from "zod";
import { CreateTransactionModel } from "../domain/usecases/create-transaction";

const transactionScheme = z.object({
  amount: z.coerce.number().gt(0),
  type: z.enum(["Receipt", "Payment"]),
  title: z.string().nonempty(),
});

export class Validators {
  public validCreateTransaction(transaction: CreateTransactionModel): void {
    transactionScheme.parse(transaction);
  }
}
