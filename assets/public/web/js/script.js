const transactionData = {
  updateCallbacks: [],
  subscribeUpdate: function (callback) {
    this.updateCallbacks.push(callback);
  },
  update: function () {
    this.updateCallbacks.forEach((cbk) => {
      cbk.apply(null);
    });
  },
};

const fetchTransactions = async () => {
  const request = await fetch("/api/v1/");
  const result = await request.json();
  return result.body;
};

const generateItemHTML = (itemData) => {
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
};

transactionData.subscribeUpdate(async () => {
  let data = await fetchTransactions();

  const mainContent = document.getElementById("content");
  let itemsHTML = data.map((element) => generateItemHTML(element)).join("");
  mainContent.innerHTML = itemsHTML;
});

transactionData.update();
