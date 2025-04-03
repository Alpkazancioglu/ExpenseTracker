import React from "react";
import { View, Text,ToastAndroid, Pressable } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Colors } from "../constants/Colors";

interface LastActionsProps {
  text: string;
}

const LastActions = ({ text }: LastActionsProps) => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(text);
    ToastAndroid.show("Veriler kopyalandı!", ToastAndroid.SHORT);
  };

  return (
    <View>
      <Pressable onPress={copyToClipboard}>
        <Text style={{ color: Colors.white }}>En Son Islemler</Text>
      </Pressable>
    </View>
  );
};

export default LastActions;
