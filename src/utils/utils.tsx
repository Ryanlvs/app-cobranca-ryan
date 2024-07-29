export { formatDate, formatValue, maskPhoneNumber, removeMaskPhoneNumber };

function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");

  return `${formattedDay}/${formattedMonth}/${year}`;
}

function formatValue(value: Number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

function maskPhoneNumber(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  return value;
}

function removeMaskPhoneNumber(value: string) {
  return value.replace(/\D/g, "");
}
