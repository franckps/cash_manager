import { RevertTransaction } from "../../../src/domain/usecases/transaction/revert-transaction";
import { RevertTransactionController } from "../../../src/presentation/controllers/transaction/revert-transaction-controller";

interface SutTypes {
  sut: RevertTransactionController;
  revertTransactionStub: RevertTransaction;
}

const makeTransactionRequest = () => ({
  params: { id: "123" },
});

const makeSut = (): SutTypes => {
  class RevertTransactionStub implements RevertTransaction {
    revert(_id: string): Promise<void> {
      return Promise.resolve();
    }
  }
  const revertTransactionStub = new RevertTransactionStub();
  const sut = new RevertTransactionController(revertTransactionStub);

  return {
    sut,
    revertTransactionStub,
  };
};

describe("RevertTransactionController", () => {
  test("should call RevertTransaction correctly", async () => {
    const { sut, revertTransactionStub } = makeSut();
    const revertSpy = jest.spyOn(revertTransactionStub, "revert");
    sut.handle(makeTransactionRequest());

    expect(revertSpy).toHaveBeenCalledWith("123");
  });

  test("should throw if RevertTransaction throws", async () => {
    const { sut, revertTransactionStub } = makeSut();
    jest
      .spyOn(revertTransactionStub, "revert")
      .mockRejectedValue(new Error("any_error"));
    const promiseRejected = sut.handle(makeTransactionRequest());

    await expect(promiseRejected).rejects.toThrow(new Error("any_error"));
  });

  test("should return correct data", async () => {
    const { sut } = makeSut();
    const result = await sut.handle(makeTransactionRequest());

    expect(result.body.success).toEqual(true);
  });
});
