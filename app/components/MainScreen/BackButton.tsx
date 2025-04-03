import { View, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/app/constants/Colors";

interface BackButtonProps {
  onPress: () => void;
}

const BackButton = ({ onPress }: BackButtonProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={{
          width: "100%",
          height: "100%",
          
         
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AntDesign name="leftcircleo" size={30} color={Colors.white} />
      </Pressable>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
