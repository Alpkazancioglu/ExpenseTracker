import { Text, View, StyleSheet } from "react-native";
import { useState, useContext } from "react";
import { InvestmentDataContext } from "../Data/INVESTMENTDATA";

import { Colors } from "../constants/Colors";
import Title from "../components/InvesmentScreen/Title";
import InvesmentBox from "../components/InvesmentScreen/InvesmentBox";
import RenderInvestments from "../components/InvesmentScreen/RenderInvestments";

function InvensmentScreen() {
  const investmentDataCtx = useContext(InvestmentDataContext);

  return (
    <View style={styles.container}>
      <Title />
      <View
        style={{
          flex: 0.85,
          width: "80%",
          alignItems: "center",
        }}
      >
        <RenderInvestments data={investmentDataCtx.investments} itemCount={2} />
      </View>
    </View>
  );
}

export default InvensmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    color: Colors.white,
  },
});
