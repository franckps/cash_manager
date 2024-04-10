import { CreateAccount } from "../../../src/domain/usecases/account/create-account";
import { AccountModel } from "../../../src/domain/models/account";
import { CreateAccountController } from "../../../src/presentation/controllers/account/create-account-controller";
import { Validator } from "../../../src/presentation/protocols/validator";
import { CreateAccountModel } from "../../../src/domain/usecases/account/create-account";

const makeAccountRequest = (): {
  body: {
    account: string;
    title: string;
  };
} => ({
  body: {
    account: "any_account",
    title: "Test Account",
  },
});

const makeSut = (): {
  sut: CreateAccountController;
  createAccountStub: CreateAccount;
  validatorStub: Validator<CreateAccountModel>;
} => {
  class CreateAccountStub implements CreateAccount {
    constructor() {}
    create(_: AccountModel): Promise<AccountModel> {
      return Promise.resolve({
        account: "any_account",
        status: "active",
        totalValue: 1,
        title: "Test Account",
      });
    }
  }

  class ValidatorStub implements Validator<CreateAccountModel> {
    validate(data: CreateAccountModel): void {}
  }

  const validatorStub = new ValidatorStub();
  const createAccountStub = new CreateAccountStub();
  const sut = new CreateAccountController(createAccountStub, validatorStub);

  return { sut, createAccountStub, validatorStub };
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
      title: "Test Account",
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
        totalValue: 1,
        title: "Test Account",
      },
    });
  });
  test("Should throw if Validator throws", async () => {
    const { sut, validatorStub } = makeSut();
    jest.spyOn(validatorStub, "validate").mockImplementation(() => {
      throw new Error("any_error");
    });
    const promiseRejected = sut.handle(makeAccountRequest());

    await expect(promiseRejected).rejects.toThrow(new Error("any_error"));
  });
});
