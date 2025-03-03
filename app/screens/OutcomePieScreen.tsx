import { Text, View, StyleSheet, FlatList } from "react-native";
import { Colors } from "../constants/Colors";
import { PieChart, pieDataItem } from "react-native-gifted-charts";
import { ExpenseDataContext } from "../Data/EXPENSEDATA";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { MotiView } from "moti";
import BackButton from "../components/MainScreen/BackButton";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const OutcomePieScreen = () => {
  const expenseDatasCtx = useContext(ExpenseDataContext);
  const navigation = useNavigation();

  const totalAmountPercent = 100 / expenseDatasCtx.getOutcome();

  function RenderPieList() {
    const datas = expenseDatasCtx.getCategorys().filter((data) => data.outcome !== 0);

    const randomColors = ["black", "grey", "lightgrey", "red", "blue"];
    const tlLogo = <FontAwesome name="try" size={18} color={Colors.greyForText} />;
    let pieData: pieDataItem[] = [];

    for (let index = 0; index < datas.length; index++) {
      const element = datas[index];

      const elementAmountWithPercent = (totalAmountPercent * element.outcome).toFixed(2);

      pieData.push({
        value: parseFloat(elementAmountWithPercent),
        color: randomColors[index],
        
      });
    }

    return (
      <>
        <PieChart data={pieData} showText textColor="white" textSize={14} paddingVertical={10} />
        <View style={styles.foodList}>
          <FlatList
            data={datas}
            keyExtractor={(item) => item.category}
            renderItem={({ item, index }) => (
              <View
                style={{
                  width: "100%",
                  height: 50,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: randomColors[index],
                      borderRadius: 15,
                      margin: 10,
                    }}
                  />
                  <Text style={{ color: Colors.white, fontSize: 18, marginBottom: 4 }}>
                    {item.category}
                  </Text>
                </View>
                <Text style={{ color: Colors.white, marginRight: 20, fontSize: 18 }}>
                  {item.outcome}
                  {tlLogo}
                </Text>
              </View>
            )}
          />
        </View>
      </>
    );
  }

  const FadeIn = ({ children }: { children: React.JSX.Element }) => (
    <View style={{ backgroundColor: Colors.black }}>
      <MotiView
        style={{ backgroundColor: Colors.black }}
        from={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 1000 }}
      >
        {children}
      </MotiView>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 40, width: "100%", paddingLeft: 20 }}>
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 1000 }}
        >
          <BackButton onPress={navigation.goBack} />
        </MotiView>
      </View>
      <FadeIn>
        <View
          style={{
            backgroundColor: Colors.black,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", paddingBottom: 20, fontSize: 24 }}>Gelirler</Text>
          <RenderPieList />
        </View>
      </FadeIn>
    </View>
  );
};

export default OutcomePieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,

    alignItems: "center",
  },
  foodList: {
    width: 250,
    maxHeight: 300,
    backgroundColor: Colors.greyLight,
    borderRadius: 10,
    padding: 10,
  },
});
