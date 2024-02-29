import {
  buildCreateTransactionController,
  buildFindTransactionByFiltersController,
  buildGetTotalAmountController,
  buildRevertTransactionController,
} from "../../../src/infra/factories/controller-factory";
import { CreateTransactionController } from "../../../src/presentation/controllers/create-transaction-controller";
import { FindTransactionByFiltersController } from "../../../src/presentation/controllers/index-transaction-controller";
import { GetTotalAmountController } from "../../../src/presentation/controllers/get-total-amount-controller";
import { RevertTransactionController } from "../../../src/presentation/controllers/revert-transaction-controller";

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

  test("#buildRevertTransactionController", () => {
    const controller = buildRevertTransactionController();
    expect(controller).toBeInstanceOf(RevertTransactionController);
  });
});
