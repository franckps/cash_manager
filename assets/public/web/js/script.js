let data = [
  {
    _id: "7e5d420b-0cdc-4a61-b470-a9ec5a2bd545",
    amount: 50,
    type: "Payment",
    title: "Conta",
    description: "Teste inicial",
    status: "reverted",
    createdAt: "2024-02-27 02:17:16.684 +00:00",
    updatedAt: "2024-02-29 01:43:55.363 +00:00",
  },
  {
    _id: "fc6cffda-a0f3-4b8d-88fe-4796a841ca2f",
    amount: 10,
    type: "Payment",
    title: "Conta",
    description: "Teste inicial",
    status: "active",
    createdAt: "2024-02-27 02:17:22.285 +00:00",
    updatedAt: "2024-02-27 02:17:22.285 +00:00",
  },
  {
    _id: "fd8c0e2e-47d5-419b-9d42-a1706450010f",
    amount: 100,
    type: "Receipt",
    title: "Conta",
    description: "Teste inicial",
    status: "active",
    createdAt: "2024-02-27 02:18:13.463 +00:00",
    updatedAt: "2024-02-27 02:18:13.463 +00:00",
  },
  {
    _id: "9080bfbc-6f50-42ba-82b2-d13a674a5352",
    amount: 30,
    type: "Receipt",
    title: "Conta",
    description: "Teste inicial",
    status: "active",
    createdAt: "2024-02-27 02:18:22.809 +00:00",
    updatedAt: "2024-02-27 02:18:22.809 +00:00",
  },
  {
    _id: "446a388d-5afc-41b6-bb57-3c8aed00fe8f",
    amount: 10,
    type: "Receipt",
    title: "Conta",
    description: "Teste inicial",
    status: "reverted",
    createdAt: "2024-02-28 00:07:48.064 +00:00",
    updatedAt: "2024-03-05 00:21:59.094 +00:00",
  },
];

const generateItemHTML = (itemData) => `
    <section class="content-item ${
      itemData.status == "reverted" ? "reverted" : ""
    }">
        <p>${itemData.title}</p>
        <p><span class="receipt">${
          itemData.type == "Receipt" ? "ENTRADA" : "SAÍDA"
        }</span></p>
        <p>${itemData.createdAt}</p>
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

const mainContent = document.getElementById("content");
let itemsHTML = data.map((element) => generateItemHTML(element)).join("");
mainContent.innerHTML = itemsHTML;
