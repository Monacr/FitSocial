import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
const { manifest } = Constants;

// URI of the backend (will change for production build)
const uri = `http://${manifest.debuggerHost.split(":").shift()}:8000`;

export default function App() {
  const [msg, setMsg] = useState("No message");

  async function getMsg() {
    try {
      const resp = await fetch(uri + "/msg");
      setMsg(await resp.text());
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getMsg();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{msg}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
