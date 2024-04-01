import { Op } from "sequelize";
import { TransactionModel } from "../../../../src/domain/models/transaction";
import { TransactionFiltersModel } from "../../../../src/domain/usecases/transaction/find-transaction-by-filters";
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
      account: string;
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
        account: string;
      };
    }
  ): Promise<{ dataValues: TransactionModel }>;
  sum(
    property: string,
    filter: { where: { status: string; type: string; account: string } }
  ): Promise<number>;
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
        account: string;
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
      filter: { where: { _id: string; account: string } }
    ): Promise<{ dataValues: TransactionModel }> {
      return Promise.resolve({ dataValues: transactionModel });
    }

    async create(
      model: TransactionModel
    ): Promise<{ dataValues: TransactionModel }> {
      return Promise.resolve({ dataValues: transactionModel });
    }

    async sum(
      property: string,
      filter: { where: { status: string; type: string; account: string } }
    ): Promise<number> {
      return Promise.resolve(1);
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
      await sut.create("any_account", transactionModel);

      expect(createSpy).toBeCalledWith({
        ...transactionModel,
        account: "any_account",
      });
    });
  });

  describe("#findById", () => {
    test("should call Transaction.findAll correctly", async () => {
      const { sut, transactionStub } = makeSut();
      const findAllSpy = jest.spyOn(transactionStub, "findAll");
      await sut.findById("any_account", "1-1-1-1-1");

      expect(findAllSpy).toBeCalledWith({
        where: {
          _id: "1-1-1-1-1",
          account: "any_account",
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
        await sut.findById("any_account", "1-1-1-1-1");
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
      await sut.find("any_account", filter);

      expect(findAllSpy).toBeCalledWith({
        where: {
          amount: { [Op.between]: ["1", "3"] },
          type: "Receipt",
          title: { [Op.or]: ["Salario", "Extra"] },
          status: "active",
          account: "any_account",
        },
      });
    });

    test("should return empty array case Transaction doesn't find", async () => {
      const filter: TransactionFiltersModel = {
        amount: ["1", "3"],
        type: "Receipt",
        title: ["Salario", "Extra"],
        status: "active",
        account: "any_account",
      };
      const { sut, transactionStub } = makeSut();
      const findAllSpy = jest.spyOn(transactionStub, "findAll");
      findAllSpy.mockReturnValue(
        Promise.resolve({
          at: (ky) => null as any,
          map: (elm: { dataValues: TransactionModel }) => [transactionModel],
        })
      );
      const result = await sut.find("any_account", filter);

      expect(result).toEqual([]);
    });

    test("should not return deleted transactions case no status filter", async () => {
      const filter: TransactionFiltersModel = {
        amount: ["1", "3"],
        type: "Receipt",
        title: ["Salario", "Extra"],
        account: "any_account",
      };
      const { sut, transactionStub } = makeSut();
      const findAllSpy = jest.spyOn(transactionStub, "findAll");
      await sut.find("any_account", filter);

      expect(findAllSpy).toBeCalledWith({
        where: {
          amount: { [Op.between]: ["1", "3"] },
          type: "Receipt",
          title: { [Op.or]: ["Salario", "Extra"] },
          status: { [Op.not]: "deleted" },
          account: "any_account",
        },
      });
    });

    test("should not return deleted transactions even case status filter try", async () => {
      const filter: TransactionFiltersModel = {
        amount: ["1", "3"],
        type: "Receipt",
        title: ["Salario", "Extra"],
        status: "deleted",
        account: "any_account",
      };
      const { sut, transactionStub } = makeSut();
      const findAllSpy = jest.spyOn(transactionStub, "findAll");
      await sut.find("any_account", filter);

      expect(findAllSpy).toBeCalledWith({
        where: {
          amount: { [Op.between]: ["1", "3"] },
          type: "Receipt",
          title: { [Op.or]: ["Salario", "Extra"] },
          status: { [Op.not]: "deleted" },
          account: "any_account",
        },
      });
    });
  });

  describe("#revert", () => {
    test("should call findById and Transaction.update correctly", async () => {
      const { sut, transactionStub } = makeSut();
      const findByIdSpy = jest.spyOn(sut, "findById");
      const updateSpy = jest.spyOn(transactionStub, "update");
      findByIdSpy.mockReturnValueOnce(
        Promise.resolve({
          _id: "1-1-1-1-1",
          amount: "any_amount",
          type: "Payment",
          title: "any_title",
          description: "any_description",
          status: "active",
        })
      );
      await sut.revert("any_account", "1-1-1-1-1");

      expect(findByIdSpy).toBeCalledWith("any_account", "1-1-1-1-1");
      expect(updateSpy).toBeCalledWith(
        { status: "reverted" },
        {
          where: {
            _id: "1-1-1-1-1",
            account: "any_account",
          },
        }
      );
    });

    test("should call findById and Transaction.update correctly when already reverted", async () => {
      const { sut, transactionStub } = makeSut();
      const findByIdSpy = jest.spyOn(sut, "findById");
      const updateSpy = jest.spyOn(transactionStub, "update");
      findByIdSpy.mockReturnValueOnce(
        Promise.resolve({
          _id: "1-1-1-1-1",
          amount: "any_amount",
          type: "Payment",
          title: "any_title",
          description: "any_description",
          status: "reverted",
        })
      );
      await sut.revert("any_account", "1-1-1-1-1");

      expect(findByIdSpy).toBeCalledWith("any_account", "1-1-1-1-1");
      expect(updateSpy).toBeCalledWith(
        { status: "active" },
        {
          where: {
            _id: "1-1-1-1-1",
            account: "any_account",
          },
        }
      );
    });
  });

  describe("#get", () => {
    test("should call Transaction.sum correctly", async () => {
      const { sut, transactionStub } = makeSut();
      const updateSpy = jest.spyOn(transactionStub, "sum");
      const { amount } = await sut.get("any_account");

      expect(updateSpy).toBeCalledWith("amount", {
        where: { status: "active", type: "Receipt", account: "any_account" },
      });
      expect(updateSpy).toHaveBeenLastCalledWith("amount", {
        where: { status: "active", type: "Payment", account: "any_account" },
      });
      expect(amount).toEqual("0");
    });
  });

  describe("#delete", () => {
    test("should call Transaction.update correctly", async () => {
      const { sut, transactionStub } = makeSut();
      const updateSpy = jest.spyOn(transactionStub, "update");
      await sut.delete("any_account", "1-1-1-1-1");

      expect(updateSpy).toBeCalledWith(
        { status: "deleted" },
        {
          where: {
            _id: "1-1-1-1-1",
            account: "any_account",
          },
        }
      );
    });
  });
});
