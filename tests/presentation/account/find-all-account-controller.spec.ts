import { FindAllAccount } from "../../../src/domain/usecases/account/find-all-account";
import { AccountModel } from "../../../src/domain/models/account";
import { FindAllAccountController } from "../../../src/presentation/controllers/account/find-all-account-controller";

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
  sut: FindAllAccountController;
  findAllAccountStub: FindAllAccount;
} => {
  class FindAllAccountStub implements FindAllAccount {
    constructor() {}
    findAll(): Promise<AccountModel[]> {
      return Promise.resolve([
        {
          account: "any_account",
          status: "active",
          totalValue: 1,
          title: "Test Account",
        },
      ]);
    }
  }

  const findAllAccountStub = new FindAllAccountStub();
  const sut = new FindAllAccountController(findAllAccountStub);

  return { sut, findAllAccountStub };
};

describe("FindAllAccountController", () => {
  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  test("Should call FindAllAccount", async () => {
    const { sut, findAllAccountStub } = makeSut();
    const findAllSpy = jest.spyOn(findAllAccountStub, "findAll");
    await sut.handle(makeAccountRequest());

    expect(findAllSpy).toHaveBeenCalled();
  });
  test("Should throw if FindAllAccount throws", async () => {
    const { sut, findAllAccountStub } = makeSut();
    jest
      .spyOn(findAllAccountStub, "findAll")
      .mockRejectedValue(new Error("any_error"));
    const promiseRejected = sut.handle(makeAccountRequest());

    await expect(promiseRejected).rejects.toThrow(new Error("any_error"));
  });
  test("Should return the correct data if succeeded", async () => {
    const { sut } = makeSut();
    const newAccount = await sut.handle(makeAccountRequest());

    expect(newAccount).toEqual({
      statusCode: 200,
      body: [
        {
          account: "any_account",
          status: "active",
          totalValue: 1,
          title: "Test Account",
        },
      ],
    });
  });
});
