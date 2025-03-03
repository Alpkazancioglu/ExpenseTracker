import { Text, View, StyleSheet } from "react-native";
import IncomeAmount from "./IncomeAmount";
import OutcomeAmount from "./OutcomeAmount";
import MoneyAmount from "./MoneyAmount";
import { ExpenseDataContext,filterDataWithDate } from "@/app/Data/EXPENSEDATA";
import { useContext } from "react";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const expenseDatasCtx = useContext(ExpenseDataContext);
  const incomeAmount = expenseDatasCtx.getIncome();
  const outcomeAmount = expenseDatasCtx.getOutcome();

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
