import { DbRevertTransaction } from "../../../../src/data/usecases/transaction/db-revert-transaction";
import { RevertTransactionRepository } from "../../../../src/data/protocols/db/transaction/revert-transaction-repository";

const makeSut = (): {
  sut: DbRevertTransaction;
  revertTransactionRepositoryStub: RevertTransactionRepository;
} => {
  class RevertTransactionRepositoryStub implements RevertTransactionRepository {
    constructor() {}
    revert(_id: string): Promise<void> {
      return Promise.resolve();
    }
  }
  const revertTransactionRepositoryStub = new RevertTransactionRepositoryStub();
  const sut = new DbRevertTransaction(revertTransactionRepositoryStub);

  return { sut, revertTransactionRepositoryStub };
};

describe("DbRevertTransaction UseCase", () => {
  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  test("Should call RevertTransactionRepository with the correct values", async () => {
    const { sut, revertTransactionRepositoryStub } = makeSut();
    const findSpy = jest.spyOn(revertTransactionRepositoryStub, "revert");
    await sut.revert("any_id");

    expect(findSpy).toHaveBeenCalledWith("any_id");
  });
  test("Should throw if RevertTransactionRepository throws", async () => {
    const { sut, revertTransactionRepositoryStub } = makeSut();
    jest
      .spyOn(revertTransactionRepositoryStub, "revert")
      .mockRejectedValue(new Error("any_error"));
    jest.spyOn(sut, "revert");
    const promiseRejected = sut.revert("any_id");

    await expect(promiseRejected).rejects.toThrow();
  });
  test("Should return the correct data if succeeded", async () => {
    const { sut } = makeSut();
    const revertResponse = await sut.revert("any_id");

    expect(revertResponse).toEqual(undefined);
  });
});
