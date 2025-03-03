import { Text, View, StyleSheet, Pressable } from "react-native";
import { Colors } from "@/app/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  OutcomePie: undefined;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "OutcomePie">;

interface componentNameProps {
  amount: number;
  style?:object
}
function formatToMoney(value: number) {
  value = Math.abs(value);
  return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

const OutcomeAmount = ({ amount,style }: componentNameProps) => {
  const tlLogo = <FontAwesome name="try" size={24} color={Colors.red} />;
  const navigation = useNavigation<NavigationProps>();
  const formattedAmount = formatToMoney(amount);

  function onPressHandler() {
    navigation.navigate("OutcomePie");
  }

  return (
    <View style={[styles.root,style]}>
      <Pressable onPress={onPressHandler}>
        <View style={styles.container}>
          <Text style={styles.text}>GIDEN PARA</Text>
          <Text style={styles.amountText}>
            {" "}
            - {formattedAmount} {tlLogo}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default OutcomeAmount;

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.greyDark,
    flex: 1,
    height: "100%",
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
    color: Colors.red,
    fontSize: 24,
  },
  text: {
    color: Colors.greyForText,
    fontSize: 24,
  },
});
