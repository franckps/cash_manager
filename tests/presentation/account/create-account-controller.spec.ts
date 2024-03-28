import { CreateAccount } from "../../../src/domain/usecases/account/create-account";
import { AccountModel } from "../../../src/domain/models/account";
import { CreateAccountController } from "../../../src/presentation/controllers/account/create-account-controller";

const makeAccountRequest = (): {
  body: {
    account: string;
  };
} => ({
  body: {
    account: "any_account",
  },
});

const makeSut = (): {
  sut: CreateAccountController;
  createAccountStub: CreateAccount;
} => {
  class CreateAccountStub implements CreateAccount {
    constructor() {}
    create(_: AccountModel): Promise<AccountModel> {
      return Promise.resolve({
        account: "any_account",
        status: "active",
      });
    }
  }

  const createAccountStub = new CreateAccountStub();
  const sut = new CreateAccountController(createAccountStub);

  return { sut, createAccountStub };
};

describe("CreateAccountController", () => {
  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  test("Should call CreateAccount with the correct values", async () => {
    const { sut, createAccountStub } = makeSut();
    const createSpy = jest.spyOn(createAccountStub, "create");
    await sut.handle(makeAccountRequest());

    expect(createSpy).toHaveBeenCalledWith({
      account: "any_account",
    });
  });
  test("Should throw if CreateAccount throws", async () => {
    const { sut, createAccountStub } = makeSut();
    jest
      .spyOn(createAccountStub, "create")
      .mockRejectedValue(new Error("any_error"));
    const promiseRejected = sut.handle(makeAccountRequest());

    await expect(promiseRejected).rejects.toThrow(new Error("any_error"));
  });
  test("Should return the correct data if succeeded", async () => {
    const { sut } = makeSut();
    const newAccount = await sut.handle(makeAccountRequest());

    expect(newAccount).toEqual({
      statusCode: 200,
      body: {
        account: "any_account",
        status: "active",
      },
    });
  });
});
