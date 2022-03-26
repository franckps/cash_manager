import { DbCreateTransaction } from "../../../src/data/usecases/db-create-transaction";
import { CreateTransactionRepository } from "../../../src/data/protocols/db/create-transaction-repository";
import { TransactionModel } from "../../../src/domain/models/transaction";
import { CreateTransactionModel } from "../../../src/domain/usecases/create-transaction";
import crypto from "crypto";

const makeTransactionData = (): {
  amount: string;
  type: "Receipt" | "Payment";
  title: string;
  description: string;
} => ({
  amount: "any_amount",
  type: "Payment",
  title: "any_title",
  description: "any_description",
});

const makeSut = (): {
  sut: DbCreateTransaction;
  createTransactionRepositoryStub: CreateTransactionRepository;
} => {
  class CreateTransactionRepositoryStub implements CreateTransactionRepository {
    constructor() {}
    create(transaction: TransactionModel): Promise<TransactionModel> {
      return Promise.resolve(transaction);
    }
  }
  const createTransactionRepositoryStub = new CreateTransactionRepositoryStub();
  const sut = new DbCreateTransaction(createTransactionRepositoryStub);

  return { sut, createTransactionRepositoryStub };
};

describe("DbCreateTransaction UseCase", () => {
  const spyRandomUUID = jest
    .spyOn(crypto, "randomUUID")
    .mockReturnValue("any_randomUUID");
  test("Should call the crypto randomUUID method to generate an unique id", async () => {
    const { sut } = makeSut();
    await sut.create(makeTransactionData());

    expect(spyRandomUUID).toHaveBeenCalled();
  });
  test("Should call CreateTransactionRepository with the correct values", async () => {
    const { sut, createTransactionRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createTransactionRepositoryStub, "create");
    await sut.create(makeTransactionData());

    expect(createSpy).toHaveBeenCalledWith({
      _id: "any_randomUUID",
      amount: "any_amount",
      type: "Payment",
      title: "any_title",
      description: "any_description",
      status: "active",
    });
  });
  test("Should throw if CreateTransactionRepository throws", async () => {
    const { sut, createTransactionRepositoryStub } = makeSut();
    jest
      .spyOn(createTransactionRepositoryStub, "create")
      .mockRejectedValue(new Error("any_error"));
    jest.spyOn(sut, "create");
    const promiseRejected = sut.create(makeTransactionData());

    await expect(promiseRejected).rejects.toThrow();
  });
  test("Should return the correct data if succeeded", async () => {
    const { sut } = makeSut();
    const newTransaction = await sut.create(makeTransactionData());

    expect(newTransaction).toEqual({
      _id: "any_randomUUID",
      amount: "any_amount",
      type: "Payment",
      title: "any_title",
      description: "any_description",
      status: "active",
    });
  });
});
