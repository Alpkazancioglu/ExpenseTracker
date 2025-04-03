import { Text, View, StyleSheet, Pressable } from "react-native";
import React, { useState, useMemo, useContext, useEffect } from "react";
import { Colors } from "../constants/Colors";
import { ExpenseData, ExpenseDataContext, filterDataWithDate } from "../Data/EXPENSEDATA";
import ExpenseList from "../components/MainScreen/ExpenseList";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import BackButton from "../components/MainScreen/BackButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ExpenseListScreenProps {}

type RootStackParamList = {
  MainScreen: undefined;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "MainScreen">;

function getIncome(datas: ExpenseData[]) {
  let incomes = datas.filter((expense) => !expense.isExpense);
  let amount = 0;
  for (let index = 0; index < incomes.length; index++) {
    amount += incomes[index].amount;
  }
  return amount;
}
function getOutcome(datas: ExpenseData[]) {
  let outcomes = datas.filter((expense) => expense.isExpense);
  let amount = 0;
  for (let index = 0; index < outcomes.length; index++) {
    amount += outcomes[index].amount;
    console.log(amount);
  }
  return amount;
}

function parseDate(date: string) {
  const [day, month, year] = date.split("-");
  return { day, month, year };
}

const currentDate = new Date();
const day = String(currentDate.getDate()).padStart(2, "0");
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const year = currentDate.getFullYear();
const formattedDate = `${day}-${month}-${year}`;

const dateType = ["Gün", "Ay", "Yıl"] as const;
const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
] as const;
//let filter = formattedDate;
function ExpenseListScreen({}: ExpenseListScreenProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedType, setSelectedType] = useState("Gün");
  const [selectedFullDate, setSelectedFullDate] = useState(formattedDate);
  const [dateWithFormat, setDateWithFormat] = useState(formattedDate);
  const [filter, setFilter] = useState(formattedDate);
  const [, forceRender] = useState(0);
  const expenseDatasCtx = useContext(ExpenseDataContext);

  function handleSetFilter(date: string) {
    setFilter(date);
    expenseDatasCtx.filterDate = date;
  }

  useEffect(() => {
    console.log(expenseDatasCtx.expenseDatas);
    forceRender((prev) => prev + 1);
  }, [expenseDatasCtx.expenseDatas]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const navigation = useNavigation<NavigationProps>();
  let operatorString = "";
  let sum = 0;

  const filteredData = useMemo(() => {
    console.log("memo");
    return filterDataWithDate(expenseDatasCtx.expenseDatas, filter);
  }, [filter, expenseDatasCtx.expenseDatas]);

  const filteredExpensesAmount = useMemo(() => {
    sum = getIncome(filteredData) - getOutcome(filteredData);

    if (sum > 0) {
      operatorString = "+";
    } else if (sum < 0) {
      operatorString = "-";
    }
    return [getIncome(filteredData), getOutcome(filteredData)];
  }, [filteredData]);
  console.log(filteredExpensesAmount);

  function BackButtonPressHandler() {
    //filter = formattedDate;
    //setFilter(formattedDate);
    navigation.navigate("MainScreen");
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  function handleTextPress() {
    let index = dateType.findIndex((item) => item === selectedType);
    if (index + 1 === dateType.length) {
      index = 0;
    } else {
      index += 1;
    }
    const formattedDate = parseDate(selectedFullDate);

    switch (index) {
      case 0: //GUN ICIN
        setDateWithFormat(selectedFullDate);
        //filter = selectedFullDate;
        handleSetFilter(selectedFullDate);
        break;
      case 1: // AY ICIN
        setDateWithFormat(months[parseInt(formattedDate.month) - 1] + ` ${formattedDate.year}`);
        //filter = `00-${formattedDate.month}-${formattedDate.year}`;
        handleSetFilter(`00-${formattedDate.month}-${formattedDate.year}`);
        break;
      case 2: // YIL ICIN
        setDateWithFormat(formattedDate.year);
        //filter = `00-00-${formattedDate.year}`;
        handleSetFilter(`00-00-${formattedDate.year}`);
        break;
      default:
        break;
    }

    setSelectedType(dateType[index]);
  }

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const fullDate = `${day}-${month}-${year}`;
    setSelectedFullDate(fullDate);

    if (selectedType === "Gün") {
      const formattedDate = `${day}-${month}-${year}`;
      setDateWithFormat((prev) => formattedDate);
      //filter = formattedDate;
      handleSetFilter(formattedDate);
    } else if (selectedType === "Ay") {
      const formattedDate = `00-${month}-${year}`;
      //filter = formattedDate;
      handleSetFilter(formattedDate);

      setDateWithFormat(months[parseInt(month) - 1] + ` ${year}`);
    } else {
      const formattedDate = `00-00-${year}`;
      //filter = formattedDate;
      handleSetFilter(formattedDate);
      setDateWithFormat(year.toString());
    }

    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: "50%",
            flexDirection: "row",
          }}
        >
          <View style={{ position: "absolute", top: 5, left: 10 }}>
            <BackButton onPress={BackButtonPressHandler} />
          </View>
          <View style={{ flexDirection: "row", width: "80%", justifyContent: "space-evenly" }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: Colors.white }}>Gelir</Text>
              <Text style={{ color: Colors.green }}> {filteredExpensesAmount[0]} TL</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: Colors.white }}>Toplam</Text>
              <Text style={{ color: Colors.greyForText }}>
                {operatorString}
                {sum} TL
              </Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: Colors.white }}>Gider</Text>
              <Text style={{ color: Colors.red }}> {filteredExpensesAmount[1]} TL</Text>
            </View>
          </View>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}
        >
          <View style={{ width: 40, height: 40 }}>
            <Pressable
              onPress={handleTextPress}
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
              <Text style={{ color: Colors.white }}>{selectedType}</Text>
            </Pressable>
          </View>
          <View>
            <Text style={{ color: Colors.white, paddingRight: 10 }}>{dateWithFormat}</Text>
          </View>
          <View>
            <Pressable onPress={showDatePicker}>
              <Ionicons name="filter" size={24} color={Colors.white} />
              <View>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.list}>
        <ExpenseList data={filteredData} />
      </View>
    </View>
  );
}

export default ExpenseListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 150,
    backgroundColor: Colors.greyLight,
    marginBottom: 50,
  },
  list: {
    width: "90%",
    alignItems: "center",
    height: "70%",
  },
});
