import { Text, View, StyleSheet, Modal } from "react-native";
import Header from "../components/MainScreen/Header";
import { Colors } from "../constants/Colors";
import ExpenseList from "../components/MainScreen/ExpenseList";
import AddExpenseMoral from "../components/MainScreen/AddExpenseMoral";
import AddExpenseButton from "../components/MainScreen/AddExpenseButton";
import { useState, useContext } from "react";
import { ExpenseDataContext, filterDataWithDate } from "../Data/EXPENSEDATA";
import Entypo from '@expo/vector-icons/Entypo';

interface MainScreenProps {}

const MainScreen = ({}: MainScreenProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const expenseDataCtx = useContext(ExpenseDataContext);
  

  return (
    <>
      <View style={styles.container}>
        <Header />
        <View style={styles.textContainer}>
          <Text style={styles.text}>En Son Islemler</Text>
        </View>
        <View style={styles.expenseList}>
          <ExpenseList itemCount={10} data={expenseDataCtx.expenseDatas} />
          <AddExpenseButton setIsModalVisible={setIsModalVisible} />
        </View>
      </View>
      <AddExpenseMoral isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  expenseList: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 20,

    alignItems: "center",
  },
  textContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.white,
  },
});
