import { ActivityIndicator, View } from "react-native";
import { PrimaryGold } from "../constants";

export default function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color={PrimaryGold} size="large" />
    </View>
  );
}
