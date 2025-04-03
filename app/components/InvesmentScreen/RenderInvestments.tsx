import {View, StyleSheet, FlatList } from "react-native";

import { useContext, useEffect, useMemo } from "react";
import { ExpenseDataContext, ExpenseData } from "@/app/Data/EXPENSEDATA";
import InvesmentBox from "./InvesmentBox";
import { InvestmentData } from "@/app/Data/INVESTMENTDATA";

interface RenderInvestmentsProps {
  data: InvestmentData[];
  itemCount?: number;
}

function parseDate(date: string) {
  const [day, month, year] = date.split("-");
  return { day, month, year };
}

const RenderInvestments = ({ itemCount, data }: RenderInvestmentsProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={itemCount ? data.slice(0, itemCount) : data}
        renderItem={({ item }) => (
          <View style={{ paddingBottom: 20 }}>
            <InvesmentBox
              count={item.count}
              date={item.date}
              type={item.type}
              id={item.id}
              buyedAmount={item.buyedAmount}
              transcation={item.transcation}
            />
          </View>
        )}
        keyExtractor={(item) => (item.id ? item.id : "0")} // item.id her zaman olucak o yuzden asla 0 olmayacak
      />
    </View>
  );
};

export default RenderInvestments;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginHorizontal: 20,
  },
});
