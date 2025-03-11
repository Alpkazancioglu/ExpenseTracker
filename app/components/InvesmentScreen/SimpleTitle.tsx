import { Colors } from "@/app/constants/Colors";
import { Text, View, StyleSheet } from "react-native";

interface SimpleTitleProps {
  value: number;
}

function SimpleTitle({ value }: SimpleTitleProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleText}>Toplam Bakiye</Text>
      </View>
      <View>
        <Text style={styles.amountTitle}>{`${value} TL`}</Text>
      </View>
    </View>
  );
}

export default SimpleTitle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  titleText: {
    color: Colors.white,
    fontSize: 24,
  },
  amountTitle: {
    color: Colors.white,
    fontSize: 20,
  },
});
