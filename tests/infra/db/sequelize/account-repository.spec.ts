import { Op } from "sequelize";
import { AccountModel } from "../../../../src/domain/models/account";
import { AccountRepository } from "../../../../src/infra/db/sequelize/account-repository";

const accountModel: AccountModel = {
  account: "1",
  status: "active",
};

interface Account {
  create(model: AccountModel): Promise<{ dataValues: AccountModel }>;

  update(
    data: { status: string },
    filter: {
      where: {
        account: string;
      };
    }
  ): Promise<{ dataValues: AccountModel }>;
}

interface SutTypes {
  sut: AccountRepository;
  accountStub: Account;
}

const makeAccountStub = () => {
  class AccountStub implements Account {
    update(
      data: { status: string },
      filter: { where: { account: string } }
    ): Promise<{ dataValues: AccountModel }> {
      return Promise.resolve({ dataValues: accountModel });
    }

    async create(model: AccountModel): Promise<{ dataValues: AccountModel }> {
      return Promise.resolve({ dataValues: accountModel });
    }
  }

  return new AccountStub();
};

const makeSut = (): SutTypes => {
  const accountStub = makeAccountStub();
  const sut = new AccountRepository(accountStub as any);

  return { sut, accountStub };
};

describe("Sequelize AccountRepository", () => {
  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  describe("#create", () => {
    test("should call Account.create correctly", async () => {
      const { sut, accountStub } = makeSut();
      const createSpy = jest.spyOn(accountStub, "create");
      await sut.create(accountModel);

      expect(createSpy).toBeCalledWith(accountModel);
    });
  });

  describe("#delete", () => {
    test("should call Account.update correctly", async () => {
      const { sut, accountStub } = makeSut();
      const updateSpy = jest.spyOn(accountStub, "update");
      await sut.delete("1-1-1-1-1");

      expect(updateSpy).toBeCalledWith(
        { status: "deleted" },
        {
          where: {
            account: "1-1-1-1-1",
          },
        }
      );
    });
  });
});
