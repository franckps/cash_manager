import {
  FindTransactionByFilters,
  TransactionFiltersModel,
} from "../../../src/domain/usecases/transaction/find-transaction-by-filters";
import { TransactionModel } from "../../../src/domain/models/transaction";
import { FindTransactionByFiltersController } from "../../../src/presentation/controllers/transaction/index-transaction-controller";

const makeTransactionRequest = (): {
  query: {
    amount: string;
    type: "Receipt" | "Payment";
    title: string;
    status: "active" | "reverted";
  };
  params: { account: string };
} => ({
  query: {
    amount: "any_amount",
    type: "Payment",
    title: "any_title",
    status: "active",
  },
  params: { account: "any_account" },
});

const makeSut = (): {
  sut: FindTransactionByFiltersController;
  findTransactionByFiltersControllerStub: FindTransactionByFilters;
} => {
  class FindTransactionByFiltersStub implements FindTransactionByFilters {
    constructor() {}
    find(__: string, _: TransactionFiltersModel): Promise<TransactionModel[]> {
      return Promise.resolve([
        {
          _id: "any__id",
          amount: "any_amount",
          type: "Payment",
          title: "any_title",
          description: "any_description",
          status: "active",
        },
      ]);
    }
  }
  const findTransactionByFiltersControllerStub =
    new FindTransactionByFiltersStub();
  const sut = new FindTransactionByFiltersController(
    findTransactionByFiltersControllerStub
  );

  return { sut, findTransactionByFiltersControllerStub };
};

describe("FindTransactionByFilters", () => {
  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  test("Should call FindTransactionByFiltersController with the correct values", async () => {
    const { sut, findTransactionByFiltersControllerStub } = makeSut();
    const findSpy = jest.spyOn(findTransactionByFiltersControllerStub, "find");
    await sut.handle(makeTransactionRequest());

    expect(findSpy).toHaveBeenCalledWith("any_account", {
      amount: "any_amount",
      type: "Payment",
      title: "any_title",
      status: "active",
    });
  });
  test("Should throw if FindTransactionByFiltersController throws", async () => {
    const { sut, findTransactionByFiltersControllerStub } = makeSut();
    jest
      .spyOn(findTransactionByFiltersControllerStub, "find")
      .mockRejectedValue(new Error("any_error"));
    const promiseRejected = sut.handle(makeTransactionRequest());

    await expect(promiseRejected).rejects.toThrow(new Error("any_error"));
  });
  test("Should return the correct data if succeeded", async () => {
    const { sut } = makeSut();
    const newTransaction = await sut.handle(makeTransactionRequest());

    expect(newTransaction).toEqual({
      statusCode: 200,
      body: [
        {
          _id: "any__id",
          amount: "any_amount",
          type: "Payment",
          title: "any_title",
          description: "any_description",
          status: "active",
        },
      ],
    });
  });
});
