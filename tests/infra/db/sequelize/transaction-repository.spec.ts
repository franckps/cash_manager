import { Op } from "sequelize";
import { TransactionModel } from "../../../../src/domain/models/transaction";
import { TransactionFiltersModel } from "../../../../src/domain/usecases/find-transaction-by-filters";
import { TransactionRepository } from "../../../../src/infra/db/sequelize/transaction-repository";

const transactionModel: TransactionModel = {
  _id: "1-1-1-1-1",
  amount: "1",
  type: "Receipt",
  title: "Salario",
  description: "meu salario mensal",
  status: "active",
};

interface Transaction {
  create(model: TransactionModel): Promise<{ dataValues: TransactionModel }>;
  findAll(fiter: {
    where: {
      _id: string;
      amount: any;
      type: string;
      title: any;
      status: string;
    };
  }): Promise<{
    at: (ky: number) => { dataValues: TransactionModel };
    map: (elm: { dataValues: TransactionModel }) => TransactionModel[];
  }>;
  update(
    data: { status: string },
    filter: {
      where: {
        _id: string;
      };
    }
  ): Promise<{ dataValues: TransactionModel }>;
}

interface SutTypes {
  sut: TransactionRepository;
  transactionStub: Transaction;
}

const makeTransactionStub = () => {
  class TransactionStub implements Transaction {
    findAll(fiter: {
      where: {
        _id: string;
        amount: any;
        type: string;
        title: any;
        status: string;
      };
    }): Promise<{
      at: (ky: number) => { dataValues: TransactionModel };
      map: (elm: { dataValues: TransactionModel }) => TransactionModel[];
    }> {
      return Promise.resolve({
        at: (ky) => ({
          dataValues: transactionModel,
        }),
        map: (elm: { dataValues: TransactionModel }) => [transactionModel],
      });
    }

    update(
      data: { status: string },
      filter: { where: { _id: string } }
    ): Promise<{ dataValues: TransactionModel }> {
      return Promise.resolve({ dataValues: transactionModel });
    }

    async create(
      model: TransactionModel
    ): Promise<{ dataValues: TransactionModel }> {
      return Promise.resolve({ dataValues: transactionModel });
    }
  }

  return new TransactionStub();
};

const makeSut = (): SutTypes => {
  const transactionStub = makeTransactionStub();
  const sut = new TransactionRepository(transactionStub as any);

  return { sut, transactionStub };
};

describe("Sequelize TransactionRepository", () => {
  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  describe("#create", () => {
    test("should call Transaction.create correctly", async () => {
      const { sut, transactionStub } = makeSut();
      const createSpy = jest.spyOn(transactionStub, "create");
      await sut.create(transactionModel);

      expect(createSpy).toBeCalledWith(transactionModel);
    });
  });

  describe("#findById", () => {
    test("should call Transaction.findAll correctly", async () => {
      const { sut, transactionStub } = makeSut();
      const findAllSpy = jest.spyOn(transactionStub, "findAll");
      await sut.findById("1-1-1-1-1");

      expect(findAllSpy).toBeCalledWith({
        where: {
          _id: "1-1-1-1-1",
        },
      });
    });

    test("should throw error case Transaction doesn't find", async () => {
      const { sut, transactionStub } = makeSut();
      const findAllSpy = jest.spyOn(transactionStub, "findAll");
      findAllSpy.mockReturnValue(
        Promise.resolve({
          at: (ky) => null as any,
          map: (elm: { dataValues: TransactionModel }) => [transactionModel],
        })
      );

      try {
        await sut.findById("1-1-1-1-1");
        expect(true).toBeFalsy();
      } catch (err: any) {
        expect(err.message).toEqual("This transaction doesn't exist.");
      }
    });
  });

  describe("#find", () => {
    test("should call Transaction.findAll correctly", async () => {
      const filter: TransactionFiltersModel = {
        amount: ["1", "3"],
        type: "Receipt",
        title: ["Salario", "Extra"],
        status: "active",
      };
      const { sut, transactionStub } = makeSut();
      const findAllSpy = jest.spyOn(transactionStub, "findAll");
      await sut.find(filter);

      expect(findAllSpy).toBeCalledWith({
        where: {
          amount: { [Op.between]: ["1", "3"] },
          type: "Receipt",
          title: { [Op.or]: ["Salario", "Extra"] },
          status: "active",
        },
      });
    });

    test("should return empty array case Transaction doesn't find", async () => {
      const filter: TransactionFiltersModel = {
        amount: ["1", "3"],
        type: "Receipt",
        title: ["Salario", "Extra"],
        status: "active",
      };
      const { sut, transactionStub } = makeSut();
      const findAllSpy = jest.spyOn(transactionStub, "findAll");
      findAllSpy.mockReturnValue(
        Promise.resolve({
          at: (ky) => null as any,
          map: (elm: { dataValues: TransactionModel }) => [transactionModel],
        })
      );
      const result = await sut.find(filter);

      expect(result).toEqual([]);
    });
  });

  describe("#revert", () => {
    test("should call Transaction.update correctly", async () => {
      const { sut, transactionStub } = makeSut();
      const updateSpy = jest.spyOn(transactionStub, "update");
      await sut.revert("1-1-1-1-1");

      expect(updateSpy).toBeCalledWith(
        { status: "reverted" },
        {
          where: {
            _id: "1-1-1-1-1",
          },
        }
      );
    });
  });
});