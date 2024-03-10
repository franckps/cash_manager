const transactionData = {
  data: [],
  filterData: [],
  filterString: "",
  sortArray: ["", ""],
  update: async function () {
    this.data = await this.fetchTransactions();
    this.filter();
  },
  delete: async function (id) {
    const confirmation = this.askConfirmation(
      "Deseja realmente excluir essa transação?"
    );
    if (!confirmation) return;
    this.data = await this.deleteTransaction(id);
    await this.update();
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
      datetime.getDay(),
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
  generateItemHTML: function (itemData) {
    return `
        <section class="content-item ${
          itemData.status == "reverted" ? "reverted" : ""
        }">
            <p>${itemData.title}</p>
            <p><span class="${itemData.type.toLowerCase()}">${this.formatType(
      itemData.type
    )}</span></p>
            <p>${this.formatDate(itemData.createdAt)}</p>
            <p>${itemData.description}</p>
            <p>${this.formatAmount(itemData.amount)}</p>
            <p>
              ${
                itemData.status == "active"
                  ? "<button class='btn-revert' onclick='transactionData.delete(\"" +
                    itemData._id +
                    "\")' ><span>⨁</span> Extornar</button>"
                  : ""
              }
            </p>
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
  deleteTransaction: async function (id) {
    const request = await fetch("/api/v1/" + id, {
      method: "DELETE",
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
};

transactionData.update();
