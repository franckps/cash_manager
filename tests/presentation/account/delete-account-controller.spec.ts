import { DeleteAccount } from "../../../src/domain/usecases/account/delete-account";
import { DeleteAccountController } from "../../../src/presentation/controllers/account/delete-account-controller";

interface SutTypes {
  sut: DeleteAccountController;
  deleteAccountStub: DeleteAccount;
}

const makeAccountRequest = () => ({
  params: { account: "123" },
});

const makeSut = (): SutTypes => {
  class DeleteAccountStub implements DeleteAccount {
    delete(account: string): Promise<void> {
      return Promise.resolve();
    }
  }
  const deleteAccountStub = new DeleteAccountStub();
  const sut = new DeleteAccountController(deleteAccountStub);

  return {
    sut,
    deleteAccountStub,
  };
};

describe("DeleteAccountController", () => {
  test("should call DeleteAccount correctly", async () => {
    const { sut, deleteAccountStub } = makeSut();
    const deleteSpy = jest.spyOn(deleteAccountStub, "delete");
    sut.handle(makeAccountRequest());

    expect(deleteSpy).toHaveBeenCalledWith("123");
  });

  test("should throw if DeleteAccount throws", async () => {
    const { sut, deleteAccountStub } = makeSut();
    jest
      .spyOn(deleteAccountStub, "delete")
      .mockRejectedValue(new Error("any_error"));
    const promiseRejected = sut.handle(makeAccountRequest());

    await expect(promiseRejected).rejects.toThrow(new Error("any_error"));
  });

  test("should return correct data", async () => {
    const { sut } = makeSut();
    const result = await sut.handle(makeAccountRequest());

    expect(result.body.success).toEqual(true);
  });
});
