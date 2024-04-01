import {
  CreateTransaction,
  CreateTransactionModel,
} from "../../../src/domain/usecases/transaction/create-transaction";
import { TransactionModel } from "../../../src/domain/models/transaction";
import { CreateTransactionController } from "../../../src/presentation/controllers/transaction/create-transaction-controller";
import { Validator } from "../../../src/presentation/protocols/validator";

const makeTransactionRequest = (): {
  body: {
    amount: string;
    type: "Receipt" | "Payment";
    title: string;
    description: string;
  };
  params: { account: string };
} => ({
  body: {
    amount: "any_amount",
    type: "Payment",
    title: "any_title",
    description: "any_description",
  },
  params: { account: "any_account" },
});

const makeSut = (): {
  sut: CreateTransactionController;
  createTransactionStub: CreateTransaction;
  validatorStub: Validator<CreateTransactionModel>;
} => {
  class CreateTransactionStub implements CreateTransaction {
    constructor() {}
    create(__: string, _: TransactionModel): Promise<TransactionModel> {
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

  class ValidatorStub implements Validator<CreateTransactionModel> {
    validate(data: CreateTransactionModel): void {}
  }

  const createTransactionStub = new CreateTransactionStub();
  const validatorStub = new ValidatorStub();
  const sut = new CreateTransactionController(
    createTransactionStub,
    validatorStub
  );

  return { sut, createTransactionStub, validatorStub };
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

    expect(createSpy).toHaveBeenCalledWith("any_account", {
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
  test("Should throw if Validator throws", async () => {
    const { sut, validatorStub } = makeSut();
    jest.spyOn(validatorStub, "validate").mockImplementation(() => {
      throw new Error("any_error");
    });
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
