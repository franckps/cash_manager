const transactionData = {
  data: [],
  filterData: [],
  filterString: "",
  sortArray: ["", ""],
  update: async function () {
    this.data = await this.fetchTransactions();
    this.filter();
  },
  revert: async function (id, action) {
    const confirmation = this.askConfirmation(
      `Deseja realmente ${action ? action : "reverter"} essa transação?`
    );
    if (!confirmation) return;
    this.data = await this.revertTransaction(id);
    await this.update();
  },
  delete: async function (id) {
    const confirmation = this.askConfirmation(
      "Deseja realmente excluir permanentemente essa transação?"
    );
    if (!confirmation) return;
    this.data = await this.deleteTransaction(id);
    await this.update();
  },
  create: function (formId) {
    try {
      const form = document.getElementById(formId);
      const requestObject = {
        type: form["input-type"].value,
        amount: form["input-amount"].value,
        title: form["input-title"].value,
        description: form["input-description"].value,
      };
      this.createTransaction(requestObject).then(async () => {
        await this.update();
        this.closePopupCreateTransaction();
      });
    } catch (err) {
      console.error(err);
    }
    return false;
  },
  askConfirmation: function (message) {
    return confirm(message);
  },
  filter: function () {
    this.updateFilterString();

    this.filterData = [];

    if (!this.filterString || this.filterString == "") {
      this.filterData = this.data;
      this.renderList();
      return;
    }

    this.data.forEach((element) => {
      let valoresJoined =
        Object.values(element).join(" ") +
        " " +
        this.formatDate(element.createdAt) +
        " " +
        this.formatType(element.type) +
        " " +
        this.formatAmount(element.amount);

      valoresJoined = valoresJoined.toLowerCase();
      const strFilter = this.filterString.toLowerCase();

      if (new RegExp(`.*${strFilter}.*`).test(valoresJoined))
        this.filterData.push(element);
    });
    this.renderList();
  },
  renderList: function () {
    const mainContent = document.getElementById("content");
    let itemsHTML = this.filterData
      .map((element) => this.generateItemHTML(element))
      .join("");
    mainContent.innerHTML = itemsHTML;
  },
  formatDate: function (stringDate) {
    let dateString = stringDate.split(" +00:00")[0];
    const datetime = new Date(dateString);

    const [day, month, year, hour, minutes, secounds] = [
      datetime.getDate(),
      datetime.getMonth(),
      datetime.getFullYear(),
      datetime.getHours(),
      datetime.getMinutes(),
      datetime.getSeconds(),
    ];

    return `${day}/${month + 1}/${year} ${hour}:${minutes}:${secounds}`;
  },
  formatType: function (type) {
    return type == "Receipt" ? "ENTRADA" : "SAÍDA";
  },
  formatAmount: function (amount) {
    return `R$ ${amount}`;
  },
  generateTransactionDetail: function ({
    title,
    createdAt,
    type,
    amount,
    description,
    status,
  }) {
    return `<p class="popup-title">
        Drtalhes da transação
        <button type="button" onclick="transactionData.closePopupTransactionDetail()">+</button>
    </p>
    <div class="popup-main transaction-info">
    <article>
        <h3>Transação</h3>
        <p>${title}</p>
    </article>
    <article>
        <h3>Tipo</h3>
        <p>${this.formatType(type)}</p>
    </article>
    <article>
        <h3>Data e hora</h3>
        <p>${this.formatDate(createdAt)}</p>
    </article>
    <article>
        <h3>Valor</h3>
        <p>${this.formatAmount(amount)}</p>
    </article>
    <article>
        <h3>Estado atual</h3>
        <p>${status == "active" ? "Ativa" : "Inativa"}</p>
    </article>
    <article>
        <h3>Descrição</h3>
        <p>${description}</p>
    </article>
</div>`;
  },
  generateItemHTML: function (itemData) {
    return `
        <section class="content-item ${
          itemData.status == "reverted" ? "reverted" : ""
        } ${itemData.type.toLowerCase()}">
            <p class="col1" title="${itemData.title}">${itemData.title}</p>
            <p class="col2"><span class="${itemData.type.toLowerCase()}">${this.formatType(
      itemData.type
    )}</span></p>
            <p class="col3" title="${this.formatDate(
              itemData.createdAt
            )}">${this.formatDate(itemData.createdAt)}</p>
            <p class="col4" title="${itemData.description}">${
      itemData.description
    }</p>
            <p class="col5" title="${this.formatAmount(
              itemData.amount
            )}">${this.formatAmount(itemData.amount)}</p>
            <p class="btn-section hidden col6" onclick="openButtonMenu(this, '${
              itemData._id
            }', ${
      itemData.status == "active" ? "true, false, false" : "false, true, true"
    }, {title: '${itemData.title}', createdAt: '${itemData.createdAt}',type: '${
      itemData.type
    }', amount: '${itemData.amount}', description: '${
      itemData.description
    }', status: '${itemData.status}'})"></p>
        </section>
    `;
  },
  updateFilterString: function () {
    const filterField = document.getElementById("filter");
    this.filterString = filterField.value;
  },
  fetchTransactions: async function () {
    const request = await fetch("/api/v1/");
    const result = await request.json();
    return result.body;
  },
  revertTransaction: async function (id) {
    const request = await fetch("/api/v1/" + id + "/revert", {
      method: "PATCH",
    });
    const result = await request.json();
    return result.body;
  },
  deleteTransaction: async function (id) {
    const request = await fetch("/api/v1/" + id, {
      method: "DELETE",
    });
    const result = await request.json();
    return result.body;
  },
  createTransaction: async function (transactionData) {
    const request = await fetch("/api/v1/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    });
    const result = await request.json();
    return result.body;
  },
  sort: function (column /** column name */, ref /** ASC | DES */ = "asc") {
    if (!!column) this.sortArray = [column, ref.toLowerCase()];
    if (!this.sortArray[0]) {
      this.filter();
      return;
    }

    let aux = this.data.sort((first, other) => {
      result =
        first[column] > other[column]
          ? -1
          : first[column] < other[column]
          ? 1
          : 0;
      if (this.sortArray[1] == "asc") result = result * -1;

      return result;
    });

    this.data = aux;
    this.filter();
  },
  openPopupTransactionDetail: function (transaction) {
    closeAllButtomMenus();
    const htmlContent = this.generateTransactionDetail(transaction);
    document.querySelector("#popup-screen .popup-content").innerHTML =
      htmlContent;
    const popupScreen = document.getElementById("popup-screen");
    popupScreen.classList.remove("hidden");
  },
  closePopupTransactionDetail: function () {
    const popupScreen = document.getElementById("popup-screen");
    popupScreen.classList.add("hidden");
  },
  openPopupCreateTransaction: function () {
    closeAllButtomMenus();
    const htmlContent = `<p class="popup-title">
    Nova Transação
    <button type="button" onclick="transactionData.closePopupCreateTransaction()">+</button>
</p>
<fieldset class="popup-main">
    <form action="/api/v1/" method="post" id="transaction-form" onsubmit="return transactionData.create('transaction-form')">
            <p class="input-container">
                <label for="input-title">Nome</label>
                <input type="text" name="title" id="input-title">
            </p>
            <p class="input-container">
                <label for="input-type">Tipo</label>
                <select name="type" id="input-type">
                    <option value="Receipt">ENTRADA</option>
                    <option value="Payment">SAÍDA</option>
                </select>
            </p>
            <p class="input-container">
                <label for="input-amount">Valor</label>
                <input type="number" name="amount" id="input-amount">
            </p>
            <p class="input-container">
                <label for="input-description">Detalhes</label>
                <textarea name="description" id="input-description" cols="30" rows="10"></textarea>
            </p>
            <p class="buttons-area">
                <button type="submit">CRIAR</button>
            </p>
    </form>
</fieldset>`;
    document.querySelector("#popup-screen .popup-content").innerHTML =
      htmlContent;
    const popupScreen = document.getElementById("popup-screen");
    popupScreen.classList.remove("hidden");
  },
  closePopupCreateTransaction: function () {
    const popupScreen = document.getElementById("popup-screen");
    popupScreen.classList.add("hidden");
  },
};
let currentlyOpenedBy = null;
const openButtonMenu = async (
  elm,
  id,
  extornar,
  excluir,
  restaurar,
  trensaction
) => {
  closeAllButtomMenus();

  if (currentlyOpenedBy == elm) {
    currentlyOpenedBy = null;
    return;
  }

  await awaitSecounds(0.2);

  const itemsMenuRestore = document.getElementById("items-menu-restore");
  const itemsMenuRevert = document.getElementById("items-menu-revert");
  const itemsMenuExclude = document.getElementById("items-menu-exclude");
  const itemsMenuDetail = document.getElementById("items-menu-detail");

  if (!!extornar) itemsMenuRevert.classList.remove("hidden");
  else itemsMenuRevert.classList.add("hidden");
  if (!!excluir) itemsMenuExclude.classList.remove("hidden");
  else itemsMenuExclude.classList.add("hidden");
  if (!!restaurar) itemsMenuRestore.classList.remove("hidden");
  else itemsMenuRestore.classList.add("hidden");

  itemsMenuDetail.classList.remove("hidden");

  itemsMenuRestore.onclick = () => {
    closeAllButtomMenus();
    transactionData.revert(id, "restaurar");
  };
  itemsMenuRevert.onclick = () => {
    closeAllButtomMenus();
    transactionData.revert(id, "reverter");
  };
  itemsMenuExclude.onclick = () => {
    closeAllButtomMenus();
    transactionData.delete(id);
  };
  itemsMenuDetail.onclick = () => {
    closeAllButtomMenus();
    transactionData.openPopupTransactionDetail(trensaction);
  };

  const itemsMenu = document.getElementById("items-menu");
  const topAdjust = document.body.getBoundingClientRect().top;
  const rightAdjust = document.body.getBoundingClientRect().right;
  const top = elm.getBoundingClientRect().top;
  const right = elm.getBoundingClientRect().right;
  const width = elm.getBoundingClientRect().width;
  const height = itemsMenu.getBoundingClientRect().height;
  itemsMenu.style.top =
    Math.round(top + ((102 - height) / 34) * 15 + topAdjust * -1 - 8) + "px";
  itemsMenu.style.right = Math.round(rightAdjust - right + width / 2) + "px";
  itemsMenu.classList.remove("hidden");
  currentlyOpenedBy = elm;
};
const closeAllButtomMenus = () => {
  const itemsMenu = document.getElementById("items-menu");
  itemsMenu.classList.add("hidden");
};

const awaitSecounds = async (secs = 1) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve();
    }, secs * 1000);
  });
};

transactionData.update();
