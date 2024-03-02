import {
  buildCreateTransactionController,
  buildFindTransactionByFiltersController,
  buildGetTotalAmountController,
  buildRevertTransactionController,
  buildFindTransactionByIdController,
} from "../../../src/infra/factories/controller-factory";
import { CreateTransactionController } from "../../../src/presentation/controllers/create-transaction-controller";
import { FindTransactionByFiltersController } from "../../../src/presentation/controllers/index-transaction-controller";
import { GetTotalAmountController } from "../../../src/presentation/controllers/get-total-amount-controller";
import { RevertTransactionController } from "../../../src/presentation/controllers/revert-transaction-controller";
import { FindTransactionByIdController } from "../../../src/presentation/controllers/find-transaction-by-id-controller";

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

  test("#buildFindTransactionByIdController", () => {
    const controller = buildFindTransactionByIdController();
    expect(controller).toBeInstanceOf(FindTransactionByIdController);
  });
});
