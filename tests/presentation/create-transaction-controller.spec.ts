import { CreateTransaction } from "../../src/domain/usecases/create-transaction";
import { TransactionModel } from "../../src/domain/models/transaction";
import { CreateTransactionController } from "../../src/presentation/controllers/create-transaction-controller";

const makeTransactionRequest = (): {
  body: {
    amount: string;
    type: "Receipt" | "Payment";
    title: string;
    description: string;
  };
} => ({
  body: {
    amount: "any_amount",
    type: "Payment",
    title: "any_title",
    description: "any_description",
  },
});

const makeSut = (): {
  sut: CreateTransactionController;
  createTransactionStub: CreateTransaction;
} => {
  class CreateTransactionStub implements CreateTransaction {
    constructor() {}
    create(_: TransactionModel): Promise<TransactionModel> {
      return Promise.resolve({
        _id: "any__id",
        amount: "any_amount",
        type: "Payment",
        title: "any_title",
        description: "any_description",
        status: "active",
      });
    }
  }
  const createTransactionStub = new CreateTransactionStub();
  const sut = new CreateTransactionController(createTransactionStub);

  return { sut, createTransactionStub };
};

describe("CreateTransactionController", () => {
  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  test("Should call CreateTransaction with the correct values", async () => {
    const { sut, createTransactionStub } = makeSut();
    const createSpy = jest.spyOn(createTransactionStub, "create");
    await sut.handle(makeTransactionRequest());

    expect(createSpy).toHaveBeenCalledWith({
      amount: "any_amount",
      type: "Payment",
      title: "any_title",
      description: "any_description",
    });
  });
  test("Should throw if CreateTransaction throws", async () => {
    const { sut, createTransactionStub } = makeSut();
    jest
      .spyOn(createTransactionStub, "create")
      .mockRejectedValue(new Error("any_error"));
    const promiseRejected = sut.handle(makeTransactionRequest());

    await expect(promiseRejected).rejects.toThrow(new Error("any_error"));
  });
  test("Should return the correct data if succeeded", async () => {
    const { sut } = makeSut();
    const newTransaction = await sut.handle(makeTransactionRequest());

    expect(newTransaction).toEqual({
      statusCode: 200,
      body: {
        _id: "any__id",
        amount: "any_amount",
        type: "Payment",
        title: "any_title",
        description: "any_description",
        status: "active",
      },
    });
  });
});
