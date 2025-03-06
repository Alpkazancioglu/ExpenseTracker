import React, { createContext, useState } from "react";
import { nanoid } from "nanoid/non-secure";

export interface ExpenseData {
  category: string;
  amount: number;
  isExpense: boolean;
  date: string;
  name: string;
  id?: string;
}

interface CategoryData {
  category: string;
  income: number;
  outcome: number;
}

interface ExpenseContextType {
  expenseDatas: ExpenseData[];
  filterDate: string;
  addExpense: (data: ExpenseData) => void;
  getIncome: (category?: string) => number;
  getOutcome: (category?: string) => number;
  getCategorys: () => CategoryData[];
  deleteExpense: (dataId: string) => void;
}

export const ExpenseDataContext = createContext<ExpenseContextType>({
  filterDate: "",
  expenseDatas: [],
  addExpense: () => {},
  getIncome: () => 0,
  getOutcome: () => 0,
  getCategorys: () => [],
  deleteExpense: () => {},
});

export default function ExpenseDataContextProvider({ children }: { children: React.ReactNode }) {
  const [expenseDatas, setExpenseDatas] = useState<ExpenseData[]>([
    {
      category: "Yemek-İçecek",
      amount: 100,
      isExpense: true,
      date: "01-02-2024",
      name: "Restoran",
      id: "1",
    },
    {
      category: "Yatırım",
      amount: 200,
      isExpense: false,
      date: "24-02-2025",
      name: "Altın Yatırımı",
      id: "2",
    },

    {
      category: "Yemek-İçecek",
      amount: 500,
      isExpense: false,
      date: "02-03-2025",
      name: "Restoran",
      id: "3",
    },
  ]);

  let filterDate = "";

  function addExpense(data: ExpenseData) {
    data.id = nanoid();
    setExpenseDatas((e) => [data, ...e]);
  }

  function deleteExpense(dataId: string) {
    const newData = expenseDatas.filter((expense) => expense.id !== dataId);
    setExpenseDatas(newData);
  }

  function getIncome(category?: string) {
    let incomes = expenseDatas.filter((expense) => !expense.isExpense);

    if (category !== undefined) {
      incomes = incomes.filter(
        (expense) => expense.category.toLowerCase() === category.toLowerCase()
      );
    }

    let amount = 0;

    for (let index = 0; index < incomes.length; index++) {
      amount += incomes[index].amount;
    }

    return amount;
  }
  function getOutcome(category?: string) {
    let outcomes = expenseDatas.filter((expense) => expense.isExpense);
    let amount = 0;

    if (category !== undefined) {
      outcomes = outcomes.filter(
        (expense) => expense.category.toLowerCase() === category.toLowerCase()
      );
    }

    for (let index = 0; index < outcomes.length; index++) {
      amount += outcomes[index].amount;
      console.log(amount);
    }

    return amount;
  }

  function getCategorys(): CategoryData[] {
    //let categorys: CategoryData[] = [{ category: "diger", income: 0, outcome: 0 }];
    let categorys: CategoryData[] = [];

    for (let index = 0; index < expenseDatas.length; index++) {
      const data = expenseDatas[index];
      const indexOfCategory = categorys.findIndex(
        (category) => category.category === data.category
      );

      if (indexOfCategory !== -1) {
        if (data.isExpense) {
          categorys[indexOfCategory].outcome += data.amount;
        } else {
          categorys[indexOfCategory].income += data.amount;
        }
      } else {
        let amount: { income: number; outcome: number } = { income: 0, outcome: 0 };
        if (data.isExpense) {
          amount.outcome += data.amount;
        } else {
          amount.income += data.amount;
        }

        categorys.push({ category: data.category, income: amount.income, outcome: amount.outcome });
      }
    }

    return categorys;
  }

  const value = {
    expenseDatas: expenseDatas,
    filterDate: filterDate,
    addExpense: addExpense,
    getIncome: getIncome,
    getOutcome: getOutcome,
    getCategorys: getCategorys,
    deleteExpense: deleteExpense,
  };

  return <ExpenseDataContext.Provider value={value}>{children}</ExpenseDataContext.Provider>;
}

export function parseDate(date: string) {
  const [day, month, year] = date.split("-");
  return { day, month, year };
}

export function filterDataWithDate(data: ExpenseData[], date: string): ExpenseData[] {
  const formattedDate = parseDate(date);
  let desiredDateType = "";
  if (formattedDate.day === "00" && formattedDate.month === "00") {
    desiredDateType = "year";
  } else if (formattedDate.day === "00" && formattedDate.month !== "00") {
    desiredDateType = "month";
  } else {
    desiredDateType = "day";
  }

  function checkCondition(date: string) {
    const newDate = parseDate(date);

    switch (desiredDateType) {
      case "year":
        return newDate.year === formattedDate.year;
        break;

      case "month":
        return newDate.month === formattedDate.month && newDate.year === formattedDate.year;
        break;
      case "day":
        return (
          newDate.day === formattedDate.day &&
          newDate.month === formattedDate.month &&
          newDate.year === formattedDate.year
        );
        break;
      default:
        break;
    }
  }

  return data.filter((expense) => checkCondition(expense.date));
}
