import { CreateTransactionModel } from "../../src/domain/usecases/transaction/create-transaction";
import { CreateTransactionValidator } from "../../src/utils/validators";

describe("Validators", () => {
  describe("CreateTransactionValidator", () => {
    test("Should throw if transaction amount be empty", () => {
      const createTransactionValidator = new CreateTransactionValidator();
      const transaction = {
        amount: "",
        type: "Payment",
        title: "any_test",
        description: "any_description",
      } as CreateTransactionModel;
      try {
        createTransactionValidator.validate(transaction);
      } catch (err) {
        console.error(err);
        return expect(true).toBeTruthy();
      }
      expect(false).toBeTruthy();
    });

    test("Should throw if transaction type be empty", () => {
      const createTransactionValidator = new CreateTransactionValidator();
      const transaction = {
        amount: "1",
        type: "" as any,
        title: "any_test",
        description: "any_description",
      } as CreateTransactionModel;
      try {
        createTransactionValidator.validate(transaction);
      } catch (err) {
        console.error(err);
        return expect(true).toBeTruthy();
      }
      expect(false).toBeTruthy();
    });

    test("Should throw if transaction title be empty", () => {
      const createTransactionValidator = new CreateTransactionValidator();
      const transaction = {
        amount: "1",
        type: "Payment",
        title: "",
        description: "any_description",
      } as CreateTransactionModel;
      try {
        createTransactionValidator.validate(transaction);
      } catch (err) {
        console.error(err);
        return expect(true).toBeTruthy();
      }
      expect(false).toBeTruthy();
    });
  });
});
