import { View, StyleSheet, FlatList } from "react-native";
import ExpenseBox from "./ExpenseBox";

import { ExpenseData } from "@/app/Data/EXPENSEDATA";

interface ExpenseListProps {
  data: ExpenseData[];
  itemCount?: number;
}



const ExpenseList = ({ itemCount, data }: ExpenseListProps) => {
  
  return (
    <View style={styles.container}>
      <FlatList
        data={itemCount ? data.slice(0, itemCount) : data}
        renderItem={({ item }) => (
          <ExpenseBox
            amount={item.amount}
            date={item.date}
            name={item.name}
            category={item.category}
            isExpense={item.isExpense}
            style={{ marginBottom: 10 }}
            id={item.id!}
          />
        )}
        keyExtractor={(item) => (item.id ? item.id : "0")} // item.id her zaman olucak o yuzden asla 0 olmayacak
      />
    </View>
  );
};

export default ExpenseList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginHorizontal: 20,
  },
});
