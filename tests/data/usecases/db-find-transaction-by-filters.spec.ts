import { DbFindTransactionByFilters } from "../../../src/data/usecases/transaction/db-find-transaction-by-filters";
import { FindTransactionByFiltersRepository } from "../../../src/data/protocols/db/transaction/find-transaction-by-filters-repository";
import { TransactionModel } from "../../../src/domain/models/transaction";

const makeTransactionFilter = (): {
  type?: "Receipt" | "Payment";
  amount?: [string, string];
  title?: string[];
  status?: "active" | "reverted";
} => ({
  amount: ["any_amount", "other_amount"],
  type: "Payment",
  title: ["any_title"],
  status: "active",
});

const makeSut = (): {
  sut: DbFindTransactionByFilters;
  findTransactionByFiltersRepositoryStub: FindTransactionByFiltersRepository;
} => {
  class FindTransactionByFiltersRepositoryStub
    implements FindTransactionByFiltersRepository
  {
    constructor() {}
    find(_: {
      type?: "Receipt" | "Payment";
      amount?: [string, string];
      title?: string[];
      status?: "active" | "reverted";
    }): Promise<TransactionModel[]> {
      return Promise.resolve([
        {
          _id: "1-2-3-4-5",
          amount: "any_amount",
          type: "Payment",
          title: "any_title",
          description: "any_description",
          status: "active",
        },
      ]);
    }
  }
  const findTransactionByFiltersRepositoryStub =
    new FindTransactionByFiltersRepositoryStub();
  const sut = new DbFindTransactionByFilters(
    findTransactionByFiltersRepositoryStub
  );

  return { sut, findTransactionByFiltersRepositoryStub };
};

describe("DbFindTransactionByFilters UseCase", () => {
  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  test("Should call FindTransactionByFiltersRepository with the correct values", async () => {
    const { sut, findTransactionByFiltersRepositoryStub } = makeSut();
    const findSpy = jest.spyOn(findTransactionByFiltersRepositoryStub, "find");
    await sut.find(makeTransactionFilter());

    expect(findSpy).toHaveBeenCalledWith({
      amount: ["any_amount", "other_amount"],
      type: "Payment",
      title: ["any_title"],
      status: "active",
    });
  });
  test("Should throw if FindTransactionByFiltersRepository throws", async () => {
    const { sut, findTransactionByFiltersRepositoryStub } = makeSut();
    jest
      .spyOn(findTransactionByFiltersRepositoryStub, "find")
      .mockRejectedValue(new Error("any_error"));
    jest.spyOn(sut, "find");
    const promiseRejected = sut.find(makeTransactionFilter());

    await expect(promiseRejected).rejects.toThrow();
  });
  test("Should return the correct data if succeeded", async () => {
    const { sut } = makeSut();
    const newTransaction = await sut.find(makeTransactionFilter());

    expect(newTransaction).toEqual([
      {
        _id: "1-2-3-4-5",
        amount: "any_amount",
        type: "Payment",
        title: "any_title",
        description: "any_description",
        status: "active",
      },
    ]);
  });
});
