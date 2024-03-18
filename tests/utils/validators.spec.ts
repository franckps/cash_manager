import { CreateTransactionModel } from "../../src/domain/usecases/create-transaction";
import { Validators } from "../../src/utils/validators";

describe("Validators", () => {
  test("Should throw if transaction amount be empty", () => {
    const validators = new Validators();
    const transaction = {
      amount: "",
      type: "Payment",
      title: "any_test",
      description: "any_description",
    } as CreateTransactionModel;
    try {
      validators.validCreateTransaction(transaction);
    } catch (err) {
      console.error(err);
      return expect(true).toBeTruthy();
    }
    expect(false).toBeTruthy();
  });

  test("Should throw if transaction type be empty", () => {
    const validators = new Validators();
    const transaction = {
      amount: "1",
      type: "" as any,
      title: "any_test",
      description: "any_description",
    } as CreateTransactionModel;
    try {
      validators.validCreateTransaction(transaction);
    } catch (err) {
      console.error(err);
      return expect(true).toBeTruthy();
    }
    expect(false).toBeTruthy();
  });

  test("Should throw if transaction title be empty", () => {
    const validators = new Validators();
    const transaction = {
      amount: "1",
      type: "Payment",
      title: "",
      description: "any_description",
    } as CreateTransactionModel;
    try {
      validators.validCreateTransaction(transaction);
    } catch (err) {
      console.error(err);
      return expect(true).toBeTruthy();
    }
    expect(false).toBeTruthy();
  });
});
