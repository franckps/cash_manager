import { DeleteAccountRepository } from "../../../../src/data/protocols/db/account/delete-account-repository";
import { DeleteAccount } from "../../../../src/domain/usecases/account/delete-account";
import { DbDeleteAccount } from "../../../../src/data/usecases/account/db-delete-account";

interface SutTypes {
  sut: DeleteAccount;
  deleteAccountRepositoryStub: DeleteAccountRepository;
}

const makeSut = (): SutTypes => {
  class DeleteAccountRepositoryStub implements DeleteAccountRepository {
    async delete(account: string): Promise<void> {
      return Promise.resolve();
    }
  }

  const deleteAccountRepositoryStub = new DeleteAccountRepositoryStub();
  const sut = new DbDeleteAccount(deleteAccountRepositoryStub);

  return { sut, deleteAccountRepositoryStub };
};

describe("#DbDeleteAccount", () => {
  test("Should call DeleteAccountRepository with correct value", async () => {
    const { sut, deleteAccountRepositoryStub } = makeSut();
    const deleteSpy = jest.spyOn(deleteAccountRepositoryStub, "delete");
    await sut.delete("123");
    expect(deleteSpy).toBeCalledWith("123");
  });
});
