import { View, StyleSheet } from "react-native";
import IncomeAmount from "./IncomeAmount";
import OutcomeAmount from "./OutcomeAmount";
import MoneyAmount from "./MoneyAmount";
import {
  ExpenseDataContext,
  filterDataWithDate,
  getIncome,
  getOutcome,
} from "@/app/Data/EXPENSEDATA";
import { useContext, useMemo } from "react";
import getTodayDate from "@/app/utils";

interface HeaderProps {}

const todayDate = getTodayDate("month");

const Header = ({}: HeaderProps) => {
  const expenseDatasCtx = useContext(ExpenseDataContext);
  const data = useMemo(
    () => filterDataWithDate(expenseDatasCtx.expenseDatas, todayDate),
    [expenseDatasCtx.expenseDatas]
  );

  const incomeAmount = useMemo(() => getIncome(data), [data]);
  const outcomeAmount = useMemo(() => getOutcome(data), [data]);
  return (
    <View style={styles.root}>
      <View style={styles.amountContainer}>
        <MoneyAmount amount={incomeAmount - outcomeAmount} />
      </View>
      <View style={styles.IncomeOutcomeContainer}>
        <IncomeAmount amount={incomeAmount} />
        <OutcomeAmount amount={outcomeAmount} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  root: {
    marginTop: 30,
    marginHorizontal: 20,
    height: "30%",
    flexDirection: "column",
    gap: 10,
  },
  IncomeOutcomeContainer: {
    flex: 1,
    height: "50%",
    flexDirection: "row",
    gap: 50,
  },
  amountContainer: {
    height: "50%",
  },
});
