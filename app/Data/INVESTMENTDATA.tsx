import React, { createContext, useState } from "react";
import { nanoid } from "nanoid/non-secure";

export interface InvestmentData {
  type: "gold" | "dollar" | "tl";
  count: number;
  id: string;
  date: string;
}

interface InvestmentContextType {
  investments: InvestmentData[];
  getTypeCountAndAmount: (type: "gold" | "dollar" | "tl") => { count: number; amount: number };
  addInvestment: (data: InvestmentData) => void;
  deleteInvestment: (id: string) => void;
  getTotalAmount: () => number;
}

export const InvestmentDataContext = createContext<InvestmentContextType>({
  investments: [],
  getTypeCountAndAmount: () => ({ count: 0, amount: 0 }),
  addInvestment: () => {},
  deleteInvestment: () => {},
  getTotalAmount: () => 0,
});

export default function InvestmentDataContextProvider({ children }: { children: React.ReactNode }) {
  const [investments, setInvestment] = useState<InvestmentData[]>([
    { date: "08-03-2025", id: "1", type: "gold", count: 1 },
    { date: "08-03-2025", id: "2", type: "dollar", count: 3 },
    { date: "08-03-2025", id: "3", type: "gold", count: 2 },
    { date: "08-03-2025", id: "4", type: "tl", count: 1000 },
  ]);

  function addInvestment(data: InvestmentData) {
    data.id = nanoid();
    setInvestment((i) => [...i, data]);
  }
  function deleteInvestment(id: string) {
    const filteredArray = investments.filter((data) => data.id !== id);
    setInvestment(filteredArray);
  }
  function getTotalAmount() {
    const exchangeRates = { gold: 3500, dollar: 35, tl: 1 };
    return investments.reduce((total, data) => total + data.count * exchangeRates[data.type], 0);
  }

  function getTypeCountAndAmount(type: "gold" | "dollar" | "tl") {
    const goldExchange = 3500;
    const dollarExchange = 35;

    const filteredArray = investments.filter((value) => value.type === type);

    var count = 0;
    var amount = 0;
    filteredArray.forEach((value) => (count += value.count));
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
    getTypeCountAndAmount: getTypeCountAndAmount,
    addInvestment: addInvestment,
    deleteInvestment: deleteInvestment,
    getTotalAmount: getTotalAmount,
  };

  return <InvestmentDataContext.Provider value={value}>{children}</InvestmentDataContext.Provider>;
}
