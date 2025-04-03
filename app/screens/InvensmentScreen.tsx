import { View, StyleSheet } from "react-native";
import { useState, useContext, useEffect, useRef } from "react";
import { InvestmentDataContext } from "../Data/INVESTMENTDATA";
import { Colors } from "../constants/Colors";
import Title from "../components/InvesmentScreen/Title";
import RenderInvestments from "../components/InvesmentScreen/RenderInvestments";
import SelectExchangeRate from "../components/InvesmentScreen/SelectExchangeRateButton";
import ExchangeRateModal from "../components/InvesmentScreen/ExchangeRateModal";
import AddInvestmentButton from "../components/InvesmentScreen/AddInvestmentButton";
import AddInvestmentModal from "../components/InvesmentScreen/AddInvenstmentModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LastActions from "../components/LastActions";

function InvensmentScreen() {
  const investmentDataCtx = useContext(InvestmentDataContext);
  const [isChangeExchangeVisible, setIsChangeExchangeVisible] = useState(false);
  const [isAddExpenseVisible, setIsAddExpenseVisible] = useState(false);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!isLoaded.current) {
      const loadData = async () => {
        try {
          const savedData = await AsyncStorage.getItem("investmentData");
          if (savedData) {
            investmentDataCtx.loadExpensesFromFile(JSON.parse(savedData));
            console.log("Veri yüklendi:", savedData);
          }
        } catch (error) {
          console.log("Veri yüklenirken hata oluştu:", error);
        }
      };

      loadData();
      isLoaded.current = true;
    }
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem("investmentData", JSON.stringify(investmentDataCtx.investments));
        console.log("saved");
      } catch (error) {
        console.error("failed to save", error);
      }
    };

    saveData();
  }, [investmentDataCtx.investments]);

  return (
    <>
      <View style={styles.container}>
        <SelectExchangeRate setIsModalVisible={setIsChangeExchangeVisible} />
        <Title />
        <View style={styles.textContainer}>
          <LastActions text={JSON.stringify(investmentDataCtx.investments)} />
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
