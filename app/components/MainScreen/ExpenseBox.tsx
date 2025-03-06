import { Text, View, StyleSheet, Pressable } from "react-native";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Octicons from "@expo/vector-icons/Octicons";
import { Colors } from "@/app/constants/Colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useContext, useState } from "react";
import { ExpenseDataContext } from "@/app/Data/EXPENSEDATA";

interface ExpenseBoxProps {
  category: string;
  amount: number;
  isExpense: boolean;
  date: string;
  name: string;
  style?: object;
  id: string;
}

type Screens = {
  ExpenseList: undefined;
};

type NavigationProps = NativeStackNavigationProp<Screens, "ExpenseList">;

const categoryLogos = [
  {
    logo: <Ionicons name="fast-food-outline" size={40} color={Colors.white} />,
    category: "Yemek-İçecek",
  },
  {
    logo: <MaterialCommunityIcons name="gold" size={40} color={Colors.white} />,
    category: "Yatırım",
  },
  {
    logo: <Feather name="shopping-cart" size={40} color={Colors.white} />,
    category: "Market",
  },
  {
    logo: <Fontisto name="shopping-bag-1" size={40} color={Colors.white} />,
    category: "Alışveriş",
  },
  {
    logo: <FontAwesome name="bus" size={40} color={Colors.white} />,
    category: "Ulaşım",
  },
  {
    logo: <Octicons name="note" size={40} color={Colors.white} />,
    category: "Fatura",
  },
  {
    logo: <FontAwesome6 name="house" size={40} color={Colors.white} />,
    category: "Kira-Aidat",
  },
  {
    logo: <Ionicons name="infinite" size={40} color={Colors.white} />,
    category: "Diğer",
  },
];

const ExpenseBox = ({ category, name, amount, isExpense, date, style, id }: ExpenseBoxProps) => {
  const AmountText = isExpense ? "-" + amount.toString() + "TL" : "+" + amount.toString() + "TL";
  const navigation = useNavigation<NavigationProps>();
  const logo = categoryLogos.find((item) => item.category === category)?.logo;
  const [deleteState, setDeleteState] = useState(false);
  const expenseDatasCtx = useContext(ExpenseDataContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && setDeleteState(false);
  }, [isFocused]);

  function DeleteView() {
    return (
      <View style={[styles.root, { justifyContent: "center", marginBottom: 10 }]}>
        <Pressable
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          onPress={onPressHandler}
        >
          <Text style={{ color: "white", fontSize: 24 }}>Delete ?</Text>
        </Pressable>
      </View>
    );
  }

  function onPressHandler() {
    if (deleteState) {
      expenseDatasCtx.deleteExpense(id);
      setDeleteState(false);
    } else {
      navigation.navigate("ExpenseList");
    }
  }

  function onLongPressHandler() {
    setDeleteState(true);
  }

  return !deleteState ? (
    <View style={[styles.root, style]}>
      <Pressable style={styles.root} onPress={onPressHandler} onLongPress={onLongPressHandler}>
        <View style={styles.iconContainer}>{logo}</View>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
        <View style={styles.amountAndDateContainer}>
          <Text style={isExpense ? styles.amountTextMinus : styles.amountTextPlus}>
            {AmountText}
          </Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>
      </Pressable>
    </View>
  ) : (
    <DeleteView />
  );
};

export default ExpenseBox;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    flex: 1,
    height: 100,
    backgroundColor: Colors.greyDark,
    borderRadius: 10,
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: Colors.greyLight,
    height: "60%",
    flex: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
  textContainer: {
    paddingLeft: 20,
    flex: 2,
    justifyContent: "space-evenly",
    height: "60%",
  },
  amountAndDateContainer: {
    flex: 1.5,
    height: "80%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  nameText: {
    color: Colors.white,
    fontSize: 16,
  },
  categoryText: {
    color: Colors.greyForText,
  },
  amountTextPlus: {
    color: Colors.green,
    fontSize: 18,
  },
  amountTextMinus: {
    color: Colors.red,
    fontSize: 18,
  },
  dateText: {
    color: Colors.greyForText,
  },
});
