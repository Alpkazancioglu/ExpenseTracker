export default function getTodayDate(desiredFormat: "day" | "month" | "year") {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  let formattedDate = "";
  switch (desiredFormat) {
    case "day":
      formattedDate = `${day}-${month}-${year}`;
      return formattedDate;
      break;
    case "month":
      formattedDate = `00-${month}-${year}`;
      return formattedDate;
      break;
    case "year":
      formattedDate = `00-00-${year}`;
      return formattedDate;
  }
}

export function formatToMoney(value: number) {
  value = Math.abs(value);
  return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
