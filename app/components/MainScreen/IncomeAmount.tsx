import { Text, View, StyleSheet, Pressable } from "react-native";
import { Colors } from "@/app/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface componentNameProps {
  amount: number;
  style?:object
}

type RootStackParamList = {
  IncomePie: undefined;
};

function formatToMoney(value: number) {
  value = Math.abs(value);
  return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "IncomePie">;

const IncomeAmount = ({ amount,style }: componentNameProps) => {

  const formattedAmount = formatToMoney(amount);
  const tlLogo = <FontAwesome name="try" size={24} color={Colors.green} />;
  const navigation = useNavigation<NavigationProps>();

  function onPressHandler() {
    navigation.navigate("IncomePie");
  }

  return (
    <View style={[styles.root,style]}>
      <Pressable onPress={onPressHandler}>
        <View style={styles.container}>
          <Text style={styles.text}>GELEN PARA</Text>
          <Text style={styles.amountText}>
            +{formattedAmount} {tlLogo}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default IncomeAmount;

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.greyDark,
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius:10
  },
  container: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  amountText: {
    color: Colors.green,
    fontSize: 24,
  },
  text: {
    color: Colors.greyForText,
    fontSize: 24,
  },
});
