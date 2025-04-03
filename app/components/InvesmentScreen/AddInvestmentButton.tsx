import { View, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface addInvestmentButtonProps {
  setIsModalVisible: (state: boolean) => void;
}

const addInvestmentButton = ({ setIsModalVisible }: addInvestmentButtonProps) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setIsModalVisible(true)}>
        <AntDesign name="plus" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default addInvestmentButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    position: "absolute",
    top: "85%",
    left: "85%",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
