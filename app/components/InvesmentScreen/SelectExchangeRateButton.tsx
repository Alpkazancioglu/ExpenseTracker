import { Text, View, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";
import { InvestmentDataContext } from "@/app/Data/INVESTMENTDATA";

import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "@/app/constants/Colors";

interface SelectExchangeRateButtonProps {
  setIsModalVisible: (state: boolean) => void;
}

const SelectExchangeRateButton = ({ setIsModalVisible }: SelectExchangeRateButtonProps) => {
  

  function onPressHandler() {
    setIsModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <Pressable style={{ flex: 1 }} onPress={onPressHandler}>
        <Entypo name="dots-three-vertical" size={20} color={Colors.white} />
      </Pressable>
    </View>
  );
};

export default SelectExchangeRateButton;

const styles = StyleSheet.create({
  container: { position: "absolute", top: 10, right: 10 },
});
