import {
  buildCreateTransactionController,
  buildFindTransactionByFiltersController,
} from "../../../src/infra/factories/controller-factory";
import { CreateTransactionController } from "../../../src/presentation/controllers/create-transaction-controller";
import { FindTransactionByFiltersController } from "../../../src/presentation/controllers/index-transaction-controller";
import { GetTotalAmountController } from "../../../src/presentation/controllers/get-total-amount-controller";

describe("Controller Factory", () => {
  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  test("#buildCreateTransactionController", () => {
    const controller = buildCreateTransactionController();
    expect(controller).toBeInstanceOf(CreateTransactionController);
  });

  test("#buildFindTransactionByFiltersController", () => {
    const controller = buildFindTransactionByFiltersController();
    expect(controller).toBeInstanceOf(FindTransactionByFiltersController);
  });

  test("#buildGetTotalAmountController", () => {
    const controller = buildGetTotalAmountController();
    expect(controller).toBeInstanceOf(GetTotalAmountController);
  });
});
