const accountData = {
  data: [],
  update: async function () {
    this.data = await this.fetchAccounts();
  },
  delete: async function (account) {
    const confirmation = this.askConfirmation(
      "Deseja realmente excluir permanentemente essa conta?"
    );
    if (!confirmation) return;
    this.data = await this.deleteTransaction(account);
    await this.update();
  },
  create: function (formId) {},
  askConfirmation: function (message) {
    return confirm(message);
  },
  fetchAccounts: async function () {
    const request = await fetch(`/api/v1/account/`);
    const result = await request.json();
    return result.body;
  },
  deleteTransaction: async function (account) {
    const request = await fetch(`/api/v1/account/${account}`, {
      method: "DELETE",
    });
    const result = await request.json();
    return result.body;
  },
  createTransaction: async function (accountData) {
    const request = await fetch(`/api/v1/account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountData),
    });
    const result = await request.json();
    return result.body;
  },
};

accountData.update(account);
