import { Colors } from "@/app/constants/Colors";
import { useState, useContext } from "react";
import { Text, View, StyleSheet, Modal, TextInput, StatusBar, Pressable } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Alert } from "react-native";
import { ExpenseDataContext, ExpenseData } from "@/app/Data/EXPENSEDATA";
import BackButton from "./BackButton";

interface AddExpenseMoralProps {
  isModalVisible: boolean;
  setIsModalVisible: (state: boolean) => void;
}

const AddExpenseMoral = ({ isModalVisible, setIsModalVisible }: AddExpenseMoralProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");

  const expenseDatasCtx = useContext(ExpenseDataContext);

  function handleExit() {
    setIsModalVisible(false);
    setSelectedAmount("");
    setSelectedName("");
    setSelectedTransaction("");
  }

  function confirmButtonHandler() {
    const category = categoryData.find((item) => item.key === Number(selectedCategory))?.value;
    const transaction = transactionData.find(
      (item) => item.key === Number(selectedTransaction)
    )?.value;

    if (!selectedName || !selectedCategory || !selectedAmount || !selectedTransaction) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
      return;
    }

    if (Number(selectedAmount) <= 0 || isNaN(Number(selectedAmount))) {
      Alert.alert("Hata", "Lütfen pozitif bir para degeri giriniz");
      setSelectedAmount("");
      return;
    }

    console.log(selectedName);
    console.log(category);
    console.log(selectedAmount);
    console.log(transaction);

    const isExpense = transaction === "Gider";

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    const data: ExpenseData = {
      amount: Number(selectedAmount),
      date: formattedDate,
      category: category!,
      isExpense: isExpense,
      name: selectedName,
    };

    expenseDatasCtx.addExpense(data);
    setSelectedCategory("");
    setSelectedTransaction("");
    setSelectedAmount("");
    setSelectedName("");
    setIsModalVisible(false);
  }

  const categoryData = [
    { key: 1, value: "Yemek-İçecek" },
    { key: 2, value: "Yatırım" },
    { key: 3, value: "Market" },
    { key: 4, value: "Ulaşım" },
    { key: 5, value: "Alışveriş" },
    { key: 6, value: "Fatura" },
    { key: 7, value: "Kira-Aidat" },
    { key: 8, value: "Diğer" },
  ];

  const transactionData = [
    { key: 1, value: "Gelir" },
    { key: 2, value: "Gider" },
  ];

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
            placeholder="Başlık"
            placeholderTextColor={Colors.greyForText}
            style={{ color: Colors.white }}
            onChangeText={setSelectedName}
          />
        </View>

        <SelectList
          setSelected={(val: string) => setSelectedCategory(val)}
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
            placeholder="Miktar"
            placeholderTextColor={Colors.greyForText}
            style={{ color: Colors.white }}
            inputMode="numeric"
            onChangeText={setSelectedAmount}
            value={selectedAmount}
          />
        </View>

        <SelectList
          setSelected={(val: string) => setSelectedTransaction(val)}
          data={transactionData}
          search={false}
          boxStyles={styles.categoryContainer}
          inputStyles={{ color: Colors.greyForText, paddingTop: 2 }}
          placeholder="İşlem türü"
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

export default AddExpenseMoral;

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
