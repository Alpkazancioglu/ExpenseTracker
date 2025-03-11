import { StyleSheet, View, StatusBar } from "react-native";
import { Colors } from "./constants/Colors";
import MainScreen from "./screens/MainScreen";
import IncomePieScreen from "./screens/IncomePieScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ExpenseDataContextProvider from "./Data/EXPENSEDATA";
import OutcomePieScreen from "./screens/OutcomePieScreen";
import ExpenseListScreen from "./screens/ExpenseListScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InvensmentScreen from "./screens/InvensmentScreen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import "react-native-reanimated";
import "react-native-gesture-handler";
import InvestmentDataContextProvider from "./Data/INVESTMENTDATA";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.black }}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="ExpenseList" component={ExpenseListScreen} />
        <Stack.Screen name="IncomePie" component={IncomePieScreen} />
        <Stack.Screen name="OutcomePie" component={OutcomePieScreen} />
      </Stack.Navigator>
    </View>
  );
};

const InvestmentStack = () => {
  return (
    <InvestmentDataContextProvider>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen name="InvensmentScreen" component={InvensmentScreen} />
      </Stack.Navigator>
    </InvestmentDataContextProvider>
  );
};

export default function index() {
  return (
    <>
      <ExpenseDataContextProvider>
        <View style={styles.rootContainer}>
          <Tab.Navigator
            screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: Colors.black } }}
            initialRouteName="Invesment" //! burayi silmeyi unutma
          >
            <Tab.Screen
              name="Expense"
              component={MainStack}
              options={{
                tabBarIcon: () => <FontAwesome name="credit-card" size={24} color={Colors.white} />,
                tabBarLabel: () => null,
              }}
            />
            <Tab.Screen
              name="Invesment"
              component={InvestmentStack}
              options={{
                tabBarIcon: () => <FontAwesome5 name="piggy-bank" size={24} color={Colors.white} />,
                tabBarLabel: () => null,
              }}
            />
          </Tab.Navigator>
        </View>
      </ExpenseDataContextProvider>
      <StatusBar backgroundColor={Colors.black} />
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});
