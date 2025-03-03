import { Text, View, StyleSheet } from "react-native";

interface InvensmentScreenProps {}

const InvensmentScreen = (props: InvensmentScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>InvensmentScreen</Text>
    </View>
  );
};

export default InvensmentScreen;

const styles = StyleSheet.create({
  container: {},
});
