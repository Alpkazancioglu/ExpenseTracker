import React, { createContext, useState } from "react";
import { nanoid } from "nanoid/non-secure";

export interface InvestmentData {
  type: "gold" | "dollar" | "tl";
  count: number;
  buyedAmount: number;
  id: string;
  date: string;
  transcation: "purchase" | "sale";
}

interface InvestmentContextType {
  investments: InvestmentData[];
  exchangeRates: { gold: number; dollar: number };
  setExchangeRates: (type: "dollar" | "gold", value: number) => void;
  getTypeCountAndAmount: (type: "gold" | "dollar" | "tl") => { count: number; amount: number };
  addInvestment: (data: InvestmentData) => void;
  deleteInvestment: (id: string) => void;
  getTotalAmount: () => number;
  loadExpensesFromFile: (data: InvestmentData[]) => void;
}

export const InvestmentDataContext = createContext<InvestmentContextType>({
  investments: [],
  exchangeRates: { gold: 3400, dollar: 36 },
  setExchangeRates: () => {},
  getTypeCountAndAmount: () => ({ count: 0, amount: 0 }),
  addInvestment: () => {},
  deleteInvestment: () => {},
  getTotalAmount: () => 0,
  loadExpensesFromFile: () => {},
});

export default function InvestmentDataContextProvider({ children }: { children: React.ReactNode }) {
  const [investments, setInvestment] = useState<InvestmentData[]>([
    {
      date: "08-03-2025",
      id: "1",
      type: "gold",
      count: 1,
      buyedAmount: 3000,
      transcation: "purchase",
    },
    {
      date: "08-03-2025",
      id: "2",
      type: "dollar",
      count: 3,
      buyedAmount: 90,
      transcation: "purchase",
    },
    {
      date: "08-03-2025",
      id: "3",
      type: "gold",
      count: 2,
      buyedAmount: 6000,
      transcation: "purchase",
    },
    {
      date: "08-03-2025",
      id: "4",
      type: "tl",
      count: 1000,
      buyedAmount: 1000,
      transcation: "purchase",
    },
  ]);

  const [exchangeRates, m_setExchangeRates] = useState({ gold: 3400, dollar: 36 });

  function setExchangeRates(type: "dollar" | "gold", value: number) {
    let newRates = exchangeRates;
    if (type === "dollar") {
      newRates.dollar = value;
    } else if (type === "gold") {
      newRates.gold = value;
    }

    m_setExchangeRates((e) => newRates);
  }

  function addInvestment(data: InvestmentData) {
    data.id = nanoid();
    setInvestment((i) => [data, ...i]);
  }
  function deleteInvestment(id: string) {
    const filteredArray = investments.filter((data) => data.id !== id);
    setInvestment(filteredArray);
  }
  function getTotalAmount() {
    const rates = { gold: exchangeRates.gold, dollar: exchangeRates.dollar, tl: 1 };

    return investments.reduce(
      (total, data) =>
        data.transcation === "purchase"
          ? total + data.count * rates[data.type]
          : total - data.count * rates[data.type],
      0
    );
  }

  function loadExpensesFromFile(data: InvestmentData[]) {
    setInvestment(data);
  }

  function getTypeCountAndAmount(type: "gold" | "dollar" | "tl") {
    const goldExchange = exchangeRates.gold;
    const dollarExchange = exchangeRates.dollar;

    const filteredArray = investments.filter((value) => value.type === type);

    var count = 0;
    var amount = 0;
    filteredArray.forEach(
      (value) => (count += value.count * (value.transcation === "purchase" ? 1 : -1))
    );
    if (type === "gold") {
      amount += count * goldExchange;
    } else if (type === "dollar") {
      amount += count * dollarExchange;
    } else {
      amount += count;
    }

    return { count: count, amount: amount };
  }

  const value = {
    investments: investments,
    exchangeRates: exchangeRates,
    setExchangeRates: setExchangeRates,
    getTypeCountAndAmount: getTypeCountAndAmount,
    addInvestment: addInvestment,
    deleteInvestment: deleteInvestment,
    getTotalAmount: getTotalAmount,
    loadExpensesFromFile: loadExpensesFromFile,
  };

  return <InvestmentDataContext.Provider value={value}>{children}</InvestmentDataContext.Provider>;
}
