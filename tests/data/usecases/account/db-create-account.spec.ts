import { CreateAccountRepository } from "../../../../src/data/protocols/db/account/create-account-repository";
import { AccountModel } from "../../../../src/domain/models/account";
import { CreateAccount } from "../../../../src/domain/usecases/account/create-account";
import { DbCreateAccount } from "../../../../src/data/usecases/account/db-create-account";

interface SutTypes {
  sut: CreateAccount;
  createAccountRepositoryStub: CreateAccountRepository;
}

const makeSut = (): SutTypes => {
  class CreateAccountRepositoryStub implements CreateAccountRepository {
    async create(account: AccountModel): Promise<AccountModel> {
      return Promise.resolve({
        account: "123",
        status: "active",
        totalValue: 1,
        title: "Test Account",
      });
    }
  }

  const createAccountRepositoryStub = new CreateAccountRepositoryStub();
  const sut = new DbCreateAccount(createAccountRepositoryStub);

  return { sut, createAccountRepositoryStub };
};

describe("#DbCreateAccount", () => {
  test("Should call CreateAccountRepository with correct value", async () => {
    const { sut, createAccountRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createAccountRepositoryStub, "create");
    await sut.create({ account: "123", title: "Test Account" });
    expect(createSpy).toBeCalledWith({ account: "123", title: "Test Account" });
  });

  test("Should return the new account on  success", async () => {
    const { sut } = makeSut();

    const result = await sut.create({ account: "123", title: "Test Account" });
    expect(result).toEqual({
      account: "123",
      status: "active",
      totalValue: 1,
      title: "Test Account",
    });
  });
});
