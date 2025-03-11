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
import { InvestmentData } from "@/app/Data/INVESTMENTDATA";

const categoryLogos = [
  {
    logo: <Ionicons name="fast-food-outline" size={40} color={Colors.white} />,
    type: "gold",
  },
  {
    logo: <MaterialCommunityIcons name="gold" size={40} color={Colors.white} />,
    type: "dollar",
  },
  {
    logo: <Feather name="shopping-cart" size={40} color={Colors.white} />,
    type: "tl",
  },
];

const exchangeRates = { gold: 3500, dollar: 35, tl: 1 };

const InvesmentBox = ({ type, count, date, id }: InvestmentData) => {
  const AmountText = "+" + (count * exchangeRates[type]).toString() + "TL";

  const logo = categoryLogos.find((item) => item.type === type)?.logo;
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
      //!buraya silme fonksiyonu ekle invesment icin
      setDeleteState(false);
    }
  }

  function onLongPressHandler() {
    setDeleteState(true);
  }

  return !deleteState ? (
    <View style={styles.root}>
      <Pressable style={styles.root} onPress={onPressHandler} onLongPress={onLongPressHandler}>
        <View style={styles.iconContainer}>{logo}</View>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{type}</Text>
          <Text style={styles.categoryText}>{count} Adet</Text>
        </View>
        <View style={styles.amountAndDateContainer}>
          <Text style={styles.amountTextPlus}>{AmountText}</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>
      </Pressable>
    </View>
  ) : (
    <DeleteView />
  );
};

export default InvesmentBox;

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
