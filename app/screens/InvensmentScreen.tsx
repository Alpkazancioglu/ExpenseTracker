import { Text, View, StyleSheet } from "react-native";
import { useState, useContext } from "react";
import { InvestmentDataContext } from "../Data/INVESTMENTDATA";
import { Colors } from "../constants/Colors";
import Title from "../components/InvesmentScreen/Title";
import InvesmentBox from "../components/InvesmentScreen/InvesmentBox";
import RenderInvestments from "../components/InvesmentScreen/RenderInvestments";
import Entypo from "@expo/vector-icons/Entypo";
import SelectExchangeRate from "../components/InvesmentScreen/SelectExchangeRateButton";
import ExchangeRateModal from "../components/InvesmentScreen/ExchangeRateModal";
import AddInvestmentButton from "../components/InvesmentScreen/AddInvestmentButton";
import AddInvestmentModal from "../components/InvesmentScreen/AddInvenstmentModal";

function InvensmentScreen() {
  const investmentDataCtx = useContext(InvestmentDataContext);
  const [isChangeExchangeVisible, setIsChangeExchangeVisible] = useState(false);
  const [isAddExpenseVisible, setIsAddExpenseVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <SelectExchangeRate setIsModalVisible={setIsChangeExchangeVisible} />
        <Title />
        <View style={styles.textContainer}>
          <Text style={styles.text}>En Son Islemler</Text>
        </View>
        <View
          style={{
            flex: 0.85,
            width: "80%",
            alignItems: "center",
          }}
        >
          <RenderInvestments data={investmentDataCtx.investments} />
          <AddInvestmentButton setIsModalVisible={setIsAddExpenseVisible} />
        </View>
        <ExchangeRateModal
          isModalVisible={isChangeExchangeVisible}
          setIsModalVisible={setIsChangeExchangeVisible}
        />
        <AddInvestmentModal
          isModalVisible={isAddExpenseVisible}
          setIsModalVisible={setIsAddExpenseVisible}
        />
      </View>
    </>
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
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
