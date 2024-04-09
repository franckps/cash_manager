const formatDate = function (stringDate) {
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
};

const formatType = function (type) {
  return type == "Receipt" ? "ENTRADA" : "SAÍDA";
};

const formatAmount = function (amount) {
  let formatter = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return formatter.format(amount);
};

const openPopup = function (htmlContent) {
  document.querySelector("#popup-screen .popup-content").innerHTML =
    htmlContent;
  const popupScreen = document.getElementById("popup-screen");
  popupScreen.classList.remove("hidden");
};

const closePopup = function () {
  const popupScreen = document.getElementById("popup-screen");
  popupScreen.classList.add("hidden");
};

const section = document.createElement("section");
section.id = "popup-screen";
section.classList.add("popup-screen");
section.classList.add("hidden");
section.innerHTML = '<main class="popup-content"></main>';
document.body.appendChild(section);
