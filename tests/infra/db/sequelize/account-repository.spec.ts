import Sequelize from "sequelize";
import { AccountModel } from "../../../../src/domain/models/account";
import { AccountRepository } from "../../../../src/infra/db/sequelize/account-repository";

const accountModel: AccountModel = {
  account: "1",
  status: "active",
  totalValue: 1,
  title: "Test Account",
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

  findAll(fiter: {
    where: {
      status: string;
    };
  }): Promise<{
    at: (ky: number) => { dataValues: AccountModel };
    map: (elm: { dataValues: AccountModel }) => AccountModel[];
  }>;
}

interface SutTypes {
  sut: AccountRepository;
  accountStub: Account;
  sequelizeStub: typeof Sequelize;
}

const makeAccountStub = () => {
  class AccountStub implements Account {
    update(
      data: { status: string },
      filter: { where: { account: string } }
    ): Promise<{ dataValues: AccountModel }> {
      return Promise.resolve({ dataValues: accountModel });
    }

    findAll(fiter: {
      where: {
        status: string;
      };
    }): Promise<{
      at: (ky: number) => { dataValues: AccountModel };
      map: (elm: { dataValues: AccountModel }) => AccountModel[];
    }> {
      return Promise.resolve({
        at: (ky) => ({
          dataValues: accountModel,
        }),
        map: (elm: { dataValues: AccountModel }) => [accountModel],
      });
    }

    async create(model: AccountModel): Promise<{ dataValues: AccountModel }> {
      return Promise.resolve({ dataValues: accountModel });
    }
  }

  return new AccountStub();
};

const makeSequelizeStub = (): typeof Sequelize => {
  return {
    literal: (query: string): any => null,
  } as typeof Sequelize;
};

const makeSut = (): SutTypes => {
  const accountStub = makeAccountStub();
  const sequelizeStub = makeSequelizeStub();
  const sut = new AccountRepository(accountStub as any, sequelizeStub);

  return { sut, accountStub, sequelizeStub };
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

  describe("#findAll", () => {
    test("should call Account.findAll correctly", async () => {
      const { sut, accountStub, sequelizeStub } = makeSut();
      const findAllSpy = jest.spyOn(accountStub, "findAll");
      const lirealSpy = jest.spyOn(sequelizeStub, "literal");
      await sut.findAll();

      expect(findAllSpy).toBeCalledWith({
        where: { status: "active" },
        attributes: {
          include: [[null, "totalValue"]],
        },
      });
      expect(lirealSpy).toBeCalledWith(`(SELECT SUM(amount) as amount FROM (
        SELECT SUM(amount) as amount
        FROM transactions
        WHERE
          status = 'active'
          AND type = 'Receipt'
          AND account = account.account
        UNION
        SELECT SUM(amount * -1) as amount
          FROM transactions
          WHERE
            status = 'active'
            AND type = 'Payment'
            AND account = account.account
      ))`);
    });
  });
});
