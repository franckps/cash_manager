import { GetTotalAmount } from "../../../src/domain/usecases/transaction/get-total-amount";
import { GetTotalAmountController } from "../../../src/presentation/controllers/transaction/get-total-amount-controller";

interface SutTypes {
  sut: GetTotalAmountController;
  getTotalAmountSut: GetTotalAmount;
}

const makeSut = (): SutTypes => {
  class GetTotalAmountSut implements GetTotalAmount {
    get(): Promise<{ amount: string }> {
      return Promise.resolve({ amount: "1" });
    }
  }

  const getTotalAmountSut = new GetTotalAmountSut();
  const sut = new GetTotalAmountController(getTotalAmountSut);

  return { sut, getTotalAmountSut };
};

describe("GetTotalAmountController", () => {
  test("should call GetTotalAmount correctly", async () => {
    const { sut, getTotalAmountSut } = makeSut();
    const getSpy = jest.spyOn(getTotalAmountSut, "get");
    sut.handle({});

    expect(getSpy).toHaveBeenCalled;
  });

  test("should throw if GetTotalAmount throws", async () => {
    const { sut, getTotalAmountSut } = makeSut();
    jest
      .spyOn(getTotalAmountSut, "get")
      .mockRejectedValue(new Error("any_error"));
    const promiseRejected = sut.handle({});

    await expect(promiseRejected).rejects.toThrow(new Error("any_error"));
  });

  test("should return correct data", async () => {
    const { sut } = makeSut();
    const result = await sut.handle({});

    expect(result.body.amount).toEqual("1");
  });
});
