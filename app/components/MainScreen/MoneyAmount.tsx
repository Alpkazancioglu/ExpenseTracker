import { Text, View, StyleSheet } from "react-native";
import { Colors } from "@/app/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";

interface componentNameProps {
  amount: number;
  style?: object;
}

function formatToMoney(value: number) {
  value = Math.abs(value);
  return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

const componentName = ({ amount, style }: componentNameProps) => {
  const moneyAmount = formatToMoney(amount);
  const tlLogo: React.JSX.Element = <FontAwesome name="try" size={24} color={Colors.greyForText} />;

  let operatorString = "";
  if (amount > 0) {
    operatorString = "+";
  } else if (amount < 0) {
    operatorString = "-";
  }

  console.log(operatorString);

  return (
    <View style={[styles.root, style]}>
      <View style={styles.container}>
        <Text style={styles.text}>KALAN PARA</Text>
        <Text style={styles.amountText}>
          {operatorString} {moneyAmount} {tlLogo}
        </Text>
      </View>
    </View>
  );
};

export default componentName;

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.greyDark,
    height: "100%",
    minWidth: "45%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  container: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  amountText: {
    color: Colors.white,
    fontSize: 24,
  },
  text: {
    color: Colors.greyForText,
    fontSize: 24,
  },
});
