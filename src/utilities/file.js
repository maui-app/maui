import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { notifyError } from "../services/notify";

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const periodText = (period) => {
  let text;

  switch (period) {
    case "d":
      text = "daily";
      break;
    case "w":
      text = "weekly";
      break;
    case "m":
      text = "monthly";
      break;
    default:
      text = "";
  }

  return text;
};

const parseExpenses = (expenses, currency) => {
  return expenses.map((expense) => {
    const newExpense = {
      name: expense.name,
      amount: `${currency}${expense.amount_str}`,
      time: expense.time,
    };
    return newExpense;
  });
};

const exportToXlsx = (name, currency, date, period, expenses) => {
  const workSheet = XLSX.utils.json_to_sheet(parseExpenses(expenses, currency));
  const workBook = { Sheets: { data: workSheet }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(workBook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  const fileName = `${name}_${date}_${periodText(period)}_expenses`;
  FileSaver.saveAs(data, fileName + fileExtension);
};

export const validateFile = (file) => {
  const allowedTypes = ["jpg", "png", "jpeg"];
  const type = file.type.split("/")[1].toLowerCase();

  if (!allowedTypes.includes(type)) {
    notifyError("Invalid image format");
    return false;
  }

  if (file.size > 7000000) {
    notifyError("Image is too large");
    return false;
  }

  return true;
};

export default exportToXlsx;
