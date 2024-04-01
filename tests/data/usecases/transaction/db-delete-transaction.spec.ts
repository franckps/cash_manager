import { DbDeleteTransaction } from "../../../../src/data/usecases/transaction/db-delete-transaction";
import { DeleteTransactionRepository } from "../../../../src/data/protocols/db/transaction/delete-transaction-repository";

const makeSut = (): {
  sut: DbDeleteTransaction;
  deleteTransactionRepositoryStub: DeleteTransactionRepository;
} => {
  class DeleteTransactionRepositoryStub implements DeleteTransactionRepository {
    constructor() {}
    delete(account: string, _id: string): Promise<void> {
      return Promise.resolve();
    }
  }
  const deleteTransactionRepositoryStub = new DeleteTransactionRepositoryStub();
  const sut = new DbDeleteTransaction(deleteTransactionRepositoryStub);

  return { sut, deleteTransactionRepositoryStub };
};

describe("DbDeleteTransaction UseCase", () => {
  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  test("Should call DeleteTransactionRepository with the correct values", async () => {
    const { sut, deleteTransactionRepositoryStub } = makeSut();
    const findSpy = jest.spyOn(deleteTransactionRepositoryStub, "delete");
    await sut.delete("any_account", "any_id");

    expect(findSpy).toHaveBeenCalledWith("any_account", "any_id");
  });
  test("Should throw if DeleteTransactionRepository throws", async () => {
    const { sut, deleteTransactionRepositoryStub } = makeSut();
    jest
      .spyOn(deleteTransactionRepositoryStub, "delete")
      .mockRejectedValue(new Error("any_error"));
    jest.spyOn(sut, "delete");
    const promiseRejected = sut.delete("any_account", "any_id");

    await expect(promiseRejected).rejects.toThrow();
  });
  test("Should return the correct data if succeeded", async () => {
    const { sut } = makeSut();
    const deleteResponse = await sut.delete("any_account", "any_id");

    expect(deleteResponse).toEqual(undefined);
  });
});
