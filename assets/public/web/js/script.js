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
    this.data = await this.deleteAccount(account);
    await this.update();
  },
  create: function (formId) {
    try {
      const form = document.getElementById(formId);
      const requestObject = {
        title: form["input-title"].value,
        account: form["input-account"].value,
      };
      this.createAccount(requestObject).then(async () => {
        await this.update();
        this.closePopupCreateAccount();
      });
    } catch (err) {
      console.error(err);
    }
    return false;
  },
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
  openPopupCreateAccount: function (account = this.account) {
    const htmlContent = `<p class="popup-title">
    Nova Conta
    <button type="button" onclick="accountData.closePopupCreateAccount()">+</button>
</p>
<fieldset class="popup-main">
    <form action="/api/v1/account/" method="post" id="account-form" onsubmit="return accountData.create('account-form')">
            <p class="input-container">
                <label for="input-title">Nome</label>
                <input type="text" name="title" id="input-title">
            </p>
            <p class="input-container">
                <label for="input-title">Número</label>
                <input type="text" name="account" id="input-account">
            </p>
            <p class="buttons-area">
                <button type="submit">CRIAR</button>
            </p>
    </form>
</fieldset>`;
    openPopup(htmlContent);
  },
  closePopupCreateAccount: function () {
    closePopup();
  },
  fetchAccounts: async function () {
    const request = await fetch(`/api/v1/account/`);
    const result = await request.json();
    console.log(result.body);
    return result.body;
  },
  deleteAccount: async function () {
    const request = await fetch(`/api/v1/account/`, {
      method: "DELETE",
    });
    const result = await request.json();
    return result.body;
  },
  createAccount: async function (accountData) {
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
