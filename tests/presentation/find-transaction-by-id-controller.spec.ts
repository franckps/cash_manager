import { FindTransactionById } from "../../src/domain/usecases/transaction/find-transaction-by-id";
import { TransactionModel } from "../../src/domain/models/transaction";
import { FindTransactionByIdController } from "../../src/presentation/controllers/find-transaction-by-id-controller";

interface SutTypes {
  sut: FindTransactionByIdController;
  findTransactionByIdStub: FindTransactionById;
}

const makeTransactionRequest = () => ({
  params: { id: "any__id" },
});

const transactionResult: TransactionModel = {
  _id: "any__id",
  amount: "any_amount",
  type: "Payment",
  title: "any_title",
  description: "any_description",
  status: "active",
};

const makeSut = (): SutTypes => {
  class FindTransactionByIdStub implements FindTransactionById {
    findById(_id: string): Promise<TransactionModel> {
      return Promise.resolve(transactionResult);
    }
  }
  const findTransactionByIdStub = new FindTransactionByIdStub();
  const sut = new FindTransactionByIdController(findTransactionByIdStub);

  return {
    sut,
    findTransactionByIdStub,
  };
};

describe("FindTransactionByIdController", () => {
  test("should call FindTransactionById correctly", async () => {
    const { sut, findTransactionByIdStub } = makeSut();
    const revertSpy = jest.spyOn(findTransactionByIdStub, "findById");
    sut.handle(makeTransactionRequest());

    expect(revertSpy).toHaveBeenCalledWith("any__id");
  });

  test("should throw if FindTransactionById throws", async () => {
    const { sut, findTransactionByIdStub } = makeSut();
    jest
      .spyOn(findTransactionByIdStub, "findById")
      .mockRejectedValue(new Error("any_error"));
    const promiseRejected = sut.handle(makeTransactionRequest());

    await expect(promiseRejected).rejects.toThrow(new Error("any_error"));
  });

  test("should return correct data", async () => {
    const { sut } = makeSut();
    const result = await sut.handle(makeTransactionRequest());

    expect(result.body).toEqual(transactionResult);
  });
});
