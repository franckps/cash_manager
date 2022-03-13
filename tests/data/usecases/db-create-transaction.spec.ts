import { DbCreateTransaction } from "../../../src/data/usecases/db-create-transaction";
import { CreateTransactionRepository } from "../../../src/data/protocols/db/create-transaction-repository";
import { TransactionModel } from "../../../src/domain/models/transaction";
import { CreateTransactionModel } from "../../../src/domain/usecases/create-transaction";

describe("DbCreateTransaction Usecase", () => {
  test("Should call CreateTransactionRepository with the correct values", async () => {
    class CreateTransactionRepositoryStub
      implements CreateTransactionRepository
    {
      constructor() {}
      create(transaction: CreateTransactionModel): Promise<TransactionModel> {
        return null as any;
      }
    }
    const createTransactionRepositoryStub =
      new CreateTransactionRepositoryStub();
    const sut = new DbCreateTransaction(createTransactionRepositoryStub);

    const createSpy = jest.spyOn(createTransactionRepositoryStub, "create");
    await sut.create({
      amount: "any_amount",
      type: "Payment",
      title: "any_title",
      description: "any_description",
    });

    expect(createSpy).toHaveBeenCalledWith({
      amount: "any_amount",
      type: "Payment",
      title: "any_title",
      description: "any_description",
    });
  });
});
