const accountData = {
  data: [],
  update: async function () {
    this.data = await this.fetchAccounts();
    this.renderList();
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
  renderList: function () {
    const mainContent = document.getElementById("content");
    let itemsHTML = this.data
      .map((element) => this.generateAccountList(element))
      .join("");
    mainContent.innerHTML = itemsHTML;
  },
  generateAccountList: function (account) {
    return `<a href="/web/transactions?account=${account.account}">
        <article>
                <h3>${account.title}</h3>
                <p>${account.account}</p>
                <span class="value">${formatAmount(account.totalValue)}</span>
        </article>
    </a>`;
  },
  fetchAccounts: async function () {
    const request = await fetch(`/api/v1/account/`);
    const result = await request.json();
    console.log(result.body);
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

accountData.update();
