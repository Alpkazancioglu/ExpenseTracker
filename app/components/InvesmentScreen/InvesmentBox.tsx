import { Text, View, StyleSheet, Pressable } from "react-native";
import { useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "@/app/constants/Colors";
import { useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useContext, useState } from "react";

import { InvestmentData, InvestmentDataContext } from "@/app/Data/INVESTMENTDATA";

const categoryLogos = [
  {
    logo: <MaterialCommunityIcons name="gold" size={40} color="white" />,
    type: "gold",
  },
  {
    logo: <Feather name="dollar-sign" size={40} color="white" />,
    type: "dollar",
  },
  {
    logo: <FontAwesome name="turkish-lira" size={40} color="white" />,
    type: "tl",
  },
];

const localization = { gold: "Altin", dollar: "Dolar", tl: "Turk Lirasi" };

const InvesmentBox = ({ type, count, date, buyedAmount, id, transcation }: InvestmentData) => {
  const AmountText = buyedAmount.toString() + "TL";
  const investmentDataCtx = useContext(InvestmentDataContext);
  const logo = categoryLogos.find((item) => item.type === type)?.logo;
  const [deleteState, setDeleteState] = useState(false);
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
      investmentDataCtx.deleteInvestment(id);
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
          <Text style={styles.nameText}>{localization[type]}</Text>
          <Text style={styles.categoryText}>{count} Adet</Text>
        </View>
        <View style={styles.amountAndDateContainer}>
          {transcation === "sale" ? (
            <Text style={styles.amountTextPlus}>+{AmountText}</Text>
          ) : (
            <Text style={styles.amountTextMinus}>-{AmountText}</Text>
          )}

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
    color: Colors.white,
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
