import { CreateTransactionModel } from "../../src/domain/usecases/transaction/create-transaction";
import { CreateAccountModel } from "../../src/domain/usecases/account/create-account";
import {
  CreateTransactionValidator,
  CreateAccountValidator,
} from "../../src/utils/validators";

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

  describe("CreateAccountValidator", () => {
    test("Should throw if transaction title be empty", () => {
      const createAccountValidator = new CreateAccountValidator();
      const account = {
        title: "",
        account: "123456",
      } as CreateAccountModel;
      try {
        createAccountValidator.validate(account);
      } catch (err) {
        console.error(err);
        return expect(true).toBeTruthy();
      }
      expect(false).toBeTruthy();
    });

    test("Should throw if transaction account be empty", () => {
      const createAccountValidator = new CreateAccountValidator();
      const account = {
        title: "any_test",
        account: "",
      } as CreateAccountModel;
      try {
        createAccountValidator.validate(account);
      } catch (err) {
        console.error(err);
        return expect(true).toBeTruthy();
      }
      expect(false).toBeTruthy();
    });

    test("Should not throw if transaction data be correct", () => {
      const createAccountValidator = new CreateAccountValidator();
      const account = {
        title: "any_test",
        account: "123456",
      } as CreateAccountModel;

      createAccountValidator.validate(account);
      return expect(true).toBeTruthy();
    });
  });
});
