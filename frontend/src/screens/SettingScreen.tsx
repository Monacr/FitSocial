import { View, Text, StyleSheet, Button } from "react-native";
import { URI } from "../constants";

const SettingScreen = ({ navigation }) => {
  const logout = async () => {
    try {
      await fetch(URI + "/logout", {
        method: "POST",
        headers: { "content-type": "application/json" },
      });
      navigation.navigate("Login");
    } catch {}
  };
  return (
    <View style={styles.container}>
      <Text style={styles.topPage}> Fit Social Settings</Text>
      <View style={styles.buttonContainer}>
        <Button onPress={logout} title="Log Out" />
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 30,
  },
  topPage: {
    fontSize: 26,
    marginTop: 10,
    color: "#000080",
  },
  buttonContainer: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
