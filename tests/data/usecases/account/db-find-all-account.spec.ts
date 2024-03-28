import { FindAllAccountRepository } from "../../../../src/data/protocols/db/account/find-all-account-repository";
import { AccountModel } from "../../../../src/domain/models/account";
import { FindAllAccount } from "../../../../src/domain/usecases/account/find-all-account";
import { DbFindAllAccount } from "../../../../src/data/usecases/account/db-find-all-account";

interface SutTypes {
  sut: FindAllAccount;
  findAllAccountRepositoryStub: FindAllAccountRepository;
}

const makeSut = (): SutTypes => {
  class FindAllAccountRepositoryStub implements FindAllAccountRepository {
    async findAll(): Promise<AccountModel[]> {
      return Promise.resolve([{ account: "123", status: "active" }]);
    }
  }

  const findAllAccountRepositoryStub = new FindAllAccountRepositoryStub();
  const sut = new DbFindAllAccount(findAllAccountRepositoryStub);

  return { sut, findAllAccountRepositoryStub };
};

describe("#DbFindAllAccount", () => {
  test("Should call FindAllAccountRepository with correct value", async () => {
    const { sut, findAllAccountRepositoryStub } = makeSut();
    const findAllSpy = jest.spyOn(findAllAccountRepositoryStub, "findAll");
    await sut.findAll();
    expect(findAllSpy).toBeCalledWith();
  });

  test("Should return all the accounts on  success", async () => {
    const { sut } = makeSut();

    const result = await sut.findAll();
    expect(result).toEqual([{ account: "123", status: "active" }]);
  });
});
