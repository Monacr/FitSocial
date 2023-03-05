import { View, Text, StyleSheet, Button } from "react-native";
import { useAuth } from "../components/AuthProvider";
import { PrimaryBlue, URI } from "../constants";

const SettingScreen = ({ navigation }) => {
  const { setAuthenticated } = useAuth();
  const logout = async () => {
    try {
      const res = await fetch(URI + "/logout", {
        method: "POST",
        headers: { "content-type": "application/json" },
      });

      if (res.ok) {
        setAuthenticated(null);
      }
    } catch (_) {}
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
    color: PrimaryBlue,
  },
  buttonContainer: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
