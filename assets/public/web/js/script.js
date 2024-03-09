const transactionData = {
  data: [],
  filterData: [],
  filterString: "",
  update: async function () {
    this.data = await this.fetchTransactions();
    this.filter();
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
      const valoresJoined = Object.values(element).join(" ").toLowerCase();
      const strFilter = this.filterString.toLowerCase();
      console.log({ strFilter });
      console.log({ valoresJoined });
      if (new RegExp(`.*${strFilter}.*`).test(valoresJoined))
        this.filterData.push(element);
    });
    this.renderList();
  },
  renderList: function () {
    const mainContent = document.getElementById("content");
    console.log(this.filterData);
    let itemsHTML = this.filterData
      .map((element) => this.generateItemHTML(element))
      .join("");
    mainContent.innerHTML = itemsHTML;
  },
  generateItemHTML: function (itemData) {
    let dateString = itemData.createdAt.split(" +00:00")[0];
    console.log();
    const datetime = new Date(dateString);
    console.log({ datetime });
    const [day, month, year, hour, minutes, secounds] = [
      datetime.getDay(),
      datetime.getMonth(),
      datetime.getFullYear(),
      datetime.getHours(),
      datetime.getMinutes(),
      datetime.getSeconds(),
    ];

    return `
        <section class="content-item ${
          itemData.status == "reverted" ? "reverted" : ""
        }">
            <p>${itemData.title}</p>
            <p><span class="${itemData.type.toLowerCase()}">${
      itemData.type == "Receipt" ? "ENTRADA" : "SAÍDA"
    }</span></p>
            <p>${day}/${month + 1}/${year} ${hour}:${minutes}:${secounds}</p>
            <p>${itemData.description}</p>
            <p>R$ ${itemData.amount}</p>
            <p>
              ${
                itemData.status == "active"
                  ? "<button class='btn-revert'><span>⨁</span> Extornar</button>"
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
};

transactionData.update();
