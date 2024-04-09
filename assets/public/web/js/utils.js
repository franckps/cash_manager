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
