import { DbFindTransactionById } from "../../../../src/data/usecases/transaction/db-find-transaction-by-id";
import { FindTransactionByIdRepository } from "../../../../src/data/protocols/db/transaction/find-transaction-by-id-repository";
import { TransactionModel } from "../../../../src/domain/models/transaction";

const makeSut = (): {
  sut: DbFindTransactionById;
  findTransactionByIdRepositoryStub: FindTransactionByIdRepository;
} => {
  class FindTransactionByIdRepositoryStub
    implements FindTransactionByIdRepository
  {
    constructor() {}
    findById(_id: string): Promise<TransactionModel> {
      return Promise.resolve({
        _id: "1-2-3-4-5",
        amount: "any_amount",
        type: "Payment",
        title: "any_title",
        description: "any_description",
        status: "active",
      });
    }
  }
  const findTransactionByIdRepositoryStub =
    new FindTransactionByIdRepositoryStub();
  const sut = new DbFindTransactionById(findTransactionByIdRepositoryStub);

  return { sut, findTransactionByIdRepositoryStub };
};

describe("DbFindTransactionById UseCase", () => {
  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  test("Should call FindTransactionByIdRepository with the correct values", async () => {
    const { sut, findTransactionByIdRepositoryStub } = makeSut();
    const findSpy = jest.spyOn(findTransactionByIdRepositoryStub, "findById");
    await sut.findById("any_id");

    expect(findSpy).toHaveBeenCalledWith("any_id");
  });
  test("Should throw if FindTransactionByIdRepository throws", async () => {
    const { sut, findTransactionByIdRepositoryStub } = makeSut();
    jest
      .spyOn(findTransactionByIdRepositoryStub, "findById")
      .mockRejectedValue(new Error("any_error"));
    jest.spyOn(sut, "findById");
    const promiseRejected = sut.findById("any_id");

    await expect(promiseRejected).rejects.toThrow();
  });
  test("Should return the correct data if succeeded", async () => {
    const { sut } = makeSut();
    const newTransaction = await sut.findById("any_id");

    expect(newTransaction).toEqual({
      _id: "1-2-3-4-5",
      amount: "any_amount",
      type: "Payment",
      title: "any_title",
      description: "any_description",
      status: "active",
    });
  });
});
