import {
  buildCreateTransactionController,
  buildFindTransactionByFiltersController,
  buildGetTotalAmountController,
  buildRevertTransactionController,
  buildDeleteTransactionController,
  buildFindTransactionByIdController,
  buildCreateAccountController,
  buildDeleteAccountController,
} from "../../../src/infra/factories/controller-factory";
import { CreateTransactionController } from "../../../src/presentation/controllers/transaction/create-transaction-controller";
import { FindTransactionByFiltersController } from "../../../src/presentation/controllers/transaction/index-transaction-controller";
import { GetTotalAmountController } from "../../../src/presentation/controllers/transaction/get-total-amount-controller";
import { RevertTransactionController } from "../../../src/presentation/controllers/transaction/revert-transaction-controller";
import { DeleteTransactionController } from "../../../src/presentation/controllers/transaction/delete-transaction-controller";
import { FindTransactionByIdController } from "../../../src/presentation/controllers/transaction/find-transaction-by-id-controller";
import { CreateAccountController } from "../../../src/presentation/controllers/account/create-account-controller";
import { DeleteAccountController } from "../../../src/presentation/controllers/account/delete-account-controller";

describe("Controller Factory", () => {
  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  describe("Transaction", () => {
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

    test("#buildDeleteTransactionController", () => {
      const controller = buildDeleteTransactionController();
      expect(controller).toBeInstanceOf(DeleteTransactionController);
    });
  });

  describe("Account", () => {
    test("#buildCreateAccountController", () => {
      const controller = buildCreateAccountController();
      expect(controller).toBeInstanceOf(CreateAccountController);
    });

    test("#buildDeleteAccountController", () => {
      const controller = buildDeleteAccountController();
      expect(controller).toBeInstanceOf(DeleteAccountController);
    });
  });
});
