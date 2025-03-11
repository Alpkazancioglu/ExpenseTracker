import { Text, View, StyleSheet } from "react-native";

interface DetailTitleProps {
  gold: { count: number; amount: number };
  dollar: { count: number; amount: number };
  tl: { count: number; amount: number };
}

const DetailTitle = ({ gold, dollar, tl }: DetailTitleProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Yatirim</Text>
        <Text style={styles.text}>Turk Lirasi</Text>
        <Text style={styles.text}>Altin</Text>
        <Text style={styles.text}>Dolar</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>Adet</Text>
        <Text style={styles.text}>{tl.count}</Text>
        <Text style={styles.text}>{gold.count} gr</Text>
        <Text style={styles.text}>{dollar.count}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>Toplam</Text>
        <Text style={styles.text}>{tl.amount} TL</Text>
        <Text style={styles.text}>{gold.amount} TL</Text>
        <Text style={styles.text}>{dollar.amount} TL</Text>
      </View>
    </View>
  );
};

export default DetailTitle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    flexDirection: "row",
    paddingBottom: 5,
  },
  text: {
    color: "white",
    paddingVertical: 4,
  },
  title: {
    fontSize: 20,
    color: "white",
    paddingBottom: 4,
  },
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
