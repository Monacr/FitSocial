import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { URI } from "./lib/constants";

export default function App() {
  const [msg, setMsg] = useState("No message");

  async function getMsg() {
    try {
      const resp = await fetch(URI + "/msg");
      setMsg(await resp.text());
    } catch (_) {}
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
