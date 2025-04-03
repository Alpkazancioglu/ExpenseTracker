import { Colors } from "@/app/constants/Colors";
import { useState, useContext } from "react";
import { Text, View, StyleSheet, Modal, TextInput, StatusBar, Pressable } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Alert } from "react-native";

import BackButton from "../MainScreen/BackButton";
import { InvestmentData, InvestmentDataContext } from "@/app/Data/INVESTMENTDATA";
import { nanoid } from "nanoid/non-secure";
import getTodayDate from "../../utils";

interface AddInvestmentModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (state: boolean) => void;
}
const transactionData = [
  { key: 1, value: "Alım" },
  { key: 2, value: "Satım" },
];
const categoryData = [
  { key: 1, value: "Altin" },
  { key: 2, value: "Dolar" },
  { key: 3, value: "Turk Lirasi" },
];

const AddInvestmentModal = ({ isModalVisible, setIsModalVisible }: AddInvestmentModalProps) => {
  const investmentDataCtx = useContext(InvestmentDataContext);

  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [selectedType, setSelectedType] = useState("");
  const [selectedTranscation, setSelectedTransaction] = useState("");

  function handleSetCount(value: string) {
    setCount(Number(value));
  }
  function handleSetAmount(value: string) {
    setAmount(Number(value));
  }

  function handleExit() {
    setIsModalVisible(false);
    setCount(0);
    setAmount(0);
  }

  function confirmButtonHandler() {
    if (count === 0 || amount === 0 || selectedType === "" || selectedTranscation === "") {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun ve adet ile miktari 0 yapmayin");
      setCount(0);
      setAmount(0);
      return;
    }

    if (count <= 0 || isNaN(count) || amount <= 0 || isNaN(amount)) {
      Alert.alert("Hata", "Lütfen pozitif bir para degeri giriniz");
      setCount(0);
      setAmount(0);
      return;
    }

    let tempType = categoryData.find((item) => item.key === Number(selectedType))?.value;
    let type: "dollar" | "gold" | "tl";
    if (tempType === "Altin") {
      type = "gold";
    } else if (tempType === "Dolar") {
      type = "dollar";
    } else {
      type = "tl";
    }

    let tempTransaction = transactionData.find(
      (item) => item.key === Number(selectedTranscation)
    )?.value;
    let transaction: "purchase" | "sale";
    if (tempTransaction === "Satım") {
      transaction = "sale";
    } else {
      transaction = "purchase";
    }

    const data: InvestmentData = {
      buyedAmount: amount,
      count: count,
      id: nanoid(),
      type: type,
      date: getTodayDate("day"),
      transcation: transaction,
    };
    console.log(data);
    investmentDataCtx.addInvestment(data);
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

        <SelectList
          setSelected={(val: string) => setSelectedType(val)}
          data={categoryData}
          search={false}
          boxStyles={styles.categoryContainer}
          inputStyles={{ color: Colors.greyForText, paddingTop: 2 }}
          placeholder="Kategori"
          dropdownTextStyles={{ color: Colors.white }}
          dropdownItemStyles={{
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 10,
            borderColor: "white",
          }}
          dropdownStyles={{ marginBottom: 10, backgroundColor: Colors.greyLight }}
        />
        <View style={styles.nameContainer}>
          <TextInput
            placeholder="Adet"
            placeholderTextColor={Colors.greyForText}
            style={{ color: Colors.white }}
            inputMode="numeric"
            onChangeText={handleSetCount}
          />
        </View>
        <View style={styles.nameContainer}>
          <TextInput
            placeholder="Tutar"
            placeholderTextColor={Colors.greyForText}
            style={{ color: Colors.white }}
            inputMode="numeric"
            onChangeText={handleSetAmount}
          />
        </View>
        <SelectList
          setSelected={(val: string) => setSelectedTransaction(val)}
          data={transactionData}
          search={false}
          boxStyles={styles.categoryContainer}
          inputStyles={{ color: Colors.greyForText, paddingTop: 2 }}
          placeholder="İşlem"
          dropdownTextStyles={{ color: Colors.white }}
          dropdownItemStyles={{
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 10,
            borderColor: "white",
          }}
          dropdownStyles={{ marginBottom: 10, backgroundColor: Colors.greyLight }}
        />
        <Pressable onPress={confirmButtonHandler}>
          <View style={{ borderWidth: 1, borderColor: "white", padding: 10, borderRadius: 10 }}>
            <Text style={{ color: "white", fontSize: 24 }}>Ekle</Text>
          </View>
        </Pressable>
      </View>
    </Modal>
  );
};

export default AddInvestmentModal;

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
