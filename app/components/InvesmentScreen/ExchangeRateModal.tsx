import { Colors } from "@/app/constants/Colors";
import { useState, useContext } from "react";
import { Text, View, StyleSheet, Modal, TextInput, StatusBar, Pressable } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Alert } from "react-native";

import BackButton from "../MainScreen/BackButton";
import { InvestmentData, InvestmentDataContext } from "@/app/Data/INVESTMENTDATA";

interface ExchangeRateModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (state: boolean) => void;
}

const ExchangeRateModal = ({ isModalVisible, setIsModalVisible }: ExchangeRateModalProps) => {
  const investmentDataCtx = useContext(InvestmentDataContext);

  const [goldPrice, setGoldPrice] = useState(investmentDataCtx.exchangeRates.gold);
  const [dollarPrice, setDollarPrice] = useState(investmentDataCtx.exchangeRates.dollar);

  function handleExit() {
    setIsModalVisible(false);
    setGoldPrice(investmentDataCtx.exchangeRates.gold);
    setDollarPrice(investmentDataCtx.exchangeRates.dollar);
  }

  function handleDollarInput(text: string) {
    
    setDollarPrice(parseInt(text));
  }
  function handleGoldInput(text: string) {
    setGoldPrice(parseInt(text));
  }

  function confirmButtonHandler() {
    if (!goldPrice || !dollarPrice) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
      return;
    }

    if (goldPrice <= 0 || isNaN(goldPrice) || dollarPrice <= 0 || isNaN(dollarPrice)) {
      Alert.alert("Hata", "Lütfen pozitif bir para degeri giriniz");
      setGoldPrice(investmentDataCtx.exchangeRates.gold);
      setDollarPrice(investmentDataCtx.exchangeRates.dollar);
      return;
    }

    console.log(dollarPrice,goldPrice);
    investmentDataCtx.setExchangeRates("dollar", dollarPrice);
    investmentDataCtx.setExchangeRates("gold", goldPrice);
    setIsModalVisible(false);
  }

  return (
    <Modal animationType="slide" visible={isModalVisible} onRequestClose={handleExit}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ position: "absolute", top: 30, left: 20 }}>
            <BackButton onPress={handleExit} />
          </View>
          <Text style={styles.headerText}>Islem Sekmesi</Text>
        </View>

        <View style={styles.nameContainer}>
          <TextInput
            placeholder="Altin"
            placeholderTextColor={Colors.greyForText}
            style={{ color: Colors.white }}
            inputMode="numeric"
            onChangeText={handleGoldInput}
          />
        </View>
        <View style={styles.nameContainer}>
          <TextInput
            placeholder="Dolar"
            placeholderTextColor={Colors.greyForText}
            style={{ color: Colors.white }}
            inputMode="numeric"
            onChangeText={handleDollarInput}
          />
        </View>

        <Pressable onPress={confirmButtonHandler}>
          <View style={{ borderWidth: 1, borderColor: "white", padding: 10, borderRadius: 10 }}>
            <Text style={{ color: "white", fontSize: 24 }}>Ekle</Text>
          </View>
        </Pressable>
      </View>
    </Modal>
  );
};

export default ExchangeRateModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.greyLight,
    marginBottom: 20,
    flexDirection: "row",
  },
  headerText: {
    color: Colors.greyForText,
    fontSize: 24,
    fontWeight: "bold",
  },
  nameContainer: {
    backgroundColor: Colors.greyLight,
    width: "90%",
    height: 50,
    paddingLeft: 10,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: "center",
    marginBottom: 20,
  },
  categoryContainer: {
    backgroundColor: Colors.greyLight,
    width: "90%",
    height: 50,
    paddingLeft: 10,
    borderWidth: 0,
    borderColor: "white",
    borderBottomWidth: 1,
    marginBottom: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
});
