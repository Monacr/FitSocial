import { ActivityIndicator, View } from "react-native";

// TODO: change color to standardized fit social colors
export const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color="#F5C528" size="large" />
    </View>
  );
};
