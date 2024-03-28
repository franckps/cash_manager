import { DeleteTransaction } from "../../../src/domain/usecases/transaction/delete-transaction";
import { DeleteTransactionController } from "../../../src/presentation/controllers/transaction/delete-transaction-controller";

interface SutTypes {
  sut: DeleteTransactionController;
  deleteTransactionStub: DeleteTransaction;
}

const makeTransactionRequest = () => ({
  params: { id: "123" },
});

const makeSut = (): SutTypes => {
  class DeleteTransactionStub implements DeleteTransaction {
    delete(_id: string): Promise<void> {
      return Promise.resolve();
    }
  }
  const deleteTransactionStub = new DeleteTransactionStub();
  const sut = new DeleteTransactionController(deleteTransactionStub);

  return {
    sut,
    deleteTransactionStub,
  };
};

describe("DeleteTransactionController", () => {
  test("should call DeleteTransaction correctly", async () => {
    const { sut, deleteTransactionStub } = makeSut();
    const deleteSpy = jest.spyOn(deleteTransactionStub, "delete");
    sut.handle(makeTransactionRequest());

    expect(deleteSpy).toHaveBeenCalledWith("123");
  });

  test("should throw if DeleteTransaction throws", async () => {
    const { sut, deleteTransactionStub } = makeSut();
    jest
      .spyOn(deleteTransactionStub, "delete")
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
