import { View, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface AddExpenseButtonProps {
  setIsModalVisible: (state: boolean) => void;
}

const AddExpenseButton = ({ setIsModalVisible }: AddExpenseButtonProps) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setIsModalVisible(true)}>
        <AntDesign name="plus" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default AddExpenseButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    position: "absolute",
    top: "80%",
    left: "80%",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
