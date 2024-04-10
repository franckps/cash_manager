import { DbGetTotalAmount } from "../../../../src/data/usecases/transaction/db-get-total-amount";
import { GetTotalAmountRepository } from "../../../../src/data/protocols/db/transaction/get-total-amount-repository";
import { TotalAmountModel } from "../../../../src/domain/models/total-amount";

const makeSut = (): {
  sut: DbGetTotalAmount;
  getTotalAmountRepositoryStub: GetTotalAmountRepository;
} => {
  class GetTotalAmountRepositoryStub implements GetTotalAmountRepository {
    constructor() {}
    get(account: string): Promise<TotalAmountModel> {
      return Promise.resolve({
        amount: "any_amount",
      });
    }
  }
  const getTotalAmountRepositoryStub = new GetTotalAmountRepositoryStub();
  const sut = new DbGetTotalAmount(getTotalAmountRepositoryStub);

  return { sut, getTotalAmountRepositoryStub };
};

describe("DbGetTotalAmount UseCase", () => {
  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  test("Should call GetTotalAmountRepository", async () => {
    const { sut, getTotalAmountRepositoryStub } = makeSut();
    const findSpy = jest.spyOn(getTotalAmountRepositoryStub, "get");
    await sut.get("any_account");

    expect(findSpy).toHaveBeenCalled;
  });
  test("Should throw if GetTotalAmountRepository throws", async () => {
    const { sut, getTotalAmountRepositoryStub } = makeSut();
    jest
      .spyOn(getTotalAmountRepositoryStub, "get")
      .mockRejectedValue(new Error("any_error"));
    jest.spyOn(sut, "get");
    const promiseRejected = sut.get("any_account");

    await expect(promiseRejected).rejects.toThrow();
  });
  test("Should return the correct data if succeeded", async () => {
    const { sut } = makeSut();
    const newTransaction = await sut.get("any_account");

    expect(newTransaction).toEqual({
      amount: "any_amount",
    });
  });
});
