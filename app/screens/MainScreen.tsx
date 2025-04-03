import { View, StyleSheet } from "react-native";
import Header from "../components/MainScreen/Header";
import { Colors } from "../constants/Colors";
import ExpenseList from "../components/MainScreen/ExpenseList";
import AddExpenseMoral from "../components/MainScreen/AddExpenseMoral";
import AddExpenseButton from "../components/MainScreen/AddExpenseButton";
import { useState, useContext, useEffect, useRef } from "react";
import { ExpenseDataContext, filterDataWithDate } from "../Data/EXPENSEDATA";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LastActions from "../components/LastActions";

interface MainScreenProps {}

const MainScreen = ({}: MainScreenProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const expenseDataCtx = useContext(ExpenseDataContext);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!isLoaded.current) {
      const loadData = async () => {
        try {
          const savedData = await AsyncStorage.getItem("expenseData");
          if (savedData) {
            expenseDataCtx.loadExpensesFromFile(JSON.parse(savedData));
            console.log("Veri yüklendi:", savedData);
          }
        } catch (error) {
          console.log("Veri yüklenirken hata oluştu:", error);
        }
      };

      loadData();
      isLoaded.current = true;
    }
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem("expenseData", JSON.stringify(expenseDataCtx.expenseDatas));
        console.log("saved");
      } catch (error) {
        console.error("failed to save", error);
      }
    };

    saveData();
  }, [expenseDataCtx.expenseDatas]);

  return (
    <>
      <View style={styles.container}>
        <Header />
        <View style={styles.textContainer}>
          <LastActions text={JSON.stringify(expenseDataCtx.expenseDatas)} />
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
