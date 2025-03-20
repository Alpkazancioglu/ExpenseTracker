import { Text, View, StyleSheet, Switch } from "react-native";
import { useContext, useMemo, useState } from "react";

import { MotiView } from "moti";

import { Colors } from "@/app/constants/Colors";
import SimpleTitle from "./SimpleTitle";
import DetailTitle from "./DetailTitle";
import { InvestmentDataContext } from "@/app/Data/INVESTMENTDATA";

interface TitleProps {}

function Title(props: TitleProps) {
  const [titleSwitch, setTitleSwitch] = useState(false);

  const investmentDataCtx = useContext(InvestmentDataContext);
  const totalAmount = useMemo(() => investmentDataCtx.getTotalAmount(), [investmentDataCtx]);
  const totalGold = useMemo(
    () => investmentDataCtx.getTypeCountAndAmount("gold"),
    [investmentDataCtx.investments, investmentDataCtx.exchangeRates.gold]
  );

  const totalDollar = useMemo(
    () => investmentDataCtx.getTypeCountAndAmount("dollar"),
    [investmentDataCtx.investments, investmentDataCtx.exchangeRates.dollar]
  );
  
  const totalTl = useMemo(
    () => investmentDataCtx.getTypeCountAndAmount("tl"),
    [investmentDataCtx.investments]
  );

  return (
    <View style={styles.container}>
      <View style={{ height: "0%" }}>
        <Switch
          value={titleSwitch}
          onValueChange={setTitleSwitch}
          trackColor={{ false: Colors.greyForText, true: "white" }}
          thumbColor={Colors.black}
        />
      </View>
      {!titleSwitch ? (
        <SimpleTitle value={totalAmount} />
      ) : (
        <DetailTitle gold={totalGold} dollar={totalDollar} tl={totalTl} />
      )}
    </View>
  );
}

export default Title;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greyDark,
    width: "80%",
    height: 140,
    borderRadius: 20,
  },
});
