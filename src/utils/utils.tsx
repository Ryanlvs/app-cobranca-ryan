export {
  formatDate,
  formatDateToYYYYMMDD,
  formatValue,
  maskPhoneNumber,
  removeMaskPhoneNumber,
  add3Hours,
  truncateText,
};

function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");

  return `${formattedDay}/${formattedMonth}/${year}`;
}

function formatDateToYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() retorna 0-11, por isso adicionamos 1
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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

function add3Hours(date: Date) {
  return new Date(date.setHours(date.getHours() + 3));
}

function truncateText(text: string, maxLength: number) {
  if (!text) return text;
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
}
